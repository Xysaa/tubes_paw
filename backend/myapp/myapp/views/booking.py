# myapp/views/bookings.py
from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPBadRequest, HTTPNotFound, HTTPConflict, HTTPForbidden
)
from sqlalchemy.exc import IntegrityError
from sqlalchemy import func

from ..auth_utils import get_current_user, require_roles , require_active_membership
from ..models.booking import Booking
from ..models.classes import Class

def _role_value(user):
    return user.role.value if hasattr(user.role, "value") else user.role

def _booking_to_dict(b: Booking):
    return {
        "id": b.id,
        "member_id": b.member_id,
        "class_id": b.class_id,
        "booking_date": b.booking_date.isoformat() if b.booking_date else None,
        "class": {
            "id": b.gym_class.id,
            "name": b.gym_class.name,
            "schedule": b.gym_class.schedule,
            "capacity": b.gym_class.capacity,
            "trainer_id": b.gym_class.trainer_id,
        } if getattr(b, "gym_class", None) else None
    }

@view_config(route_name="class_book", request_method="POST", renderer="json")
def book_class(request):
    """
    POST /api/classes/{id}/book
    Auth: MEMBER only
    201: sukses
    409: double booking / full
    """
    require_roles(request, ["member"])
    user = get_current_user(request)
    require_active_membership(request)
    db = request.dbsession

    try:
        class_id = int(request.matchdict.get("id"))
    except (TypeError, ValueError):
        raise HTTPBadRequest(json_body={"error": "Invalid class id"})

    gym_class = db.query(Class).get(class_id)
    if not gym_class:
        raise HTTPNotFound(json_body={"error": "Class not found"})

    # capacity check (hitung booking aktif)
    booked_count = db.query(func.count(Booking.id)).filter(Booking.class_id == class_id).scalar() or 0
    if booked_count >= gym_class.capacity:
        raise HTTPConflict(json_body={"error": "Class is full"})

    booking = Booking(member_id=user.id, class_id=class_id)
    db.add(booking)
    try:
        db.flush()  # trigger unique constraint
    except IntegrityError:
        # member sudah pernah booking class ini
        raise HTTPConflict(json_body={"error": "You already booked this class"})

    request.response.status_code = 201
    return {
        "message": "Booking created",
        "data": _booking_to_dict(booking)
    }

@view_config(route_name="member_bookings", request_method="GET", renderer="json")
def list_my_bookings(request):
    """
    GET /api/bookings
    Auth: MEMBER only
    200
    """
    require_roles(request, ["member"])
    user = get_current_user(request)
    db = request.dbsession

    bookings = (
        db.query(Booking)
        .filter(Booking.member_id == user.id)
        .order_by(Booking.booking_date.desc())
        .all()
    )

    request.response.status_code = 200
    return {
        "message": "Bookings fetched",
        "data": [_booking_to_dict(b) for b in bookings]
    }

@view_config(route_name="class_participants", request_method="GET", renderer="json")
def class_participants(request):
    """
    GET /api/classes/{id}/participants
    Auth: ADMIN or TRAINER(pemilik kelas)
    200
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

    # kalau trainer, harus pemilik kelas
    if role == "trainer" and gym_class.trainer_id != user.id:
        raise HTTPForbidden(json_body={"error": "You are not allowed to view participants for this class"})

    bookings = db.query(Booking).filter(Booking.class_id == class_id).order_by(Booking.booking_date.asc()).all()

    request.response.status_code = 200
    return {
        "message": "Participants fetched",
        "class": {
            "id": gym_class.id,
            "name": gym_class.name,
            "schedule": gym_class.schedule,
            "capacity": gym_class.capacity,
            "trainer_id": gym_class.trainer_id
        },
        "total_participants": len(bookings),
        "data": [
            {
                "booking_id": b.id,
                "member_id": b.member_id,
                "member_name": b.member.name if b.member else None,
                "member_email": b.member.email if b.member else None,
                "booking_date": b.booking_date.isoformat() if b.booking_date else None
            }
            for b in bookings
        ]
    }
