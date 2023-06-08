from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
# MongoDB USER ID : daegu / PW : 1234
client = MongoClient('mongodb+srv://daegu:1234@cluster0.zuemero.mongodb.net/?retryWrites=true&w=majority')
db = client.test

app = Flask(__name__)

# index 페이지 랜더링
@app.route('/')
def home():
    # 전체 맛집 리스트 가져오기
    all_posts = list(db.test.find({},{'_id':False})) # .sort("created_at", -1) 생성 시간 기준 최신순 정렬 / 게시글 작성 시 created_at 필드 필요!
    return render_template('index.html', data=all_posts)

# 카테고리별 맛집 리스트 가져오기
@app.route('/list/<category>')
def get_list(category):
    category_list = list(db.test.find({'category': category}, {'_id': False}))
    return render_template('index.html', data=category_list)

# 좋아요수 증가시키기
@app.route('/update/like', methods=['POST'])
def update_like():
    num = int(request.form['num'])
    post = db.test.find_one({'num': num}) # 해당 게시글찾고
    like_count = post['like'] # 좋아요수 가져온 후
    db.test.update_one({'num': num}, {'$set': {'like': like_count + 1}}) # 좋아요수 업데이트
    return jsonify({'response': '좋아요수 증가!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)