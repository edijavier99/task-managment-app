"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint,current_app, abort
from api.models import db, User,Todo,Notes,Project,Step,myEnum
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime,timedelta
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api)


# Routes for Todo

@api.route('<int:user_id>/todo', methods=['GET'])
def get_all_tasks(user_id):
    all_tasks = Todo.query.all()
    filtered_tasks_serialized = [task.serialize() for task in all_tasks if task.owner_id == user_id]
    return jsonify(filtered_tasks_serialized),200

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
    
    required_fields = ["title", "date","owner_id"]
    for field in required_fields:
        if field not in data:
            response_body = {
                "msg": f"{field.capitalize()} should be in request"
            }
            return jsonify(response_body),400
        
    date_str = data["date"]
    date_obj = datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%S.%fZ').date()
    
    new_todo = Todo(title=data["title"].capitalize(), date=date_obj , owner_id = data["owner_id"])
    db.session.add(new_todo)   
    db.session.commit()

    return jsonify({"msg": "New todo added"}),200

@api.route('/delete-todo/<int:id>', methods= ["DELETE"])
def delete_todo(id):
    todo_to_delete = Todo.query.get(id)
    db.session.delete(todo_to_delete)
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

@api.route('/completedTodo/<int:id>', methods=['PUT'])
def mark_todo_as_completed(id):
    todo = Todo.query.get_or_404(id)
    # Actualizar el estado de la tarea a completada
    todo.complete = True
    db.session.commit()

    return jsonify({"msg": f"{todo.title} marcada como completada"}), 200

@api.route('/completed-todos', methods=['GET'])
def get_completed_todos():
    completed_todos = Todo.query.filter_by(complete=True).all()
    return jsonify([todo.serialize() for todo in completed_todos])

#Routes for Notes

@api.route('<int:user_id>/notes', methods=['GET'])
def get_all_notes(user_id):
    all_notes = Notes.query.all()
    filtered_notes_serialized = [ note.serialize() for note in all_notes if note.owner_id == user_id]
    return jsonify(filtered_notes_serialized),200

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
    
    required_fields = ["title","date", "description","owner_id"]
    for field in required_fields:
        if field not in data:
            response_body = {
                "msg": f"{field.capitalize()} should be in request"
            }
            return jsonify(response_body),400
        
    date_str = data["date"]
    date_obj = datetime.strptime(date_str, '%d/%m/%Y').date()
    
    new_notes = Notes(title = data["title"], date=date_obj, description = data["description"], owner_id = data["owner_id"])
    db.session.add(new_notes)   
    db.session.commit()

    return jsonify({"msg": "New notes added"}),200

@api.route('/delete-note/<int:id>', methods= ['DELETE'])
def delete_note(id):
    note_to_delete = Notes.query.get(id)
    db.session.delete(note_to_delete)
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


#For users
@api.route('/users', methods=['GET'])
def get_all_users():
   all_users = User.query.all()
   all_users = list(map(lambda x : x.serialize(),all_users))
   return jsonify(all_users),200

@api.route('/users/<int:id>', methods=['GET'])
def get_single_user(id):
    single_user = User.query.get(id)
    return jsonify(single_user),200

@api.route('/create-user', methods=['POST'])
def create_user():
    data = request.get_json()
    if data is None :
        response_body = {
            "msg" : "Body should be passed with request"
        }
        return jsonify(response_body),400
        
    required_fields = ["name" , "surname" , "email" , "password"]
    for fields in required_fields:
        if fields not in data:
            response_body = {
                "msg" : f"{fields.capitalize()} should be in the request"
            }
            return jsonify(response_body),400
    
    new_user = User(name = data["name"], surname = data["surname"], email = data["email"], password = data["password"])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": f"{new_user.name} added"}),200


