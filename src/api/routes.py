"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Todo,Notes
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Routes for Todo

@api.route('/todo', methods=['GET'])
def get_all_tasks():
    all_tasks = Todo.query.all()
    all_tasks = list(map(lambda x : x.serialize(), all_tasks))
    return jsonify(all_tasks),200

@api.route('/todo/<int:id>', methods= ['GET'])
def get_single_task(id):
    single_task = Todo.query.get(id)
    return jsonify(single_task),200

@api.route('/add-todo', methods= ['POST'])
def add_todo():
    data = request.get_json()

    if data is None:
        response_body = {
            "msg" : "Body should be passed with the request"
        }
        return jsonify(response_body),400
    
    required_fields = ["title", "date"]
    for field in required_fields:
        if field not in data:
            response_body = {
                "msg": f"{field.capitalize()} should be in request"
            }
            return jsonify(response_body),400
    
    new_todo = Todo(title = data["title"], date = data["date"])
    db.session.add(new_todo)   
    db.session.commit()

    return jsonify({"msg": "New todo added"}),200

@api.route('/delete-todo/<int:id>', methods= ["DELETE"])
def delete_todo(id):
    todo_to_delete = Todo.query.get(id)
    db.session.remove(todo_to_delete)
    db.session.commit()

    return jsonify({"msg": "Todo succesfully removed"})

@api.route('/modify-todo/<int:id>', methods = ['PUT'])
def modify_todo(id):
    data = Todo.request.get_json()
    
    if data is None:
        response_body = {
            "msg" : "Body should be passed with the request"
        }
        return jsonify(response_body),400
    
    update_todo = Todo.query.get(id)
    update_todo.title = data["title"]
    update_todo.date = data["date"]

    db.session.commit(update_todo)

    return jsonify({"msg": f"{update_todo.title} Todo updated"}),200


#Routes for Notes

@api.route('/notes', methods=['GET'])
def get_all_notes():
    all_notes = Notes.query.all()
    all_notes = list(map(lambda x : x.serialize, all_notes))
    return jsonify(all_notes),200

@api.route('/notes/<int:id>', methods= ['GET'])
def get_single_notes(id):
    single_notes = Notes.query.get(id)
    return jsonify(single_notes),200

@api.route('/add-notes', methods= ['POST'])
def add_notes():
    data = request.get_json()

    if data is None:
        response_body = {
            "msg" : "Body should be passed with the request"
        }
        return jsonify(response_body),400
    
    required_fields = ["title","date", "description"]
    for field in required_fields:
        if field not in data:
            response_body = {
                "msg": f"{field.capitalize()} should be in request"
            }
            return jsonify(response_body),400
    
    new_notes = Notes(title = data["title"], date = data["date"], description = data["description"])
    db.session.add(new_notes)   
    db.session.commit()

    return jsonify({"msg": "New notes added"}),200

@api.route('/delete-note/<int:id>', methods= ["DELETE"])
def delete_note(id):
    note_to_delete = Notes.query.get(id)
    db.session.remove(note_to_delete)
    db.session.commit()

    return jsonify({"msg": "Note succesfully removed"})

@api.route('/modify-note/<int:id>', methods = ['PUT'])
def modify_note(id):
    data = Notes.request.get_json()
    
    if data is None:
        response_body = {
            "msg" : "Body should be passed with the request"
        }
        return jsonify(response_body),400
    
    update_note = Notes.query.get(id)
    update_note.title = data["title"]
    update_note.date = data["date"]
    update_note.description = data["description"]

    db.session.commit(update_note)

    return jsonify({"msg": f"{update_note.title} Notes updated"}),200

