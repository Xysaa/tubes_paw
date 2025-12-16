from datetime import datetime
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound, HTTPForbidden, HTTPConflict

from sqlalchemy.exc import IntegrityError

from ..auth_utils import get_current_user, require_roles
from ..models.attendance import Attendance
from ..models.classes import Class
from ..models.booking import Booking


def _parse_json_body(request):
    try:
        data = request.json_body
        if not isinstance(data, dict):
            raise ValueError
        return data
    except Exception:
        raise HTTPBadRequest(json_body={"error": "Invalid JSON body"})


def _attendance_to_dict(a: Attendance):
    return {
        "id": a.id,
        "class_id": a.class_id,
        "member_id": a.member_id,
        "status": a.status,
        "marked_by": a.marked_by,
        "marked_at": a.marked_at.isoformat() if a.marked_at else None,
        "created_at": a.created_at.isoformat() if a.created_at else None,
    }


def _role_value(user):
    return user.role.value if hasattr(user.role, "value") else user.role


@view_config(route_name="trainer_mark_attendance", request_method="POST", renderer="json")
def trainer_mark_attendance(request):
    """
    POST /api/classes/{id}/attendance
    Auth: ADMIN or TRAINER(pemilik class)

    Body JSON:
    {
      "member_id": 2,
      "status": "present"   // optional: default present, allowed: present/absent/late (kalau kamu pakai)
    }

    201: created (first time)
    200: updated (kalau sudah ada, kita update status)
    404: class not found / booking not found
    403: bukan trainer pemilik class
    """
    require_roles(request, ["admin", "trainer"])
    user = get_current_user(request)
    db = request.dbsession

    try:
        class_id = int(request.matchdict.get("id"))
    except (TypeError, ValueError):
        raise HTTPBadRequest(json_body={"error": "Invalid class id"})

    gym_class = db.query(Class).get(class_id)
    if not gym_class:
        raise HTTPNotFound(json_body={"error": "Class not found"})

    role = _role_value(user)
    if role == "trainer" and gym_class.trainer_id != user.id:
        raise HTTPForbidden(json_body={"error": "You are not allowed to mark attendance for this class"})

    data = _parse_json_body(request)

    member_id = data.get("member_id")
    status = (data.get("status") or "present").lower()

    if not member_id:
        raise HTTPBadRequest(json_body={"error": "member_id is required"})

    try:
        member_id = int(member_id)
    except ValueError:
        raise HTTPBadRequest(json_body={"error": "member_id must be integer"})

    allowed_status = {"present", "absent", "late"}
    if status not in allowed_status:
        raise HTTPBadRequest(json_body={"error": f"status must be one of {sorted(list(allowed_status))}"})

    # Pastikan member memang booking class ini
    booking = db.query(Booking).filter(
        Booking.class_id == class_id,
        Booking.member_id == member_id
    ).first()
    if not booking:
        raise HTTPNotFound(json_body={"error": "Booking not found for this member in this class"})

    # Upsert attendance (kalau sudah ada, update)
    attendance = db.query(Attendance).filter(
        Attendance.class_id == class_id,
        Attendance.member_id == member_id
    ).first()

    if attendance:
        attendance.status = status
        attendance.marked_by = user.id
        attendance.marked_at = datetime.utcnow()
        db.flush()

        request.response.status_code = 200
        return {
            "message": "Attendance updated",
            "data": _attendance_to_dict(attendance)
        }

    attendance = Attendance(
        class_id=class_id,
        member_id=member_id,
        status=status,
        marked_by=user.id,
        marked_at=datetime.utcnow(),
        created_at=datetime.utcnow(),
    )
    db.add(attendance)
    try:
        db.flush()
    except IntegrityError:
        # harusnya tidak kejadian karena sudah dicek, tapi jaga-jaga
        raise HTTPConflict(json_body={"error": "Attendance already exists"})

    request.response.status_code = 201
    return {
        "message": "Attendance created",
        "data": _attendance_to_dict(attendance)
    }


@view_config(route_name="trainer_class_attendance", request_method="GET", renderer="json")
def trainer_class_attendance(request):
    """
    GET /api/classes/{id}/attendance/list
    Auth: ADMIN or TRAINER(pemilik class)

    200: list attendance untuk class tersebut
    """
    require_roles(request, ["admin", "trainer"])
    user = get_current_user(request)
    db = request.dbsession

    try:
        class_id = int(request.matchdict.get("id"))
    except (TypeError, ValueError):
        raise HTTPBadRequest(json_body={"error": "Invalid class id"})

    gym_class = db.query(Class).get(class_id)
    if not gym_class:
        raise HTTPNotFound(json_body={"error": "Class not found"})

    role = _role_value(user)
    if role == "trainer" and gym_class.trainer_id != user.id:
        raise HTTPForbidden(json_body={"error": "You are not allowed to view attendance for this class"})

    rows = (
        db.query(Attendance)
        .filter(Attendance.class_id == class_id)
        .order_by(Attendance.marked_at.asc())
        .all()
    )

    request.response.status_code = 200
    return {
        "message": "Attendance list fetched",
        "class": {
            "id": gym_class.id,
            "name": gym_class.name,
            "schedule": gym_class.schedule,
            "capacity": gym_class.capacity,
            "trainer_id": gym_class.trainer_id
        },
        "total": len(rows),
        "data": [
            {
                **_attendance_to_dict(a),
                "member_name": a.member.name if a.member else None,
                "member_email": a.member.email if a.member else None,
            }
            for a in rows
        ]
    }


@view_config(route_name="member_attendance_history", request_method="GET", renderer="json")
def member_attendance_history(request):
    """
    GET /api/my/attendance
    Auth: MEMBER only
    Query optional: ?class_id=1

    200: history attendance si member
    """
    require_roles(request, ["member"])
    user = get_current_user(request)
    db = request.dbsession

    class_id = request.params.get("class_id")
    q = db.query(Attendance).filter(Attendance.member_id == user.id)

    if class_id:
        try:
            cid = int(class_id)
            q = q.filter(Attendance.class_id == cid)
        except ValueError:
            raise HTTPBadRequest(json_body={"error": "class_id must be integer"})

    rows = q.order_by(Attendance.marked_at.desc()).all()

    request.response.status_code = 200
    return {
        "message": "Attendance history fetched",
        "total": len(rows),
        "data": [
            {
                **_attendance_to_dict(a),
                "class": {
                    "id": a.gym_class.id,
                    "name": a.gym_class.name,
                    "schedule": a.gym_class.schedule,
                    "trainer_id": a.gym_class.trainer_id
                } if a.gym_class else None
            }
            for a in rows
        ]
    }
