from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
from sqlalchemy.orm import relationship
from .meta import Base

class Membership(Base):
    __tablename__ = "memberships"

    id = Column(Integer, primary_key=True, autoincrement=True)

    member_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    plan_id = Column(Integer, ForeignKey("membership_plans.id", ondelete="RESTRICT"), nullable=False, index=True)

    start_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    end_at = Column(DateTime, nullable=False)

    status = Column(String(20), nullable=False, default="active")  # active, expired, canceled

    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    member = relationship("User", foreign_keys=[member_id])
    plan = relationship("MembershipPlan")
