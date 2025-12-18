from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound, HTTPConflict
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from ..models.membership_plan import MembershipPlan
from ..auth_utils import require_roles


def _plan_to_dict(p: MembershipPlan):
    return {
        "id": p.id,
        "name": p.name,
        "description": p.description,
        "price": p.price,
        "duration_days": p.duration_days,
        "features": p.features or [],
        "created_at": p.created_at.isoformat(),
    }


# ================= PUBLIC LIST =================
@view_config(route_name="membership_plans", request_method="GET", renderer="json")
def list_membership_plans(request):
    db = request.dbsession

    plans = db.query(MembershipPlan).order_by(MembershipPlan.price.asc()).all()

    return {
        "message": "Membership plans fetched",
        "data": [_plan_to_dict(p) for p in plans],
    }


# ================= CREATE =================
@view_config(route_name="membership_plans", request_method="POST", renderer="json")
def create_membership_plan(request):
    require_roles(request, ["admin"])
    db = request.dbsession
    data = request.json_body or {}

    name = data.get("name")
    price = data.get("price")
    duration_days = data.get("duration_days")
    description = data.get("description")
    features = data.get("features", [])

    if not name or price is None or duration_days is None:
        raise HTTPBadRequest(json_body={"error": "name, price, duration_days required"})

    if not isinstance(features, list):
        raise HTTPBadRequest(json_body={"error": "features must be list"})

    plan = MembershipPlan(
        name=name,
        description=description,
        price=int(price),
        duration_days=int(duration_days),
        features=features,
        created_at=datetime.utcnow(),
    )

    db.add(plan)
    try:
        db.flush()
    except IntegrityError:
        raise HTTPConflict(json_body={"error": "Plan name already exists"})

    return {
        "message": "Membership plan created",
        "data": _plan_to_dict(plan),
    }


# ================= UPDATE =================
@view_config(route_name="membership_plan_detail", request_method="PUT", renderer="json")
def update_membership_plan(request):
    require_roles(request, ["admin"])
    db = request.dbsession

    plan = db.query(MembershipPlan).get(int(request.matchdict["id"]))
    if not plan:
        raise HTTPNotFound(json_body={"error": "Plan not found"})

    data = request.json_body or {}

    for field in ["name", "description", "price", "duration_days", "features"]:
        if field in data:
            setattr(plan, field, data[field])

    db.flush()
    return {"message": "Membership plan updated", "data": _plan_to_dict(plan)}


# ================= DELETE =================
@view_config(route_name="membership_plan_detail", request_method="DELETE", renderer="json")
def delete_membership_plan(request):
    require_roles(request, ["admin"])
    db = request.dbsession

    plan = db.query(MembershipPlan).get(int(request.matchdict["id"]))
    if not plan:
        raise HTTPNotFound(json_body={"error": "Plan not found"})

    db.delete(plan)
    db.flush()
    request.response.status_code = 204
    return {}
