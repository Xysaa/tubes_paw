from pyramid.paster import bootstrap
from sqlalchemy.exc import IntegrityError
from datetime import datetime,timezone

from myapp.models.membership_plan import MembershipPlan


def run_seeder():
    env = bootstrap("development.ini")
    request = env["request"]

    with request.tm:
        db = request.dbsession

        plans = [
            {
                "name": "Basic",
                "description": "Akses gym standar untuk pemula",
                "price": 200000,
                "duration_days": 30,
                "features": [
                    "Gym Access",
                    "Community Support",
                ],
            },
            {
                "name": "Gold",
                "description": "Akses semua kelas + trainer",
                "price": 300000,
                "duration_days": 30,
                "features": [
                    "Unlimited Gym Access",
                    "All Classes",
                    "Professional Trainer",
                ],
            },
            {
                "name": "Platinum",
                "description": "Program lengkap + prioritas",
                "price": 500000,
                "duration_days": 30,
                "features": [
                    "Unlimited Gym Access",
                    "All Classes",
                    "Personal Trainer",
                    "Nutrition Consultation",
                ],
            },
        ]

        for data in plans:
            existing = (
                db.query(MembershipPlan)
                .filter(MembershipPlan.name == data["name"])
                .first()
            )

            if existing:
                print(f"⚠️ Membership '{data['name']}' sudah ada, skip.")
                continue

            plan = MembershipPlan(
                name=data["name"],
                description=data["description"],
                price=data["price"],
                duration_days=data["duration_days"],
                features=data["features"],
                created_at=datetime.now(timezone.utc),

            )

            db.add(plan)

            try:
                db.flush()
                print(f"✅ Membership '{data['name']}' dibuat")
            except IntegrityError:
                print(f"❌ Gagal membuat membership '{data['name']}'")

        print("🎉 Seeder membership selesai.")


if __name__ == "__main__":
    run_seeder()
