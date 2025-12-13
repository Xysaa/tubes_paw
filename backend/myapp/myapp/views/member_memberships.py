from datetime import datetime, timedelta
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound, HTTPConflict
from ..auth_utils import get_current_user, require_roles
from ..models.membership_plan import MembershipPlan
from ..models.membership import Membership


def _membership_to_dict(m: Membership):
    return {
        "id": m.id,
        "member_id": m.member_id,
        "plan_id": m.plan_id,
        "status": m.status,
        "start_at": m.start_at.isoformat() if m.start_at else None,
        "end_at": m.end_at.isoformat() if m.end_at else None,
        "plan": {
            "id": m.plan.id,
            "name": m.plan.name,
            "price": m.plan.price,
            "duration_days": m.plan.duration_days
        } if m.plan else None
    }


@view_config(route_name="member_subscribe_membership", request_method="POST", renderer="json")
def subscribe_membership(request):
    """
    POST /api/memberships/{id}/subscribe
    Auth: MEMBER only

    201: sukses subscribe
    404: plan tidak ada
    409: sudah punya membership aktif (opsional: bisa kamu ganti jadi extend)
    """
    require_roles(request, ["member"])
    user = get_current_user(request)
    db = request.dbsession

    try:
        plan_id = int(request.matchdict.get("id"))
    except (TypeError, ValueError):
        raise HTTPBadRequest(json_body={"error": "Invalid membership plan id"})

    plan = db.query(MembershipPlan).get(plan_id)
    if not plan:
        raise HTTPNotFound(json_body={"error": "Membership plan not found"})

    now = datetime.utcnow()

    # Cek membership aktif existing
    existing_active = (
        db.query(Membership)
        .filter(
            Membership.member_id == user.id,
            Membership.status == "active",
            Membership.end_at > now
        )
        .first()
    )
    if existing_active:
        raise HTTPConflict(json_body={
            "error": "Already subscribed",
            "message": "You still have an active membership"
        })

    start_at = now
    end_at = now + timedelta(days=int(plan.duration_days))

    membership = Membership(
        member_id=user.id,
        plan_id=plan.id,
        start_at=start_at,
        end_at=end_at,
        status="active",
        created_at=now,
    )

    db.add(membership)
    db.flush()

    request.response.status_code = 201
    return {
        "message": "Membership activated",
        "data": _membership_to_dict(membership)
    }


@view_config(route_name="member_my_membership", request_method="GET", renderer="json")
def my_membership(request):
    """
    GET /api/my/membership
    Auth: MEMBER only
    200: return membership (aktif/terakhir)
    """
    require_roles(request, ["member"])
    user = get_current_user(request)
    db = request.dbsession

    m = (
        db.query(Membership)
        .filter(Membership.member_id == user.id)
        .order_by(Membership.end_at.desc())
        .first()
    )

    request.response.status_code = 200
    return {
        "message": "Membership fetched",
        "data": _membership_to_dict(m) if m else None
    }
