"""add image and short_description to classes

Revision ID: 5f2bfaa49f0f
Revises: 4a1b34aa385f
Create Date: 2025-12-18 14:30:45.834454

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5f2bfaa49f0f'
down_revision: Union[str, Sequence[str], None] = '4a1b34aa385f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("classes", sa.Column("short_description", sa.String(length=80), nullable=True))
    op.add_column("classes", sa.Column("image_url", sa.String(length=500), nullable=True))

def downgrade() -> None:
    op.drop_column("classes", "image_url")
    op.drop_column("classes", "short_description")
