import pandas as pd
import psycopg2
import sqlalchemy
import config
import json 
import flask

from sqlalchemy import create_engine
from config import password
Engine = create_engine(f"postgresql://postgres:{password}@localhost:5432/Employee_Turnover")
Connection = Engine.connect()
initial_df=pd.read_sql("select * from turnover_data", Connection)
Connection.close()

# Clean data: remove less helpful columns; rename values to be more user-friendly
df = initial_df.drop(['index','EducationField','EmployeeCount','EmployeeNumber','Education','StandardHours','JobRole','MaritalStatus',
                      'DailyRate','MonthlyRate','HourlyRate','Over18','OverTime','TotalWorkingYears'], axis=1).drop_duplicates()
df.rename(columns={'Attrition': 'Employment Status','BusinessTravel':'Business Travel','DistanceFromHome':'Commute (Miles)','EnvironmentSatisfaction':'Environment Satisfaction',
                  'JobInvolvement':'Job Involvement','JobLevel':'Job Level','JobSatisfaction':'Job Satisfaction',
                  'MonthlyIncome':'Monthly Income','NumCompaniesWorked':'Num Companies Worked','PercentSalaryHike':'Last Increase %',
                  'PerformanceRating':'Performance Rating','RelationshipSatisfaction':'Relationship Satisfaction','StockOptionLevel':'Stock Option Level',
                  'TrainingTimesLastYear':'Training Last Year','WorkLifeBalance':'Work/Life Balance','YearsAtCompany':'Tenure (Years)',
                  'YearsInCurrentRole':'Years in Role','YearsSinceLastPromotion':'Years Since Promotion','YearsWithCurrManager':'Years with Manager'}, inplace = True)

df['Employment Status'] = df['Employment Status'].replace(['No','Yes'],['Active','Terminated'])
df['Business Travel'] = df['Business Travel'].replace(['Travel_Rarely','Travel_Frequently','Non-Travel'],['Rare','Frequent','None'])

columns = list(df)

factors = ['Age', 'Business Travel', 'Department', 'Commute (Miles)', 'Environment Satisfaction', 'Gender', 
'Job Involvement', 'Job Level', 'Job Satisfaction', 'Monthly Income', 'Performance Rating', 'Stock Option Level', 
'Training Last Year']

from flask import Flask, render_template, redirect, jsonify
app=Flask(__name__)

@app.route("/")
def ExpIndex():
    return render_template("index.html")

@app.route("/experiment",methods=["GET","POST"])
def exp_data():
    for column in columns:
        
