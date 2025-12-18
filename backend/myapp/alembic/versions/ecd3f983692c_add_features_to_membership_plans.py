"""add features to membership_plans

Revision ID: ecd3f983692c
Revises: 5f2bfaa49f0f
Create Date: 2025-12-18 16:03:14.922335

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ecd3f983692c'
down_revision: Union[str, Sequence[str], None] = '5f2bfaa49f0f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.add_column(
        "membership_plans",
        sa.Column("features", sa.JSON(), nullable=True),
    )


def downgrade():
    op.drop_column("membership_plans", "features")