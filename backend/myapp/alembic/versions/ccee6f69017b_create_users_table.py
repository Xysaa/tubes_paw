"""create users table

Revision ID: ccee6f69017b
Revises: 8fb0e24996ea
Create Date: 2025-12-11 19:00:24.977243
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "ccee6f69017b"
down_revision: Union[str, Sequence[str], None] = "8fb0e24996ea"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    # Definisikan ENUM Postgres, tapi JANGAN auto-create saat table dibuat
    user_role_enum = postgresql.ENUM(
        "admin",
        "trainer",
        "member",
        name="user_role_enum",
        create_type=False,  # <--- penting
    )

    # Buat tipe ENUM sekali saja, kalau belum ada
    user_role_enum.create(op.get_bind(), checkfirst=True)

    # Buat tabel users, pakai ENUM yang sama
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("email", sa.String(length=150), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("role", user_role_enum, nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )

    op.create_index("ix_users_email", "users", ["email"], unique=True)


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_index("ix_users_email", table_name="users")
    op.drop_table("users")

    user_role_enum = postgresql.ENUM(
        "admin",
        "trainer",
        "member",
        name="user_role_enum",
        create_type=False,  # sama seperti di upgrade
    )
    user_role_enum.drop(op.get_bind(), checkfirst=True)
