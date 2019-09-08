Tapestry
=======

- Notebooks and cleaned data sets are in /data
- The Frontend code is in /frontend
- Backend code is in /backend

The UI is written with ReactJS, while the data cleaning and munging etc. was just done with Pandas/Numpy within a Jupyter notebook. The backend is a simple Python/Flask app which takes a set of x/y values and a metric and provides what a particular prediction will be like based on this trend.

Running it locally
==================

- from the `frontend` directory, run `yarn install`
- `yarn start` 

The data in the UI is purely for demo purposes, but the logic for the predictions lives in the `backend/` directory