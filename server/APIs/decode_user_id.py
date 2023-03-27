from colorama import Fore
from flask import Blueprint,jsonify,request
from Database import InstantiateDatabase
import jwt
import json

decode_user_id_blueprint = Blueprint('decode_user_id',__name__)

@decode_user_id_blueprint.route('/decode_user_id', methods=['GET'])
def decode_user_id():
    authorizationFromRequestHeader = request.headers.get('Authorization')
    removeBearerStringFromToken = json.loads(authorizationFromRequestHeader.replace('Bearer', '').strip())
    tokenToDecode = removeBearerStringFromToken['token']
    decodedToken = jwt.decode(tokenToDecode, 'SECRET_KEY', algorithms=['HS256'])
    return jsonify({'decoded_user_id':decodedToken})