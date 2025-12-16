# myapp/models/booking.py
from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from .meta import Base

class Booking(Base):
    __tablename__ = "bookings"
    __table_args__ = (
        UniqueConstraint("member_id", "class_id", name="uq_booking_member_class"),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)

    member_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    class_id  = Column(Integer, ForeignKey("classes.id", ondelete="CASCADE"), nullable=False)

    booking_date = Column(DateTime, default=datetime.utcnow, nullable=False)

    # relationships (optional tapi enak buat join)
    member = relationship("User", lazy="joined")
    gym_class = relationship("Class", lazy="joined")
