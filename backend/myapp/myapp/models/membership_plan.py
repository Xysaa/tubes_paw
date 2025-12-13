from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from .meta import Base


class MembershipPlan(Base):
    __tablename__ = "membership_plans"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    price = Column(Integer, nullable=False)          # harga (misal rupiah)
    duration_days = Column(Integer, nullable=False)  # masa aktif dalam hari
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
