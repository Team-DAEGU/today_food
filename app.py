from flask import Flask, render_template, request, jsonify, redirect
from pymongo import MongoClient
# MongoDB USER ID : daegu / PW : 1234
client = MongoClient('mongodb+srv://daegu:1234@cluster0.zuemero.mongodb.net/?retryWrites=true&w=majority')
db = client.TodayFood

app = Flask(__name__)

# index 페이지 랜더링
@app.route('/')
def home():
    # 전체 맛집 리스트 가져오기
    all_posts = list(db.data.find({},{'_id':False}))
    return render_template('index.html', data=all_posts)

# 카테고리별 맛집 리스트 가져오기
@app.route('/list/<category>')
def get_list(category):
    category_list = list(db.data.find({'category': category}, {'_id': False}))
    return render_template('index.html', data=category_list)

# 좋아요수 증가시키기
@app.route('/update/like', methods=['POST'])
def update_like():
    num = int(request.form['num'])
    post = db.data.find_one({'num': num})
    like_count = post['like']
    db.data.update_one({'num': num}, {'$set': {'like': like_count + 1}})
    return jsonify({'msg': '좋아요수 증가!'})

# 게시글 상세페이지 조회
@app.route('/detail/<int:num>')
def detail(num):
    document = db.data.find_one({'num' : num})
    return render_template('detail.html', data=document)

# 게시글 작성 페이지 랜더링
@app.route('/posts', methods = ['GET'])
def get_posts():
    return render_template('posts.html')

# 게시글 작성
@app.route('/posts', methods = ['POST'])
def register_post():
    restaurant_name = request.form['restaurant_name']
    address = request.form['address']
    category = request.form['categories']
    comment = request.form['comment']
    tags = []
    tag = request.form['tag'].split(",")
    for i in tag:
        tags.append(i)
    img_url=request.form['url']
    name=request.form['name']
    password=request.form['password']

    posts_list = list(db.data.find({}, {'_id': False}))
    num = len(posts_list) + 1

    post_data = {
        'num' : num,
        'title': restaurant_name,
        'address': address,
        'category': category,
        'comment': comment,
        'tags': tags,
        'image_url':  img_url,
        'name':name,
        'password':password,
        'like': 0
    }
    db.data.insert_one(post_data)
    return jsonify({'msg':'등록이 완료되었습니다.'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)
