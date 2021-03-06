from flask.cli import AppGroup
from .users import seed_users, undo_users
from .subjects import seed_subjects, undo_subjects
from .jokes import seed_jokes, undo_jokes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_subjects()
    seed_jokes()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_subjects()
    undo_jokes()
