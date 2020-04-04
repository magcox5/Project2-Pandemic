from flask import Flask, jsonify, render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/pandemic_final.db")

# reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# Save reference to the table
# pandemic_table = Base.classes["pandemics"]


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################
@app.route("/")
def welcome():
#######QUERY FROM DATABASE fOR THIS ROUTE ####### 



    return render_template('index.html')
       ####### REPLACE BELOW WITH ACTUAL HTML FILE Somehow #### 
        # f"Welcome to the Pandemic!<br/>"
        # f"Available Routes:<br/>"
        # f"/api/v1.0/pandemic"
        # f"ADD DASHBOARD HERE"
    
### MAKE NEW ROUTE FOR EACH HTML 
### 
@app.route("/charts")
def charts():
#######QUERY FROM DATABASE fOR THIS ROUTE ####### 



    return render_template('charts.html')
       ####### REPLACE BELOW WITH ACTUAL HTML FILE Somehow #### 
        # f"Welcome to the Pandemic!<br/>"
        # f"Available Routes:<br/>"
        # f"/api/v1.0/pandemic"
        # f"ADD DASHBOARD HERE"

@app.route("/globe")
def globe():
#######QUERY FROM DATABASE fOR THIS ROUTE ####### 



    return render_template('globe.html')
       ####### REPLACE BELOW WITH ACTUAL HTML FILE Somehow #### 
        # f"Welcome to the Pandemic!<br/>"
        # f"Available Routes:<br/>"
        # f"/api/v1.0/pandemic"
        # f"ADD DASHBOARD HERE"

@app.route("/about")
def about():
#######QUERY FROM DATABASE fOR THIS ROUTE ####### 



    return render_template('about.html')
       ####### REPLACE BELOW WITH ACTUAL HTML FILE Somehow #### 
        # f"Welcome to the Pandemic!<br/>"
        # f"Available Routes:<br/>"
        # f"/api/v1.0/pandemic"
        # f"ADD DASHBOARD HERE"

@app.route("/api/v1.0/pandemic")
def pandemic():
   # Create our session (link) from Python to the DB
    #session = Session(engine)

    """ Query all Pandemics for 'Pandemic', 'Country', 'Year', 'Cases', 'Deaths', 'Lon', 'Lat', 'population'"""
    #results_old = session.query(pandemic_table.Pandemic, pandemic_table.Country, pandemic_table.Year, pandemic_table.Cases, pandemic_table.Deaths, pandemic_table.Lon, pandemic_table.Lat, pandemic_table.population).all()
    query ='SELECT "Pandemic", "Country", "Year", "Cases", "Deaths", "Lon", "Lat", "population" from "pandemic_final";'
    
    results = pd.read_sql(query, con=engine)

    all_pandemics = results.to_dict(orient="records")

    # Grab list of pandemic names
    pandemic_names = list(results.Pandemic.unique())

    # Mimic the pandemic_final.json structure for the graphs to work
    pandemics_final = {
        'names': pandemic_names,
        'pandemics':  all_pandemics
    }
 

    return jsonify(pandemics_final)


if __name__ == "__main__":
    app.run(debug=True)
