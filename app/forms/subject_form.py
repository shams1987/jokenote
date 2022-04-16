from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class SubjectForm(FlaskForm):
    id = IntegerField("id")
    user_id = IntegerField("user_id", validators=[DataRequired()])
    heading = StringField("content", validators=[DataRequired()])
