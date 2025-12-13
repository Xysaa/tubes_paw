from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPNotFound,
    HTTPConflict,
)
from sqlalchemy.exc import IntegrityError

from ..models.membership_plan import MembershipPlan
from ..auth_utils import require_roles, get_current_user


def _plan_to_dict(p: MembershipPlan):
    return {
        "id": p.id,
        "name": p.name,
        "description": p.description,
        "price": p.price,
        "duration_days": p.duration_days,
        "created_at": p.created_at.isoformat(),
    }


# ================= LIST =================

@view_config(
    route_name="membership_plans",
    request_method="GET",
    renderer="json"
)
def list_membership_plans(request):
    """
    GET /api/memberships
    ADMIN only
    """
    require_roles(request, ["admin", "trainer", "member"])
    db = request.dbsession

    plans = db.query(MembershipPlan).order_by(MembershipPlan.created_at.desc()).all()

    return {
        "message": "Membership plans fetched",
        "data": [_plan_to_dict(p) for p in plans]
    }


# ================= CREATE =================

@view_config(
    route_name="membership_plans",
    request_method="POST",
    renderer="json"
)
def create_membership_plan(request):
    """
    POST /api/memberships
    ADMIN only
    """
    require_roles(request, ["admin"])
    db = request.dbsession

    data = request.json_body

    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    duration_days = data.get("duration_days")

    if not name or price is None or duration_days is None:
        raise HTTPBadRequest(
            json_body={"error": "name, price, duration_days are required"}
        )

    try:
        price = int(price)
        duration_days = int(duration_days)
        if price <= 0 or duration_days <= 0:
            raise ValueError
    except ValueError:
        raise HTTPBadRequest(
            json_body={"error": "price and duration_days must be positive integers"}
        )

    plan = MembershipPlan(
        name=name,
        description=description,
        price=price,
        duration_days=duration_days,
    )

    db.add(plan)
    try:
        db.flush()
    except IntegrityError:
        raise HTTPConflict(json_body={"error": "Membership plan name already exists"})

    request.response.status_code = 201
    return {
        "message": "Membership plan created",
        "data": _plan_to_dict(plan)
    }


# ================= UPDATE =================

@view_config(
    route_name="membership_plan_detail",
    request_method="PUT",
    renderer="json"
)
def update_membership_plan(request):
    """
    PUT /api/memberships/{id}
    ADMIN only
    """
    require_roles(request, ["admin"])
    db = request.dbsession

    try:
        plan_id = int(request.matchdict["id"])
    except ValueError:
        raise HTTPBadRequest(json_body={"error": "Invalid membership id"})

    plan = db.query(MembershipPlan).get(plan_id)
    if not plan:
        raise HTTPNotFound(json_body={"error": "Membership plan not found"})

    data = request.json_body

    if "name" in data:
        plan.name = data["name"]
    if "description" in data:
        plan.description = data["description"]
    if "price" in data:
        try:
            price = int(data["price"])
            if price <= 0:
                raise ValueError
            plan.price = price
        except ValueError:
            raise HTTPBadRequest(json_body={"error": "Invalid price"})
    if "duration_days" in data:
        try:
            days = int(data["duration_days"])
            if days <= 0:
                raise ValueError
            plan.duration_days = days
        except ValueError:
            raise HTTPBadRequest(json_body={"error": "Invalid duration_days"})

    try:
        db.flush()
    except IntegrityError:
        raise HTTPConflict(json_body={"error": "Membership plan name already exists"})

    return {
        "message": "Membership plan updated",
        "data": _plan_to_dict(plan)
    }


# ================= DELETE =================

@view_config(
    route_name="membership_plan_detail",
    request_method="DELETE",
    renderer="json"
)
def delete_membership_plan(request):
    """
    DELETE /api/memberships/{id}
    ADMIN only
    """
    require_roles(request, ["admin"])
    db = request.dbsession

    try:
        plan_id = int(request.matchdict["id"])
    except ValueError:
        raise HTTPBadRequest(json_body={"error": "Invalid membership id"})

    plan = db.query(MembershipPlan).get(plan_id)
    if not plan:
        raise HTTPNotFound(json_body={"error": "Membership plan not found"})

    db.delete(plan)
    db.flush()

    request.response.status_code = 204
    return {}
