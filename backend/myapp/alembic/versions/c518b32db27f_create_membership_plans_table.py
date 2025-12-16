"""create membership plans table

Revision ID: c518b32db27f
Revises: 1a1d03686c0e
Create Date: 2025-12-13 13:07:54.732581

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c518b32db27f'
down_revision: Union[str, Sequence[str], None] = '1a1d03686c0e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        "membership_plans",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("price", sa.Integer(), nullable=False),
        sa.Column("duration_days", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_unique_constraint("uq_membership_plan_name", "membership_plans", ["name"])


def downgrade():
    op.drop_constraint("uq_membership_plan_name", "membership_plans", type_="unique")
    op.drop_table("membership_plans")
