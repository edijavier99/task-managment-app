from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import Enum,ForeignKey,Float
import enum

class myEnum(enum.Enum):
    step = "step"
    proccess = "proccess"
    finished = "finished"


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    surname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    # 1 to Many Projects
    projects = db.relationship("Project" ,back_populates = "project_owner")
    # 1 to Many Todos
    todos = db.relationship("Todo", back_populates = "todo_owner")
    # 1 to Many Notes
    notes = db.relationship("Notes", back_populates = "note_owner")
    
    roles = db.relationship("Role", secondary="user_roles", backref=db.backref('users', lazy='dynamic'))


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "surname" : self.surname,
            "name" : self.name,
            "projects": [project.serialize() for project in self.projects],
            "todos": [todo.serialize() for todo in self.todos],
            "notes": [note.serialize() for note in self.notes],
        }

class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    title = db.Column(db.String(255))

    def __repr__(self):
        return f'<Role {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
    
class UserRoles(db.Model):
    __tablename__ = 'user_roles'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), primary_key=True)
    

class Todo(db.Model):
    __tablename__ = "todo"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable= False)
    date = db.Column(db.Date, nullable = False)
    complete = db.Column(db.Boolean, default = False)
    todo_owner = db.relationship("User", back_populates = "todos")
    owner_id = db.Column(db.Integer, ForeignKey('user.id'))

    def __repr__(self):
        return f'<Todo {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "date": self.date,
            "complete": self.complete,
            "owner_id" : self.owner_id
        }

class Notes(db.Model):
    __tablename__ = "notes"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable= False)
    description = db.Column(db.String(1650), nullable= False)
    date = db.Column(db.Date, nullable=False)
    note_owner = db.relationship("User", back_populates = "notes")
    owner_id = db.Column(db.Integer, ForeignKey('user.id'))

    def __repr__(self):
        return f'<Notes {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date,
            "owner_id" : self.owner_id
        }

class Project(db.Model):
    __tablename__ = "project"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(70), nullable=False)
    steps = db.relationship("Step", back_populates="project")
    project_owner = db.relationship("User", back_populates = "projects")
    owner_id = db.Column(db.Integer, ForeignKey('user.id'))

    def __repr__(self):
        return f'<Project {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "steps": [step.serialize() for step in self.steps],
            "owner_id": self.owner_id
        }

class Step(db.Model):
    __tablename__ = "step"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(70), nullable=False)
    project_id = db.Column(db.Integer, ForeignKey('project.id'))
    project = db.relationship("Project", back_populates="steps")
    category = db.Column(Enum(myEnum))

    def __repr__(self):
        return f'<Step {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "project_id": self.project_id,
            "category": self.category.value if self.category else None,
        }
