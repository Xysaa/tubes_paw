from datetime import datetime
from pyramid.httpexceptions import HTTPUnauthorized, HTTPForbidden
from .security import decode_access_token
from .models.user import User
from .models.membership import Membership


# ======================
# AUTH USER
# ======================

def get_current_user(request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPUnauthorized(json_body={
            "error": "Unauthorized",
            "message": "Missing or invalid Authorization header"
        })

    token = auth_header.split(" ", 1)[1].strip()
    try:
        payload = decode_access_token(token, request.registry.settings)
    except Exception:
        raise HTTPUnauthorized(json_body={
            "error": "Unauthorized",
            "message": "Invalid or expired token"
        })

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPUnauthorized(json_body={
            "error": "Unauthorized",
            "message": "Invalid token payload"
        })

    db = request.dbsession
    user = db.query(User).get(int(user_id))
    if not user:
        raise HTTPUnauthorized(json_body={
            "error": "Unauthorized",
            "message": "User not found"
        })

    # simpan biar tidak query ulang
    request.user = user
    return user


# ======================
# ROLE GUARD
# ======================

def require_roles(request, allowed_roles):
    """
    allowed_roles: list[str]
    contoh: ["admin"], ["trainer", "admin"], ["member"]
    """
    user = getattr(request, "user", None) or get_current_user(request)

    role_value = user.role.value if hasattr(user.role, "value") else user.role
    if role_value not in allowed_roles:
        raise HTTPForbidden(json_body={
            "error": "Forbidden",
            "message": "You do not have permission to access this resource"
        })

    return user


# ======================
# MEMBERSHIP GUARD
# ======================

def require_active_membership(request):
    """
    Wajib dipanggil SETELAH require_roles(["member"])
    - 403 jika belum punya membership aktif
    """

    user = getattr(request, "user", None) or get_current_user(request)

    role_value = user.role.value if hasattr(user.role, "value") else user.role
    if role_value != "member":
        # admin / trainer tidak perlu membership
        return None

    db = request.dbsession
    now = datetime.utcnow()

    active_membership = (
        db.query(Membership)
        .filter(
            Membership.member_id == user.id,
            Membership.status == "active",
            Membership.end_at > now
        )
        .order_by(Membership.end_at.desc())
        .first()
    )

    if not active_membership:
        raise HTTPForbidden(json_body={
            "error": "Membership required",
            "message": "You must have an active membership before booking a class"
        })

    # simpan di request untuk dipakai ulang
    request.membership = active_membership
    return active_membership
