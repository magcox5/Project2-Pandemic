from flask import Flask, jsonify, SQLAlchemy
import pandas as pd

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
app.config['PANDEMICS'] = 'sqlite:///Pandemic_data.db'

db = SQLAlchemy(app)

class Pandemic(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String(50)

class PandemicInfo(db.Model):
    pandemic_id = db.Column(db.Interger, db.ForeignKey('Pandemic.id'))
    Country = db.Column(db.String(50), primary_key=True)
    Year = db.Column(db.Interger)
    Cases = db.Column(db.Interger)
    Deaths = db.Column(db.Interger)
    Lat = db.Column(db.Interger)
    Lon = db.Column(db.Interger)
    pandemic = db.relationship('Pandemic', backref='PandemicInfo')


if __name__ == "__main__":
    app.run(debug=true)