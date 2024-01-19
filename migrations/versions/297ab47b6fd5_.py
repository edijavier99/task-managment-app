"""empty message

Revision ID: 297ab47b6fd5
Revises: 51bdcea2c175
Create Date: 2024-01-19 14:44:16.952215

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '297ab47b6fd5'
down_revision = '51bdcea2c175'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('project',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=70), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('finished',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=70), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['project_id'], ['project.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inProccess',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=70), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['project_id'], ['project.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('step',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=70), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['project_id'], ['project.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('step')
    op.drop_table('inProccess')
    op.drop_table('finished')
    op.drop_table('project')
    # ### end Alembic commands ###
