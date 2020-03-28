from flask import Flask, jsonify
import pandas as pd


# 


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/api/v1.0/pandemic/swine")
def swineFlu():
    """Return the data as json"""
    mergedsf = pd.read_csv("data/merged_swineflu_2019.csv")
    mergeddata = mergedsf.to_dict(orient="records")

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
