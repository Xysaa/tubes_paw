from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Enum
)
from enum import Enum as PyEnum
from datetime import datetime
from .meta import Base


class UserRole(PyEnum):
    ADMIN = "admin"
    TRAINER = "trainer"
    MEMBER = "member"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)

    # ⬇️ simpan string enum, bukan Python Enum langsung
    role = Column(
        Enum("admin", "trainer", "member", name="user_role_enum"),
        nullable=False,
        default="member",
    )

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
