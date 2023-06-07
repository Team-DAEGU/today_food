from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
# MongoDB USER ID : daegu / PW : 1234
client = MongoClient('mongodb+srv://daegu:1234@cluster0.zuemero.mongodb.net/?retryWrites=true&w=majority')
db = client.test

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/index', methods=["GET"])
def index():
    all_posts = list(db.test.find({},{'_id':False})) # .sort("created_at", -1) 생성 시간 기준 최신순 정렬 / 게시글 작성 시 created_at 필드 필요!
    return jsonify({'response': all_posts})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)