from flask import Blueprint, jsonify, session, request, redirect
from app.models import db, Joke
#from app.forms import JokeForm

joke_routes = Blueprint("jokes", __name__)

@joke_routes.route("/<int:userID>/subjects/<int:subjectId>", methods=["GET"])
def getJokes(userID, subjectId):
    jokes = Joke.query.filter(Joke.user_id == userID, Joke.subject_id == subjectId).all()
    return {"jokes": [joke.to_dict() for joke in jokes]}
