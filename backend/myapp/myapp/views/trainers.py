from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound
from sqlalchemy.orm import joinedload

from ..models.user import User
from ..models.trainers_profile import TrainerProfile

def serialize_trainer(u: User):
    p = u.trainer_profile
    return {
        "id": u.id,
        "name": u.name,
        "email": u.email,
        "role": u.role,
        "created_at": u.created_at.isoformat() if u.created_at else None,
        "profile": None if not p else {
            "specialization": p.specialization,
            "bio": p.bio,
            "photo_url": p.photo_url,
            "social": {
                "facebook": p.facebook_url,
                "instagram": p.instagram_url,
                "x": p.x_url,
                "linkedin": p.linkedin_url,
            }
        }
    }

@view_config(route_name="trainers_list", request_method="GET", renderer="json")
def trainers_list(request):
    db = request.dbsession

    trainers = (
        db.query(User)
        .options(joinedload(User.trainer_profile))
        .filter(User.role == "trainer")
        .order_by(User.created_at.desc())
        .all()
    )

    return {
        "message": "Trainers fetched successfully",
        "data": [serialize_trainer(u) for u in trainers],
    }

@view_config(route_name="trainer_detail", request_method="GET", renderer="json")
def trainer_detail(request):
    db = request.dbsession
    trainer_id = int(request.matchdict["id"])

    u = (
        db.query(User)
        .options(joinedload(User.trainer_profile))
        .filter(User.id == trainer_id, User.role == "trainer")
        .first()
    )
    if not u:
        raise HTTPNotFound(json_body={"error": "Trainer not found"})

    return {"message": "Trainer fetched successfully", "data": serialize_trainer(u)}
