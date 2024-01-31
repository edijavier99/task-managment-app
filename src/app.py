"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db,User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room


# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
socketio = SocketIO(app, cors_allowed_origins="*") 


@socketio.on('connect')
def handle_connect():
    client_id = request.sid
    print(f'Cliente conectado al servidor Socket.IO. ID del socket: {client_id}')


connected_users = {}  # Esto debería ser un diccionario global

@socketio.on('join_room')
def handle_join_room(data):
    room = data['room']
    username = data['username']
    
    join_room(room)
    
    # Obtener o crear la lista de usuarios conectados para la sala del proyecto
    users_for_room = connected_users.setdefault(room, [])
    
    # Verificar si el usuario ya está en la lista
    if username not in users_for_room:
        users_for_room.append(username)  # Agregar el nombre de usuario a la lista
    
    print(f'Usuario {username} se unió a la sala {room}')
    
    # Emitir la lista actualizada de usuarios conectados en la sala
    emit('receivedConnectedUserInfo', users_for_room, room=room)
   


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1) 
jwt = JWTManager(app)
# Allow CORS requests to this API
CORS(app)


# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    # Usa socketio.run() en lugar de app.run()
    socketio.run(app, host='0.0.0.0', port=PORT, debug=True)