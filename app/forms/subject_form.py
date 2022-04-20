from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Subject


# def heading_matches(form, field):
#     heading = field.data
#     old_heading = Subject.query.filter(Subject.heading == heading).first()
#     print(Subject.heading, "*************************************")
#     if old_heading:
#         raise ValidationError("Subject heading is already in use.")


class SubjectForm(FlaskForm):
    id = IntegerField("id")
    user_id = IntegerField("user_id", validators=[DataRequired()])
    heading = StringField("content", validators=[DataRequired()])
