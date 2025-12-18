from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base

class TrainerProfile(Base):
    __tablename__ = "trainer_profiles"

    id = Column(Integer, primary_key=True, autoincrement=True)

    # 1-1 ke users (akun trainer)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)

    specialization = Column(String(120), nullable=True)     # bidang keahlian
    bio = Column(Text, nullable=True)
    photo_url = Column(String(500), nullable=True)

    facebook_url = Column(String(500), nullable=True)
    instagram_url = Column(String(500), nullable=True)
    x_url = Column(String(500), nullable=True)
    linkedin_url = Column(String(500), nullable=True)

    user = relationship("User", back_populates="trainer_profile")
