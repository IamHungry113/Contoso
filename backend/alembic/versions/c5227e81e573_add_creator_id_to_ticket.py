"""add creator_id to ticket

Revision ID: c5227e81e573
Revises: 67f47e895305
Create Date: 2025-10-11 16:12:00.491217

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c5227e81e573'
down_revision: Union[str, Sequence[str], None] = '67f47e895305'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
