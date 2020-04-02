from flask import Flask, jsonify
import pandas as pd

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
def swineFlu():
    """Return the data as json"""
    mergeddb = pd.read_sql("data/Pandemic_data.db")
    mergeddata = mergeddb.to_dict(orient="records")
# It should look something like this: 
def main():
   # Melissas notes. I think its supposed to look like this
   # database = r"C:\sqlite\db\pythonsqlite.db"
    ## create a connection 
    # conn = create_connection(database)
    # with conn: 
    return jsonify(mergeddata)


@app.route("/")
def welcome():
    return (
        f"Welcome to the Pandemic!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/pandemic-data"
    )


if __name__ == "__main__":
    app.run(debug=True)
