from flask import Flask, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Pandemic_data.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Pandemic = Base.classes.pandemics


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################
### Use Python to get data in sql lite database
### Read in from sql lite database 
### Load them into javascript 
### Query Pandemic grab it out of the database  

@app.route("/api/v1.0/pandemic-data")
def pandemic():
   # Create our session (link) from Python to the DB
    session = Session(engine)

    """ Query all Pandemics for 'Pandemic', 'Country', 'Year', 'Cases', 'Deaths', 'Lon', 'Lat', 'population'"""
    results = session.query(Pandemic.Pandemic, Pandemic.Country, Pandemic.Year, Pandemic.Cases, Pandemic.Deaths, Pandemic.Lon, Pandemic.Lat, Pandemic.population).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_pandemics = []
    for Pandemic, Country, Year, Cases, Deaths, Lon, Lat, population in results:
        pandemic_dict = {}
        pandemic_dict["Pandemic"] = Pandemic
        pandemic_dict["Country"] = Country
        pandemic_dict["Year"] = Year
        pandemic_dict["Cases"] = Cases
        pandemic_dict["Deaths"] = Deaths
        pandemic_dict["Lon"] = Lon
        pandemic_dict["Lat"] = Lat
        pandemic_dict["population"] = population

        all_pandemics.append(pandemic_dict)

    return jsonify(all_pandemics)

@app.route("/")
def welcome():
    return (
        f"Welcome to the Pandemic!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/pandemic-data"
    )


if __name__ == "__main__":
    app.run(debug=True)
