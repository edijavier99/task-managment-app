from flask_sqlalchemy import SQLAlchemy

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

    def __repr__(self):
        return f'<Todo {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "date": self.date
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