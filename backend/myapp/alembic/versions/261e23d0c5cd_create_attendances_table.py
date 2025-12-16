"""create attendances table

Revision ID: 261e23d0c5cd
Revises: bf31aa3b95f2
Create Date: 2025-12-13 13:48:34.667504

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '261e23d0c5cd'
down_revision: Union[str, Sequence[str], None] = 'bf31aa3b95f2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        "attendances",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("class_id", sa.Integer(), sa.ForeignKey("classes.id", ondelete="CASCADE"), nullable=False),
        sa.Column("member_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="present"),
        sa.Column("marked_by", sa.Integer(), sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True),
        sa.Column("marked_at", sa.DateTime(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )

    op.create_index("ix_attendances_class_id", "attendances", ["class_id"])
    op.create_index("ix_attendances_member_id", "attendances", ["member_id"])
    op.create_unique_constraint("uq_attendance_class_member", "attendances", ["class_id", "member_id"])

def downgrade():
    op.drop_constraint("uq_attendance_class_member", "attendances", type_="unique")
    op.drop_index("ix_attendances_member_id", table_name="attendances")
    op.drop_index("ix_attendances_class_id", table_name="attendances")
    op.drop_table("attendances")
