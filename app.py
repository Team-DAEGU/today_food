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
    document = db.data.find_one({'num' : num}, {'_id': False})
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
        'img_url':  img_url,
        'name':name,
        'password':password,
        'like': 0
    }
    db.data.insert_one(post_data)
    return jsonify({'msg':'등록이 완료되었습니다.'})

# 게시글 수정
@app.route('/detail/<int:num>/update', methods = ['PUT'])
def update_post(num):
    if request.method != 'PUT':
        return jsonify({'msg': '잘못된 요청 메소드입니다!'}, 405)
    
    # num으로 찾은 기존 컬렉션
    current_post = db.data.find_one({'num':num},{'_id':False})
    
    # 본인 인증을 위해 입력받은 필드값
    name = request.form['name']
    password = request.form['password']
    
    # 프론트에서 수정을 위해 입력 받은 값
    restaurant_name = request.form['restaurant_name']
    address = request.form['address']
    category = request.form['categories']
    comment = request.form['comment']
    tags = []
    tag = request.form['tag'].split(",")
    for i in tag:
        tags.append(i)
    img_url=request.form['url']

    if current_post['name'] == name and current_post['password'] == password:
        # 전달받은 num으로 컬렉션을 찾아 값 수정 및 저장
        current_post['title'] = restaurant_name
        current_post['address'] = address
        current_post['category'] = category
        current_post['comment'] = comment
        current_post['tags'] = tags
        current_post['img_url'] = img_url
        db.data.replace_one({'num': num}, current_post)
    elif current_post['name'] != name or current_post['password'] != password:
        return jsonify({'msg':'입력하신 닉네임과, 비밀번호가 일치하지 않습니다!'}, 403)
    return jsonify({'msg': '수정 완료!'})

# 게시글 삭제
@app.route('/detail/<int:num>/delete', methods = ['DELETE'])
def delete_post(num):
    if request.method != 'DELETE':
        return jsonify({'msg': '잘못된 요청 메소드입니다!'}, 405)
    
    target_post = db.data.find_one({'num':num},{'_id':False})

    # 본인 인증을 위해 입력받은 필드값
    name = request.form['name']
    password = request.form['password']

    if target_post['name'] == name and target_post['password'] == password:
        db.data.delete_one({'num':num})
    else:
        return jsonify({'msg':'입력하신 닉네임과, 비밀번호가 일치하지 않습니다!'}, 403)
    return jsonify({'msg':'삭제 완료!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)
