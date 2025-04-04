from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import getenv

app = Flask(__name__)

ALLOWED_ORIGINS = ["https://www.lukemcewen.com",
                    "https://lukemcewen.com"]

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
    favorable = db.Column(db.Float)
    unfavorable = db.Column(db.Float)
    eggs = db.Column(db.Float)
    gas = db.Column(db.Float)
    bananas = db.Column(db.Float)
    coffee = db.Column(db.Float)
    chocolate = db.Column(db.Float)

    def to_dict(self):
        return {"id": self.id, "date": self.date, "favorable": self.favorable, "unfavorable": self.unfavorable, "eggs": self.eggs, "gas": self.gas, "bananas": self.bananas, "coffee": self.coffee, "chocolate": self.chocolate}

@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    if origin in ALLOWED_ORIGINS:
        response.headers.add("Access-Control-Allow-Origin", origin)
        response.headers.add("Vary", "Origin")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET")
    return response


@app.route('/track', methods=['GET'])
def get_track():
    tracks = Track.query.all()
    response = jsonify([track.to_dict() for track in tracks])
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/track', methods=['POST'])
def create_track():
    data = request.json
    new_track = Track(date=data['date'], favorable=data['favorable'], unfavorable=data['unfavorable'], eggs=data['eggs'], gas=data['gas'], bananas=data['bananas'], coffee=data['coffee'], chocolate=data['chocolate'])
    db.session.add(new_track)
    db.session.commit()
    return jsonify(new_track.to_dict()), 201


if __name__ == "__main__":
    with app.app_context():
        if not db.inspect(db.engine).has_table('track'):
            db.create_all()
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
