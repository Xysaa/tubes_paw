# yourapp/security.py
from datetime import datetime, timedelta
from passlib.hash import pbkdf2_sha256
import jwt


def hash_password(plain_password: str) -> str:
    """
    Hash password menggunakan PBKDF2-SHA256.
    Tidak punya limit 72 byte seperti bcrypt.
    """
    return pbkdf2_sha256.hash(plain_password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifikasi password plain terhadap hash yang tersimpan.
    """
    return pbkdf2_sha256.verify(plain_password, hashed_password)


def create_access_token(user, settings):
    """
    user: instance User
    settings: request.registry.settings
    """
    secret = settings.get("jwt.secret", "change-me")
    algorithm = settings.get("jwt.algorithm", "HS256")
    exp_minutes = int(settings.get("jwt.exp_minutes", "60"))

    payload = {
        "sub": str(user.id),
        "email": user.email,
        "role": user.role.value if hasattr(user.role, "value") else user.role,
        "exp": datetime.utcnow() + timedelta(minutes=exp_minutes),
        "iat": datetime.utcnow(),
    }

    token = jwt.encode(payload, secret, algorithm=algorithm)
    return token


def decode_access_token(token: str, settings):
    secret = settings.get("jwt.secret", "change-me")
    algorithm = settings.get("jwt.algorithm", "HS256")

    return jwt.decode(token, secret, algorithms=[algorithm])
