# myapp/views/auth.py
from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPConflict,
    HTTPUnauthorized,
)
from sqlalchemy.exc import IntegrityError

from ..models.user import User, UserRole
from ..security import hash_password, verify_password, create_access_token
from ..auth_utils import get_current_user, require_roles


def _parse_json_body(request):
    try:
        data = request.json_body
        if not isinstance(data, dict):
            raise ValueError
        return data
    except Exception:
        raise HTTPBadRequest(json_body={"error": "Invalid JSON body"})


@view_config(route_name="auth_register_member", request_method="POST", renderer="json")
def register_member(request):
    db = request.dbsession
    data = _parse_json_body(request)

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        raise HTTPBadRequest(json_body={"error": "name, email, and password are required"})

    if len(password) < 6:
        raise HTTPBadRequest(json_body={"error": "password must be at least 6 characters"})

    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPConflict(json_body={"error": "Email already registered"})

    user = User(
        name=name,
        email=email,
        password_hash=hash_password(password),
        role=UserRole.MEMBER.value,
    )

    db.add(user)
    try:
        db.flush()
    except IntegrityError:
        raise HTTPConflict(json_body={"error": "Email already registered"})

    token = create_access_token(user, request.registry.settings)

    request.response.status_code = 201
    return {
        "message": "Member registered successfully",
        "user": {"id": user.id, "name": user.name, "email": user.email, "role": user.role},
        "access_token": token,
        "token_type": "Bearer",
    }


@view_config(route_name="auth_login", request_method="POST", renderer="json")
def login(request):
    db = request.dbsession
    data = _parse_json_body(request)

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPBadRequest(json_body={"error": "email and password are required"})

    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPUnauthorized(json_body={"error": "Invalid email or password"})

    token = create_access_token(user, request.registry.settings)

    return {
        "access_token": token,
        "token_type": "Bearer",
        "user": {"id": user.id, "name": user.name, "email": user.email, "role": user.role},
    }


@view_config(route_name="auth_me", request_method="GET", renderer="json")
def me(request):
    user = get_current_user(request)
    return {"id": user.id, "name": user.name, "email": user.email, "role": user.role}


# ✅ INI YANG KURANG: decorator untuk route admin_users
@view_config(route_name="admin_users", request_method="GET", renderer="json")
def admin_list_users(request):
    db = request.dbsession
    require_roles(request, ["admin"])

    users = db.query(User).all()
    return [
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": (u.role.value if hasattr(u.role, "value") else u.role),
        }
        for u in users
    ]
