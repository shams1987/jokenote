from flask import Blueprint, jsonify, session, request, redirect
from app.models import db, Subject


subject_routes = Blueprint("subjects", __name__)


@subject_routes.route("/<int:userId>", methods=["GET"])
def getSubjects(userId):
    subjects = Subject.query.filter(Subject.user_id == userId).all()
    return {"subjects": [subject.to_dict() for subject in subjects]}
