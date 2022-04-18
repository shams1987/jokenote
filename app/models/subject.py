from .db import db

class Subject(db.Model):
    __tablename__ = "subjects"

    id = db.Column(db.Integer, primary_key=True)
    user_id =  db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    heading = db.Column(db.String(255), nullable=False)

    # many subjects to one user
    user = db.relationship("User", back_populates = "subjects")

    # one subject to many jokes
    jokes = db.relationship("Joke", back_populates = "subject", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "heading": self.heading
        }
