from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import getenv

app = Flask(__name__)

user = getenv('DB_USER')
password = getenv('DB_PASSWORD')
host = getenv('DB_HOST')
port = getenv('DB_PORT')
name = getenv('DB_NAME')

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{user}:{password}@{host}:{port}/{name}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Track(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    favorable = db.Column(db.Float, nullable=False)
    unfavorable = db.Column(db.Float, nullable=False)
    eggs = db.Column(db.Float, nullable=False)
    gas = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {"id": self.id, "date": self.date, "favorable": self.favorable, "unfavorable": self.unfavorable, "eggs": self.eggs, "gas": self.gas}

    # object = {"data" : [to_dict]}
@app.route('/track', methods=['GET'])
def get_track():
    tracks = Track.query.all()
    response = jsonify([track.to_dict() for track in tracks])
    response.headers.add("Access0Control-Allow-Origin", "*")
    return response

@app.route('/track', methods=['POST'])
def create_track():
    data = request.json
    new_track = Track(date=data['date'], favorable=data['favorable'], unfavorable=data['unfavorable'], eggs=data['eggs'], gas=data['gas'])
    db.session.add(new_track)
    db.session.commit()
    return jsonify(new_track.to_dict()), 201


if __name__ == "__main__":
    with app.app_context():
        if not db.inspect(db.engine).has_table('track'):
            db.create_all()
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
