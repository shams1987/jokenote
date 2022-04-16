from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired


class JokeForm(FlaskForm):
    id = IntegerField("id")
    user_id = IntegerField("user_id", validators=[DataRequired()])
    subject_id = IntegerField("subject_id", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    content = StringField("content", validators=[DataRequired()])
    rating = SelectField("rating", choices=[0, 1, 2, 3, 4, 5])
