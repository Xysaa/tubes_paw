from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base

class Class(Base):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True, autoincrement=True)

    trainer_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    name = Column(String(150), nullable=False)

    # deskripsi panjang (optional)
    description = Column(String(500), nullable=True)

    # ✅ untuk UI card (max 5 kata)
    short_description = Column(String(80), nullable=True)

    # ✅ gambar untuk card
    image_url = Column(String(500), nullable=True)

    schedule = Column(String(100), nullable=False)
    capacity = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    trainer = relationship("User", backref="classes")
