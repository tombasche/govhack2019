from flask import Flask, request, render_template, jsonify
import pandas as pd
import json
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

dates = pd.date_range('2019-09-01', periods=120, freq='M')
predictions = df = pd.DataFrame({"Employment": range(0,120), "Air Quality": range(10,130), "Population": range(5,125)}, index=dates)


@app.route('/getprediction', methods=["POST"])
def form_page():
    
    data = json.loads(request.data.decode('utf-8'))['data']

    metric = json.loads(request.data.decode('utf-8'))['metric']
    emp_pred = [{"x": str(index), "y": float(row["Employment"])} for index, row in predictions.iterrows()] 
    air_pred = [{"x": str(index), "y": float(row["Air Quality"])} for index, row in predictions.iterrows()]
    birth_pred = [{"x": str(index), "y": float(row["Population"])} for index, row in predictions.iterrows()]
    canvas_preds = {
            "Employment": emp_pred,
            "Air Quality": air_pred,
            "Birth": birth_pred,
    }
    return jsonify(canvas_preds)

if __name__ == '__main__':
    app.run()