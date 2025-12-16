# myapp/seeder/create_default_users.py

from datetime import datetime

from pyramid.paster import bootstrap
from sqlalchemy.exc import IntegrityError

from myapp.models.user import User, UserRole
from myapp.security import hash_password


def run_seeder():
    # kalau kamu menjalankan dari folder `backend/`
    env = bootstrap('development.ini')

    request = env['request']

    # 🔴 PENTING: semua operasi DB harus di dalam context transaksi ini
    with request.tm:
        dbsession = request.dbsession

        users_to_create = [
            {
                "name": "Default Admin",
                "email": "admin@gym.com",
                "password": "admin123",
                "role": UserRole.ADMIN.value,    # "admin"
            },
            {
                "name": "Default Trainer",
                "email": "trainer@gym.com",
                "password": "trainer123",
                "role": UserRole.TRAINER.value,  # "trainer"
            },
        ]

        for u in users_to_create:
            existing = dbsession.query(User).filter(User.email == u["email"]).first()
            if existing:
                print(f"User {u['email']} sudah ada, skip.")
                continue

            new_user = User(
                name=u["name"],
                email=u["email"],
                password_hash=hash_password(u["password"]),
                role=u["role"],  # simpan string "admin"/"trainer"
                created_at=datetime.utcnow(),
            )

            dbsession.add(new_user)

            try:
                dbsession.flush()
                print(f"User {u['email']} berhasil dibuat.")
            except IntegrityError:
                print(f"Gagal membuat {u['email']} (mungkin duplikat).")

        # `with request.tm:` akan auto-commit kalau tidak ada exception
        print("Seeder selesai.")


if __name__ == "__main__":
    run_seeder()
