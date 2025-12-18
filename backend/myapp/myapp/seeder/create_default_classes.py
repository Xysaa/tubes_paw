# myapp/seeder/create_default_classes.py

from pyramid.paster import bootstrap
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from myapp.models.classes import Class
from myapp.models.user import User


def run_seeder():
    env = bootstrap("development.ini")
    request = env["request"]

    with request.tm:
        db = request.dbsession

        # Ambil semua trainer
        trainers = (
            db.query(User)
            .filter(User.role == "trainer")
            .all()
        )

        if not trainers:
            print("❌ Tidak ada trainer. Jalankan seeder trainer dulu.")
            return

        # Map trainer ke data visual
        class_data = [
            {
                "name": "Strength Training",
                "short_description": "Build muscle power",
                "description": "Structured strength program to increase muscle mass and raw power.",
                "image_url": "/images/classes/strength.jpg",
                "schedule": "Every Monday 19:00",
                "capacity": 20,
            },
            {
                "name": "HIIT Cardio",
                "short_description": "Burn fat fast",
                "description": "High intensity interval training to burn calories and boost stamina.",
                "image_url": "/images/classes/hiit.jpg",
                "schedule": "Wednesday 18:30",
                "capacity": 15,
            },
            {
                "name": "Functional Training",
                "short_description": "Move better daily",
                "description": "Improve mobility, balance, and everyday strength.",
                "image_url": "/images/classes/functional.jpg",
                "schedule": "Friday 17:00",
                "capacity": 18,
            },
            {
                "name": "Body Transformation",
                "short_description": "Shape your body",
                "description": "Complete program for fat loss and muscle shaping.",
                "image_url": "/images/classes/transformation.jpg",
                "schedule": "Saturday 09:00",
                "capacity": 25,
            },
        ]

        trainer_index = 0

        for data in class_data:
            trainer = trainers[trainer_index % len(trainers)]
            trainer_index += 1

            existing = (
                db.query(Class)
                .filter(
                    Class.name == data["name"],
                    Class.trainer_id == trainer.id,
                )
                .first()
            )

            if existing:
                print(f"⚠️ Class '{data['name']}' sudah ada, skip.")
                continue

            new_class = Class(
                name=data["name"],
                short_description=data["short_description"],
                description=data["description"],
                image_url=data["image_url"],
                schedule=data["schedule"],
                capacity=data["capacity"],
                trainer_id=trainer.id,
                created_at=datetime.utcnow(),
            )

            db.add(new_class)

            try:
                db.flush()
                print(f"✅ Class '{data['name']}' dibuat (Trainer: {trainer.name})")
            except IntegrityError:
                print(f"❌ Gagal membuat class '{data['name']}'")

        print("🎉 Seeder classes selesai.")


if __name__ == "__main__":
    run_seeder()
