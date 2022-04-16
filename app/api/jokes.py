from flask import Blueprint, jsonify, session, request, redirect
from app.models import db, Joke
from app.forms import JokeForm

joke_routes = Blueprint("jokes", __name__)

@joke_routes.route("/<int:userId>/subjects/<int:subjectId>", methods=["GET"])
def getJokes(userId, subjectId):
    jokes = Joke.query.filter(Joke.user_id == userId, Joke.subject_id == subjectId).all()
    return {"jokes": [joke.to_dict() for joke in jokes]}


@joke_routes.route("/<int:userId>/subjects/<int:subjectId>", methods=["POST"])
def postJoke(userId, subjectId):
    form = JokeForm()
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
