from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app_name = "main"

# Connect to Database
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+mysqlconnector://root:qwerty@localhost/apidb"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


# Person TABLE Configuration
class Person(db.Model):
    __tablename__ = "pessoas"
    id_pessoa = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    rg = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.String(100), nullable=False)
    data_nascimento = db.Column(db.Date, nullable=False)
    data_admissao = db.Column(db.Date, nullable=False)
    funcao = db.Column(db.String(100))

    def to_dict(self):
        return {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns  # noqa
        }

    def __repr__(self):
        return f"Person ID:{self.id_pessoa} "


# HTTP GET - List All
@app.route("/pessoas")
def list_all():
    people = Person.query.all()

    person_list = [person.to_dict() for person in people]

    return jsonify(person_list)


# HTTP POST - Create Person / HTTP GET - Read Person


@app.route("/pessoa", methods=["POST"])
@app.route("/pessoa/<int:person_id>")
def post_new_person(person_id=None):
    if request.method == "GET":
        # Query the database for the user with the given ID
        person = Person.query.get(person_id)

        # If the user does not exist, return an error with a 404 status code
        if not person:
            return jsonify(error=f"Person with id {person_id} not found."), 404

        # If the user exists, return the user object as a JSON response
        return jsonify(person.to_dict())
    elif request.method == "POST":
        # Get the JSON data from the request body
        data = request.get_json()

        # Create a dictionary of attribute names and values from the JSON data
        person_data = {key: value for key, value in data.items()}

        # Create a new User object and initialize it with the dictionary
        person = Person(**person_data)

        # Add the User object to the database
        db.session.add(person)
        db.session.commit()

        # Return the updated user object as a JSON response
        return jsonify(created=person.to_dict()), 201


# HTTP PATCH - Update Person


@app.route("/edit/pessoa/<int:person_id>", methods=["PATCH"])
def update_person(person_id):
    # Get the JSON data from the request body
    data = request.get_json()

    # Query the database to get the User object with the given id
    person = Person.query.filter_by(id_pessoa=person_id).first()
    if person:
        # Update the age of the User object with the new age value from the JSON data # noqa
        for key, value in data.items():
            if hasattr(person, key):
                setattr(person, key, value)

        # Commit the changes to the database
        db.session.commit()
        return jsonify(updated=person.to_dict())

    return {"error": f"Person with id {person_id} not found."}, 404


# HTTP DELETE - Delete Record


@app.route("/delete/pessoa/<int:person_id>", methods=["DELETE"])
def delete_cafe(person_id):
    person = Person.query.get(person_id)
    if not person:
        # Return an error response if the user doesn't exist
        return jsonify(error=f"Person with id {person_id} not found."), 404

    # Delete the user from the database
    db.session.delete(person)
    db.session.commit()
    return jsonify(), 204


if __name__ == "__main__":
    app.run(debug=True)