@api.route('/delete-user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user_to_delete = User.query.get(id)
    db.session.delete(user_to_delete) 
    db.session.commit()

    return jsonify({"msg" : f"{user_to_delete.name} user deleted"})

# Route to Login

@api.route('/login', methods=['POST'])
def user_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None or password is None:
        response_body = {
            "msg": "Email and password are required"
        }
        return jsonify(response_body), 400

    user = User.query.filter_by(email=email).first()
    if user is None:
        response_body = {
            "msg": "User not found"
        }
        return jsonify(response_body), 404

    if user and user.password == password:
        logged = "Successfully logged"
        access_token = create_access_token(identity=user.id)
        return jsonify({"loginOK": logged, "token": access_token, "user_id": user.id, "name": user.name, "email": user.email})
    else :
        return jsonify({"msg" : "Contraseña Incorrecta"})
    

@api.route('/search', methods=['GET'])
def search():
    search_query = request.args.get('query')
    message = ""
    if search_query:
        resultsTodo = Todo.query.filter(Todo.title.ilike(f'%{search_query}%')).all()
        resultNotes = Notes.query.filter(Notes.title.ilike(f'%{search_query}%')).all()
        allResults = resultNotes + resultsTodo
        serialized_results = [{'id': item.id, 'title': item.title} for item in allResults]
    else:
        serialized_results = []
        message = "No se ha encontrado ninguna coincidencia."

    return jsonify({"Results": serialized_results , "Message": message}), 200



@api.route('<int:user_id>/projects', methods=['GET'])
def get_all_projects(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(404, description=f"User with ID {user_id} not found")

    users_projects = user.projects
    serialized_projects = [project.serialize() for project in users_projects]
    return jsonify({"projects": serialized_projects}), 200


@api.route('/projects/<int:id>', methods=['GET'])
def get_single_projects(id):
    single_project = Project.query.get(id)
    return jsonify({"Project" : single_project}), 200


@api.route('/projects/<int:proyecto_id>/stage/<string:categoria>', methods=['GET'])
def get_steps_of_project(proyecto_id, categoria):
    proyecto = Project.query.get_or_404(proyecto_id)

    # Filtra los pasos del proyecto por categoría
    pasos_filtrados = [step.serialize() for step in proyecto.steps if step.category == myEnum[categoria]]

    return jsonify({
        'id_proyecto': proyecto.id,
        'title_proyecto': proyecto.title,
        'categoria': categoria,
        'pasos': pasos_filtrados
    }),200

@api.route('/project', methods=['POST'])
def create_project():
    data = request.get_json()

    if data is None:
        response_body = {
            "msg" : "Body should be passed with request"
        }
        return jsonify(response_body),400
    
    if "title" not in data and "owner_id" not in data:
        response_body = {
            "msg" : "Title or owner_id should be passed with request"
        }
        return jsonify(response_body),400
    
    user = User.query.get(data['owner_id'])
    new_project = Project(title=data['title'])
    user.projects.append(new_project)
    db.session.add(new_project)
    db.session.commit()

    return jsonify({"Has añadido": f"{new_project.title}"})


@api.route('/projects/<int:proyecto_id>/steps', methods=['POST'])
def create_step_for_project(proyecto_id):
    proyecto = Project.query.get_or_404(proyecto_id)
    datos_paso = request.json
    nuevo_paso = Step(title=datos_paso['title'], category=myEnum[datos_paso['category']])
    proyecto.steps.append(nuevo_paso)
    db.session.commit()

    return jsonify({
        "id": nuevo_paso.id,
        "project_id": proyecto.id,
        "title": nuevo_paso.title,
        "category": nuevo_paso.category.value
    })

@api.route('/projects/<int:proyecto_id>/stage/<int:paso_id>', methods=['PUT'])
def actualizar_categoria_paso(proyecto_id, paso_id):
    paso = Step.query.filter_by(id=paso_id).first_or_404()
    nueva_categoria = request.json.get('category')
    if nueva_categoria not in myEnum.__members__:
        return jsonify({"error": "Categoría no válida."}), 400
    paso.category = myEnum[nueva_categoria]
    db.session.commit()

    return jsonify({"mensaje": f"Se actualizó la categoría del paso {paso.title}."})


@api.route('/share/project/<int:project_id>', methods=['POST'])
def share_project(project_id):
    project = Project.query.get(project_id)
    print("zzzzzzzz", project)
    
    if not project:
        return jsonify({"error": f"No se encontró un proyecto con ID {project_id}"}), 404
    data = request.get_json()
    email = data.get("email")
    if not email:
        return jsonify({"error": "Se requiere un campo 'email' en el cuerpo de la solicitud"}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": f"No se encontró un usuario con el correo electrónico {email}"}), 404
    if project in user.projects:
        return jsonify({"error": f"El usuario {user.name} ya está en el proyecto {project.title}"}), 400
    user.projects.append(project)
    db.session.commit()

    return jsonify({"msg": f"{user.name} agregado al proyecto: {project.title}"}), 200




# def send_mail(task):
#     smtp_server = "smtp.gmail.com"
#     smtp_port = 587
#     smtp_username = "eddy.javiieer@gmail.com"
#     smtp_password = "edijavier"



# @api.route('/verify-tasks', methods=['GET'])
# def verify_tasks():
#     with current_app.app_context():

#         fecha_manana = datetime.now() + timedelta(days=1)
#         all_tasks = Todo.query.all()
#         all_tasks = list( map(lambda x : x.serialize(), all_tasks))
#         tasks_for_tomorrow = [ task for task in all_tasks if task["date"] == fecha_manana.date()]

#         for tarea in tasks_for_tomorrow :
#             send_mail(tarea)

#         return jsonify(print(tasks_for_tomorrow ))
    

