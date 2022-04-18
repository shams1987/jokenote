from app.models import db, Subject

def seed_subjects():
    subject1 = Subject(
        user_id = 1,
        heading = "Miscellaneous"
    )
    subject2 = Subject(
        user_id = 1,
        heading = "Light bulb?"
    )
    subject3 = Subject(
        user_id = 1,
        heading = "Bartender"
    )
    subject4 = Subject(
        user_id = 1,
        heading = "Knock Knock"
    )

    db.session.add_all(
        [
            subject1,
            subject2,
            subject3,
            subject4

        ]
    )
    db.session.commit()


def undo_subjects():
    db.session.execute('TRUNCATE subjects RESTART IDENTITY CASCADE;')
    db.session.commit()
