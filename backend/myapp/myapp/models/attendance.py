from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import relationship
from .meta import Base

class Attendance(Base):
    __tablename__ = "attendances"

    id = Column(Integer, primary_key=True, autoincrement=True)

    class_id = Column(Integer, ForeignKey("classes.id", ondelete="CASCADE"), nullable=False, index=True)
    member_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    status = Column(String(20), nullable=False, default="present")  # present, absent (optional: late)
    marked_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    marked_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    gym_class = relationship("Class")     # pastikan nama model class kamu "Class"
    member = relationship("User", foreign_keys=[member_id])
    marker = relationship("User", foreign_keys=[marked_by])

    __table_args__ = (
        UniqueConstraint("class_id", "member_id", name="uq_attendance_class_member"),
    )
