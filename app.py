from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
# MongoDB USER ID : daegu / PW : 1234
client = MongoClient('mongodb+srv://daegu:1234@cluster0.zuemero.mongodb.net/?retryWrites=true&w=majority')
db = client.TodayFood

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)