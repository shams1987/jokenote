from app.models import db, Joke

def seed_jokes():
    joke1 = Joke(
        user_id = 1,
        subject_id = 3,
        title = "Horsing Around",
        content = "A horse walks into a bar. The shocked bartender points a finger his way in alarm and yells, \“Hey!\”The horse says, \“You read my mind, buddy.\”",
        rating = 3
    )
    joke2 = Joke(
        user_id = 1,
        subject_id = 3,
        title = "A Funky Sort of Joke",
        content = "A mushroom walks into a bar and orders a drink, but the bartender yells at him to get out before he stinks up the place. The mushroom looks taken aback and says, \“Why? I\’m a fun guy.\”",
        rating = 4
    )
    joke3 = Joke(
        user_id = 1,
        subject_id = 2,
        title = "Magicians",
        content = "How many magicians does it take to change a light bulb? Depends on what you want to change it into.",
        rating = 5
    )
    joke4 = Joke(
        user_id = 1,
        subject_id = 2,
        title = "Psychiatrists",
        content = "How many psychiatrists does it take to change a light bulb? Only one, but the bulb has to really want to be changed.",
        rating = 1
    )
    joke5 = Joke(
        user_id = 1,
        subject_id = 1,
        title = "Hipster",
        content = "How do you drown a hipster? In the mainstream.",
        rating = 5
    )
    joke6 = Joke(
        user_id = 1,
        subject_id = 1,
        title = "Will Smith",
        content = "How do you find Will Smith in the snow? Look for the fresh prints.",
        rating = 2
    )


    db.session.add_all(
        [
            joke1,
            joke2,
            joke3,
            joke4,
            joke5,
            joke6
        ]
    )
    db.session.commit()


def undo_jokes():
    db.session.execute('TRUNCATE jokes RESTART IDENTITY CASCADE;')
    db.session.commit()
