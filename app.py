from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
# MongoDB USER ID : daegu / PW : 1234
client = MongoClient('mongodb+srv://daegu:1234@cluster0.zuemero.mongodb.net/?retryWrites=true&w=majority')
db = client.TodayFood

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('posts.html')

@app.route('/posts', methods=['POST'])
def register_post():
    restaurant_name = request.form['restaurant_name']
    address = request.form['address']
    category = request.form['categories']
    comment = request.form['comment']
    tags = request.form['tag']
    img_url=request.form['url']
    name=request.form['name']
    password=request.form['password']
    posts_list = list(db.test.find({}, {'_id': False}))
    num = len(posts_list) + 1


        # MongoDB에 데이터 저장
    post_data = {
        'num' : num,
        'title': restaurant_name,
        'address': address,
        'category': category,
        'comment': comment,
        'tags': tags,
        'image_url':  img_url,
        'name':name,
        'password':password
    }

    db.test.insert_one(post_data)
    return jsonify({'msg':'등록이 완료되었습니다.'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5502, debug=True)
    
    