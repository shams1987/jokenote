from flask import Blueprint, jsonify, session, request, redirect
from sqlalchemy import desc
from app.models import db, Joke
from app.forms import JokeForm

joke_routes = Blueprint("jokes", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@joke_routes.route("/<int:userId>/subjects/<int:subjectId>", methods=["GET"])
def getJokes(userId, subjectId):
    jokes = Joke.query.filter(Joke.user_id == userId, Joke.subject_id == subjectId).all()
    return {"jokes": [joke.to_dict() for joke in jokes]}

@joke_routes.route("/all/<int:userId>", methods=["GET"])
def getSubjects(userId):
    jokes = Joke.query.filter(Joke.user_id == userId).all()
    return {"jokes": [joke.to_dict() for joke in jokes]}


@joke_routes.route("/<int:userId>/subjects/<int:subjectId>", methods=["POST"])
def postJoke(userId, subjectId):
    form = JokeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_joke = Joke(
            user_id=form.data["user_id"],
            subject_id=form.data["subject_id"],
            title=form.data["title"],
            content=form.data["content"],
            rating=form.data["rating"],
        )
        db.session.add(new_joke)
        db.session.commit()
        return new_joke.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@joke_routes.route("/delete/<int:jokeId>", methods=["DELETE"])
def delete_joke(jokeId):
    deleted_joke = Joke.query.filter(Joke.id == jokeId).first()
    db.session.delete(deleted_joke)
    db.session.commit()
    return {"deleted_joke": deleted_joke.to_dict()}


@joke_routes.route("/edit", methods=["PUT"])
def editJoke():
    form = JokeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        joke = Joke.query.get(form.data["id"])
        joke.user_id=form.data["user_id"],
        joke.subject_id=form.data["subject_id"],
        joke.title=form.data["title"],
        joke.content=form.data["content"],
        joke.rating=form.data["rating"],

        db.session.add(joke)
        db.session.commit()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
