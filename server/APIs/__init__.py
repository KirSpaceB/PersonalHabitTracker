from .user_signup import user_signup_blueprint
from .user_auth import user_auth_blueprint
from .create_user_habits import create_user_habits_blueprint
from .decode_user_id import decode_user_id_blueprint
from .delete_user_habit import delete_user_habit_blueprint
from .update_count_in_db import update_count_in_db_blueprint
from .update_display_count import update_display_count_blueprint

def APIEndPoint(app):
    app.register_blueprint(user_signup_blueprint)
    app.register_blueprint(user_auth_blueprint)
    app.register_blueprint(create_user_habits_blueprint)
    app.register_blueprint(decode_user_id_blueprint)
    app.register_blueprint(delete_user_habit_blueprint)
    app.register_blueprint(update_count_in_db_blueprint)
    app.register_blueprint(update_display_count_blueprint)