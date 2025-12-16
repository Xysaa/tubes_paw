# myapp/views/classes.py
from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPNotFound,
    HTTPForbidden,
)
from sqlalchemy import or_

from ..models.classes import Class
from ..auth_utils import require_roles


def _parse_json_body(request):
    try:
        data = request.json_body
        if not isinstance(data, dict):
            raise ValueError
        return data
    except Exception:
        raise HTTPBadRequest(json_body={"error": "Invalid JSON body"})


def _class_to_dict(c: Class):
    return {
        "id": c.id,
        "name": c.name,
        "description": c.description,
        "schedule": c.schedule,
        "capacity": c.capacity,
        "trainer_id": c.trainer_id,
        "created_at": c.created_at.isoformat() if c.created_at else None,
    }


# ============ LIST & CREATE ============

@view_config(
    route_name="classes_list_create",
    request_method="GET",
    renderer="json",
)
def list_classes(request):
    """
    GET /api/classes?search=...
    - Bisa diakses semua role (member, trainer, admin)
    - Response: 200 OK
    """
    db = request.dbsession

    search = request.params.get("search") or request.params.get("q")

    query = db.query(Class)

    if search:
        like = f"%{search}%"
        query = query.filter(
            or_(
                Class.name.ilike(like),
                Class.description.ilike(like),
            )
        )

    classes = query.order_by(Class.created_at.desc()).all()

    request.response.status_code = 200
    return {
        "message": "Classes fetched successfully",
        "data": [_class_to_dict(c) for c in classes],
    }


@view_config(
    route_name="classes_list_create",
    request_method="POST",
    renderer="json",
)
def create_class(request):
    """
    POST /api/classes
    Hanya admin & trainer

    Body JSON:
    {
      "name": "...",
      "description": "...",
      "schedule": "...",
      "capacity": 20,
      "trainer_id": 2   # optional, untuk admin
    }

    Response:
    - 201 Created (sukses)
    - 400 Bad Request (validasi gagal)
    - 401 Unauthorized (token invalid / tidak ada)
    - 403 Forbidden (role bukan admin/trainer)
    """
    db = request.dbsession

    # hanya admin & trainer yang boleh
    current_user = require_roles(request, ["admin", "trainer"])

    data = _parse_json_body(request)

    name = data.get("name")
    description = data.get("description")
    schedule = data.get("schedule")
    capacity = data.get("capacity")
    trainer_id = data.get("trainer_id")

    # validasi basic
    if not name or not schedule or capacity is None:
        raise HTTPBadRequest(
            json_body={"error": "name, schedule, and capacity are required"}
        )

    try:
        capacity = int(capacity)
        if capacity <= 0:
            raise ValueError
    except ValueError:
        raise HTTPBadRequest(json_body={"error": "capacity must be positive integer"})

    # tentukan trainer_id, ingat: current_user.role adalah Enum
    role_value = current_user.role.value if hasattr(current_user.role, "value") else current_user.role

    if role_value == "trainer":
        # trainer hanya boleh buat kelas atas namanya sendiri
        trainer_id = current_user.id
    elif role_value == "admin":
        # admin boleh set trainer_id manual
        if trainer_id is None:
            raise HTTPBadRequest(
                json_body={"error": "trainer_id is required when role is admin"}
            )

    new_class = Class(
        name=name,
        description=description,
        schedule=schedule,
        capacity=capacity,
        trainer_id=trainer_id,
    )

    db.add(new_class)
    db.flush()

    request.response.status_code = 201  # Created
    return {
        "message": "Class created successfully",
        "data": _class_to_dict(new_class),
    }


# ============ DETAIL / UPDATE / DELETE ============

@view_config(
    route_name="classes_detail",
    request_method="GET",
    renderer="json",
)
def get_class_detail(request):
    """
    GET /api/classes/{id}
    Public (member / trainer / admin)

    Response:
    - 200 OK
    - 400 Bad Request (ID tidak valid)
    - 404 Not Found (kelas tidak ada)
    """
    db = request.dbsession
    try:
        class_id = int(request.matchdict.get("id"))
    except (TypeError, ValueError):
        raise HTTPBadRequest(json_body={"error": "Invalid class id"})

    c = db.query(Class).get(class_id)
    if not c:
        raise HTTPNotFound(json_body={"error": "Class not found"})

    request.response.status_code = 200
    return {
        "message": "Class detail fetched successfully",
        "data": _class_to_dict(c),
    }


@view_config(
    route_name="classes_detail",
    request_method="PUT",
    renderer="json",
)
def update_class(request):
    """
    PUT /api/classes/{id}
    Hanya admin atau trainer pemilik kelas

    Body JSON (semua optional):
    {
      "name": "...",
      "description": "...",
      "schedule": "...",
      "capacity": 25
    }

    Response:
    - 200 OK
    - 400 Bad Request
    - 401 Unauthorized
    - 403 Forbidden
    - 404 Not Found
    """
    db = request.dbsession
    current_user = require_roles(request, ["admin", "trainer"])

    try:
        class_id = int(request.matchdict.get("id"))
    except (TypeError, ValueError):
        raise HTTPBadRequest(json_body={"error": "Invalid class id"})

    c = db.query(Class).get(class_id)
    if not c:
        raise HTTPNotFound(json_body={"error": "Class not found"})

    role_value = current_user.role.value if hasattr(current_user.role, "value") else current_user.role

    # Trainer hanya boleh update kelas yang dia miliki
    if role_value == "trainer" and c.trainer_id != current_user.id:
        raise HTTPForbidden(
            json_body={"error": "You are not allowed to modify this class"}
        )

    data = _parse_json_body(request)

    if "name" in data and data["name"]:
        c.name = data["name"]
    if "description" in data:
        c.description = data["description"]
    if "schedule" in data and data["schedule"]:
        c.schedule = data["schedule"]
    if "capacity" in data:
        try:
            cap = int(data["capacity"])
            if cap <= 0:
                raise ValueError
            c.capacity = cap
        except ValueError:
            raise HTTPBadRequest(
                json_body={"error": "capacity must be positive integer"}
            )

    db.flush()

    request.response.status_code = 200
    return {
        "message": "Class updated successfully",
        "data": _class_to_dict(c),
    }


@view_config(
    route_name="classes_detail",
    request_method="DELETE",
    renderer="json",
)
def delete_class(request):
    """
    DELETE /api/classes/{id}
    Hanya admin atau trainer pemilik kelas

    Response:
    - 204 No Content (sukses)
    - 400 Bad Request
    - 401 Unauthorized
    - 403 Forbidden
    - 404 Not Found
    """
    db = request.dbsession
    current_user = require_roles(request, ["admin", "trainer"])

    try:
        class_id = int(request.matchdict.get("id"))
    except (TypeError, ValueError):
        raise HTTPBadRequest(json_body={"error": "Invalid class id"})

    c = db.query(Class).get(class_id)
    if not c:
        raise HTTPNotFound(json_body={"error": "Class not found"})

    role_value = current_user.role.value if hasattr(current_user.role, "value") else current_user.role
    if role_value == "trainer" and c.trainer_id != current_user.id:
        raise HTTPForbidden(
            json_body={"error": "You are not allowed to delete this class"}
        )

    db.delete(c)
    db.flush()

    request.response.status_code = 204  # No Content
    return {}
