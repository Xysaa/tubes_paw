# yourapp/auth_utils.py
from pyramid.httpexceptions import HTTPUnauthorized, HTTPForbidden
from .security import decode_access_token
from .models.user import User


def get_current_user(request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPUnauthorized(json_body={"error": "Missing or invalid Authorization header"})

    token = auth_header.split(" ", 1)[1].strip()
    try:
        payload = decode_access_token(token, request.registry.settings)
    except Exception as e:
        raise HTTPUnauthorized(json_body={"error": "Invalid or expired token"})

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPUnauthorized(json_body={"error": "Invalid token payload"})

    db = request.dbsession  # asumsi kamu sudah setup request.dbsession
    user = db.query(User).get(int(user_id))
    if not user:
        raise HTTPUnauthorized(json_body={"error": "User not found"})

    # simpan di request biar bisa dipakai lagi
    request.user = user
    return user


def require_roles(request, allowed_roles):
    """
    allowed_roles: list[str] misal ["admin"] atau ["trainer", "admin"]
    """
    user = getattr(request, "user", None) or get_current_user(request)

    role_value = user.role.value if hasattr(user.role, "value") else user.role
    if role_value not in allowed_roles:
        raise HTTPForbidden(json_body={"error": "You do not have permission to access this resource"})

    return user
