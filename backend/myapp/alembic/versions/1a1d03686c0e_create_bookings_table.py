"""create bookings table

Revision ID: 1a1d03686c0e
Revises: 123456789abc
Create Date: 2025-12-13 12:58:10.664292

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1a1d03686c0e'
down_revision: Union[str, Sequence[str], None] = '123456789abc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        "bookings",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("member_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("class_id", sa.Integer(), sa.ForeignKey("classes.id", ondelete="CASCADE"), nullable=False),
        sa.Column("booking_date", sa.DateTime(), nullable=False),
    )
    op.create_unique_constraint("uq_booking_member_class", "bookings", ["member_id", "class_id"])
    op.create_index("ix_bookings_member_id", "bookings", ["member_id"])
    op.create_index("ix_bookings_class_id", "bookings", ["class_id"])

def downgrade():
    op.drop_index("ix_bookings_class_id", table_name="bookings")
    op.drop_index("ix_bookings_member_id", table_name="bookings")
    op.drop_constraint("uq_booking_member_class", "bookings", type_="unique")
    op.drop_table("bookings")
