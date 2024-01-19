from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum,ForeignKey,Float


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    surname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "surname" : self.surname,
            "name" : self.name,
        }

class Todo(db.Model):
    __tablename__ = "todo"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable= False)
    date = db.Column(db.Date, nullable = False)
    complete = db.Column(db.Boolean, default = False)

    def __repr__(self):
        return f'<Todo {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "date": self.date,
            "complete": self.complete
        }

class Notes(db.Model):
    __tablename__ = "notes"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable= False)
    description = db.Column(db.String(1650), nullable= False)
    date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Notes {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date
        }

class Project(db.Model):
    __tablename__ = "project"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(70), nullable=False)
    steps = db.relationship("Step", back_populates="project")
    steps_inproccess = db.relationship("InProccess", back_populates="project")
    steps_finished = db.relationship("Finished", back_populates="project")

    def __repr__(self):
        return f'<Project {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "steps": [step.serialize() for step in self.steps],
            "steps_inproccess": [inProccess.serialize() for inProccess in self.steps_inproccess],
            "steps_finished" : [finished.serialize() for finished in self.steps_finished]
        }

class Step(db.Model):
    __tablename__ = "step"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(70), nullable=False)
    project_id = db.Column(db.Integer, ForeignKey('project.id'))
    project = db.relationship("Project", back_populates="steps")

    def __repr__(self):
        return f'<Step {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "project_id": self.project_id,
        }

class InProccess(db.Model):
    __tablename__ = "inProccess"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(70), nullable=False)
    project_id = db.Column(db.Integer, ForeignKey('project.id'))
    project = db.relationship("Project", back_populates="steps_inproccess")

    def __repr__(self):
        return f'<InProccess {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "project_id": self.project_id,
        }

    
class Finished(db.Model):
    __tablename__ = "finished"
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(70), nullable = False)
    project_id = db.Column(db.Integer, ForeignKey('project.id'))
    project = db.relationship("Project", back_populates="steps_finished")

    def __repr__(self):
        return f'<Finished {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "project_id": self.project_id,
        }
