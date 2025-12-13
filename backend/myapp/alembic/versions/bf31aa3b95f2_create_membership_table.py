"""create membership table

Revision ID: bf31aa3b95f2
Revises: c518b32db27f
Create Date: 2025-12-13 13:30:01.163568

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bf31aa3b95f2'
down_revision: Union[str, Sequence[str], None] = 'c518b32db27f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        "memberships",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("member_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("plan_id", sa.Integer(), sa.ForeignKey("membership_plans.id", ondelete="RESTRICT"), nullable=False),
        sa.Column("start_at", sa.DateTime(), nullable=False),
        sa.Column("end_at", sa.DateTime(), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="active"),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_memberships_member_id", "memberships", ["member_id"])
    op.create_index("ix_memberships_plan_id", "memberships", ["plan_id"])


def downgrade():
    op.drop_index("ix_memberships_plan_id", table_name="memberships")
    op.drop_index("ix_memberships_member_id", table_name="memberships")
    op.drop_table("memberships")