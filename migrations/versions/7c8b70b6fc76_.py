"""empty message

Revision ID: 7c8b70b6fc76
Revises: 55ae47ebf8bc
Create Date: 2024-01-25 13:03:53.728089

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7c8b70b6fc76'
down_revision = '55ae47ebf8bc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_projects',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('project_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['project_id'], ['project.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], )
    )
    with op.batch_alter_table('project', schema=None) as batch_op:
        batch_op.drop_constraint('project_owner_id_fkey', type_='foreignkey')
        batch_op.drop_column('owner_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('project', schema=None) as batch_op:
        batch_op.add_column(sa.Column('owner_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('project_owner_id_fkey', 'user', ['owner_id'], ['id'])

    op.drop_table('user_projects')
    # ### end Alembic commands ###