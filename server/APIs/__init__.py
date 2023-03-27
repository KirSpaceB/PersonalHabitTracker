from .user_signup import user_signup_blueprint
from .user_auth import user_auth_blueprint
from .create_user_habits import create_user_habits_blueprint
from .decode_user_id import decode_user_id_blueprint
def APIEndPoint(app):
    app.register_blueprint(user_signup_blueprint)
    app.register_blueprint(user_auth_blueprint)
    app.register_blueprint(create_user_habits_blueprint)
    app.register_blueprint(decode_user_id_blueprint)