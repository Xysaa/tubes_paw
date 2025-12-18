from datetime import datetime

from pyramid.paster import bootstrap
from sqlalchemy.exc import IntegrityError

from myapp.models.user import User, UserRole
from myapp.models.trainers_profile import TrainerProfile
from myapp.security import hash_password


def run_seeder():
    env = bootstrap("development.ini")
    request = env["request"]

    with request.tm:
        dbsession = request.dbsession

        trainers = [
            {
                "name": "Alex Carter",
                "email": "alex.carter@gym.com",
                "password": "trainer123",
                "specialization": "Strength & Conditioning Coach",
                "photo": "/images/pelatih1.png",
            },
            {
                "name": "Emily Turner",
                "email": "emily.turner@gym.com",
                "password": "trainer123",
                "specialization": "Yoga & Recovery Specialist",
                "photo": "/images/pelatih2.png",
            },
            {
                "name": "Ethan Parker",
                "email": "ethan.parker@gym.com",
                "password": "trainer123",
                "specialization": "Cardio & Endurance Coach",
                "photo": "/images/pelatih3.png",
            },
            {
                "name": "Oliver Reed",
                "email": "oliver.reed@gym.com",
                "password": "trainer123",
                "specialization": "Endurance & Performance Training",
                "photo": "/images/pelatih4.png",
            },
            {
                "name": "Ryan Brooks",
                "email": "ryan.brooks@gym.com",
                "password": "trainer123",
                "specialization": "Muscle Building & Power Training",
                "photo": "/images/pelatih5.png",
            },
            {
                "name": "Lucas Bennett",
                "email": "lucas.bennett@gym.com",
                "password": "trainer123",
                "specialization": "Mobility & Flexibility Coach",
                "photo": "/images/pelatih6.png",
            },
            {
                "name": "Daniel Foster",
                "email": "daniel.foster@gym.com",
                "password": "trainer123",
                "specialization": "Functional Training Coach",
                "photo": "/images/pelatih7.png",
            },
        ]

        for t in trainers:
            existing_user = (
                dbsession.query(User)
                .filter(User.email == t["email"])
                .first()
            )

            if existing_user:
                print(f"Trainer {t['email']} sudah ada, skip.")
                continue

            user = User(
                name=t["name"],
                email=t["email"],
                password_hash=hash_password(t["password"]),
                role=UserRole.TRAINER.value,
                created_at=datetime.utcnow(),
            )

            dbsession.add(user)
            dbsession.flush()  # supaya user.id tersedia

            profile = TrainerProfile(
                user_id=user.id,
                specialization=t["specialization"],
                photo_url=t["photo"],
                bio=f"{t['name']} adalah pelatih profesional dengan spesialisasi {t['specialization']}.",
                instagram_url="#",
                facebook_url="#",
                x_url="#",
                linkedin_url="#",
            )

            dbsession.add(profile)

            try:
                dbsession.flush()
                print(f"Trainer {t['name']} berhasil dibuat.")
            except IntegrityError:
                print(f"Gagal membuat trainer {t['email']}.")

        print("Seeder trainer selesai.")


if __name__ == "__main__":
    run_seeder()
