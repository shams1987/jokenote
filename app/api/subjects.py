from flask import Blueprint, jsonify, session, request, redirect
from app.models import db, Subject
from app.forms import SubjectForm


subject_routes = Blueprint("subjects", __name__)


@subject_routes.route("/<int:userId>", methods=["GET"])
def getSubjects(userId):
    subjects = Subject.query.filter(Subject.user_id == userId).all()
    return {"subjects": [subject.to_dict() for subject in subjects]}


@subject_routes.route("/<int:userId>", methods=["POST"])
def postSubject(userId):
    form = SubjectForm()
    new_subject = Subject(
        user_id=form.data["user_id"],
        heading=form.data["heading"],
    )

    db.session.add(new_subject)
    db.session.commit()
    return new_subject.to_dict()

@subject_routes.route("/delete/<int:subjectId>", methods=["DELETE"])
def delete_subject(subjectId):
    deleted_subject = Subject.query.filter(Subject.id == subjectId).first()
    db.session.delete(deleted_subject)
    db.session.commit()
    return {"deleted_subject": deleted_subject.to_dict()}

@subject_routes.route("/edit", methods=["PUT"])
def editSubject():
    form = SubjectForm()
    subject = Subject.query.get(form.data["id"])
    subject.heading = form.data["heading"]

    db.session.add(subject)
    db.session.commit()
