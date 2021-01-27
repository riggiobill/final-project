from flask import Flask, jsonify, render_template, redirect
import numpy as np
import pandas as pd 

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect


# Flask setup
app = Flask(__name__)


# DB setup


#create engine to automap_base

Engine = create_engine("postgresql://postgres:postgres@localhost/Employee_Turnover")
Connection = Engine.connect()
turnoverData = pd.read_sql("SELECT * from turnover_data", Connection)



# reflect an existing database into a new model
###Base = automap_base()
# reflect the tables
###Base.prepare(Engine, reflect=True)

# Save reference to the table
###turnover_data = Base.classes.turnover_data






@app.route("/")
def index():
    
    return render_template('index.html')
   

# @app.route("/test")
# def test():
#     # Create our session (link) from Python to the DB
#    ### session = Session(Engine)
#    # Query all passengers
#    ### results = session.query(turnover_data.department).all()
#    ### session.close()
#     # Convert list of tuples into normal list
#    ### all_departments = list(np.ravel(results))

#     ###return jsonify(all_departments)


#     results = turnoverData.to_dict()
#     return results





## @app.route("/scrape")
## def scrape():
##     mars = mongo.db.mars
##     mars_dict = scrape_mars.scrape()
##     #mars.updateMany({}, mars_dict, upsert=True)
##     mongo.db.mars.update({}, mars_dict, upsert=True)
##     return redirect("http://localhost:5000/",code=302)


if __name__ == "__main__":
    app.run(debug=True)

