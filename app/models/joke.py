from .db import db

class Joke(db.Model):
    __tablename__ = "jokes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)

     # many(jokes) to one(user)
    user = db.relationship("User", back_populates="jokes")
    # many(jokes) to one(subject)
    subject = db.relationship("Subject", back_populates="jokes")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "subject_id": self.subject_id,
            "title": self.title,
            "content": self.content,
            "rating": self.rating
        }
