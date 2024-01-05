"""empty message

Revision ID: 7ffae985f73d
Revises: 2f7be0208fa7
Create Date: 2024-01-05 12:39:44.208556

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7ffae985f73d'
down_revision = '2f7be0208fa7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('notes', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATE(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('notes', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATE(),
               nullable=True)

    # ### end Alembic commands ###