"""create trainer_profiles

Revision ID: 4a1b34aa385f
Revises: 261e23d0c5cd
Create Date: 2025-12-18 14:13:55.957955

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4a1b34aa385f'
down_revision: Union[str, Sequence[str], None] = '261e23d0c5cd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        "trainer_profiles",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True),

        sa.Column("specialization", sa.String(length=120), nullable=True),
        sa.Column("bio", sa.Text(), nullable=True),
        sa.Column("photo_url", sa.String(length=500), nullable=True),

        sa.Column("facebook_url", sa.String(length=500), nullable=True),
        sa.Column("instagram_url", sa.String(length=500), nullable=True),
        sa.Column("x_url", sa.String(length=500), nullable=True),
        sa.Column("linkedin_url", sa.String(length=500), nullable=True),
    )

    op.create_index("ix_trainer_profiles_user_id", "trainer_profiles", ["user_id"], unique=True)

def downgrade():
    op.drop_index("ix_trainer_profiles_user_id", table_name="trainer_profiles")
    op.drop_table("trainer_profiles")