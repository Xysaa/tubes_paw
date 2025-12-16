# myapp/models/class.py
from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .meta import Base
from .user import User


class Class(Base):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True, autoincrement=True)

    # trainer yang membuat/mengelola kelas
    trainer_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )

    name = Column(String(150), nullable=False)
    description = Column(String(500), nullable=True)

    # untuk simple: satu field jadwal (misal "2025-12-12 19:00" atau "Setiap Senin 19.00")
    # kalau mau strict bisa jadikan DateTime, tapi di sini pakai string biar fleksibel
    schedule = Column(String(100), nullable=False)

    capacity = Column(Integer, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    trainer = relationship("User", backref="classes")
