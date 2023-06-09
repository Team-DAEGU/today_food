# Today_Food
미니 프로젝트 오늘 뭐먹지? Repository 입니다.

[Git_Hub]([https://google.com](https://github.com/Team-DAEGU/today_food))

[배포_링크](http://today-food.eba-3kmhiuzp.ap-northeast-2.elasticbeanstalk.com/)

## 🎈팀소개
안녕하세요! 이노베이션 캠프에서 백엔드 개발자가 되기 위해 모인 **Team. 대구 맛잘알**입니다.  
저희 팀은 모두 대구에 거주하고 있어 지역 내에서 맛집으로 소문난 음식점을 추천 및 공유할 수 있는  
커뮤니티를 만들어 보았습니다.

## 👨‍👩‍👦‍👦 팀원 소개
**팀장 : 김규현**

- 담당 기능 :  게시글 작성,  게시글 상세 페이지에서 댓글 기능 구현하기, 댓글 작성 버튼 클릭 시 입력창 띄우는 CSS 및 백엔드 API 호출, DB 만들어서 ID, PW 포함하여 데이터 추가 

**팀원 : 김지훈**

- 담당 기능 : 주소값 API 구현, 게시글작성 페이지 작성, 뒤로가기 버튼

**팀원 : 이성목**

- 담당 기능 : 상세 페이지 작성, 게시글 상세 페이지에서 tags 데이터+likes추가, 상세 페이지에서 뒤로가기 버튼

**팀원 : 정명주**

- 담당 기능 : 디자인, 데이터수집, 카테고리별 맛집 목록 UI 및 GET API, 배포, 수정/삭제 버튼 클릭 시 서버 api 호출 , 메인 페이지 tags 데이터+likes추가

## ⚙ 주요 기능
- 메인 페이지 : 대구 오늘 뭐먹지? 서비스의 소개와 카테고리 별 맛집의 목록을 한 눈에 볼 수 있습니다.  
- 맛집 추천하기 : 사용자가 추천하고 싶은 맛집을 자유롭게 등록할 수 있습니다.  
- 추천 맛집 상세 정보 : 맛집의 상세한 정보(추천 내용, 주소, 연락처 등)를 확인할 수 있습니다.  

## 🖼 와이어 프레임
![그림1](https://github.com/thing-zoo/algorithm-study/assets/62596783/1d6057a0-9b7a-4009-b22b-9f6f09bac63b)


## 🕹 API
|기능|URL|Method|Request|Resonse|Branch_Name|비고|
|------|---|---|------|---|---| -------|
|전체 맛집 리스트 가져오기|[ALL LIST](http://today-food.eba-3kmhiuzp.ap-northeast-2.elasticbeanstalk.com/)|GET|테스트1|테스트2|index||
|카테고리별 맛집 리스트 가져오기|[LIST](http://today-food.eba-3kmhiuzp.ap-northeast-2.elasticbeanstalk.com/list/<category>)|GET|테스트1|테스트2|feat/index-cardview||
|게시글 작성(맛집 추천하기)|[POST](http://today-food.eba-3kmhiuzp.ap-northeast-2.elasticbeanstalk.com/api/posts)|POST|테스트1|테스트2|posts||
|게시글 상세(추천 맛집 상세 페이지)|[DETAIL](http://today-food.eba-3kmhiuzp.ap-northeast-2.elasticbeanstalk.com/detail/<int:num>)|GET|테스트1|테스트2|detail|게시글의 num은 url 파라미터로 전달|
|좋아요수 증가시키기|[LIKE](http://today-food.eba-3kmhiuzp.ap-northeast-2.elasticbeanstalk.com/update/like)|POST|테스트1|테스트2|feat/like||
|추천 맛집 포스팅 삭제|[DELETE](http://today-food.eba-3kmhiuzp.ap-northeast-2.elasticbeanstalk.com/detail/<int:num>/delete)|PUT|테스트1|테스트2|detail/update|게시글의 num은 url 파라미터로 전달|
|추천 맛집 포스팅 수정|[REVISE](http://today-food.eba-3kmhiuzp.ap-northeast-2.elasticbeanstalk.com/detail/<int:num>/update)|DELETE|테스트1|테스트2|detail/delete|게시글의 num은 url 파라미터로 전달|
|상세 페이지 댓글작성|[COMMENT](http://today-food.eba-3kmhiuzp.ap-northeast-2.elasticbeanstalk.com/detail/<int:num>/reply)|POST|- reply : 게시글의 댓글 (문자열)|테스트2|detail/delete|게시글의 num은 url 파라미터로 전달|


## 🎯 Trouble Shooting
<!-- 규현님 꺼 -->
<details>
<summary>1. DB 컬렉션의 특정 필드 배열에 값이 추가되지 않고 수정되는 문제</summary>

<!-- summary 아래 한칸 공백 두어야함 -->
## 오류 상황
게시글의 상세페이지에서 댓글 작성 api를 구현하던 중 댓글 작성 시 해당 게시글의 댓글 배열에 값이 추가 되지 않고 변경되는 상황 발생

## 오류 메시지
코드는 작동했으나 기존 배열이 사라지고 새 배열에 하나의 값만 저장됨
  
  ## 시도
```python
@app.route('/detail/<int:num>/reply', methods = ['POST'])
def detail_reply(num):
    target_post = db.data.find_one({'num':num}, {'_id':False})
    get_reply = request.form['reply']
		
		# num 값으로 찾은 쿼리에 reply 배열을 가져오고, reply가 없는 경우 빈 배열 가져옴
    reply = target_post.get('reply', [])
    reply.append(get_reply) # 배열에 사용자가 입력한 값 추가
		
		# reply 필드에 새 배열로 수정
    db.test.update_one({'num':num}, {'$set': {'reply':reply}})
    return jsonify({'msg':'작성 완료'})
```
  
  댓글은 추가할 때 마다 배열에 담겨야하고, 기존 게시글에 배열이 있을지 없을지 알 수 없다고 판단하여 num으로 조회한 쿼리에서 reply 필드를 가져오고 없다면 빈 배열을 가져오도록 코드 작성. 그리고 reply 필드에서 가져온 배열에 사용자로부터 입력받은 값을 append 함수를 사용하여 넣고, 기존 게시글에서 reply 필드를 수정한 reply 필드로 업데이트 했더니 수정할 때 마다 reply 배열에 값이 추가되지 않고 기존 값(0번째 index)이 계속 수정되었음
  ## 원인 파악
reply 필드에 $set 연산자로 새로운 reply 배열로 수정했기 때문에 계속해서 값이 추가되지 않고, 값이 변경되었다.
  
  ## 해결
```python
@app.route('/detail/<int:num>/reply', methods = ['POST'])
def detail_reply(num):
    get_reply = request.form['reply']
    db.test.update_one({'num':num}, {'$push': {'reply':get_reply}})
    return jsonify({'msg':'작성 완료'})
```
  배열을 만들어야 된다는 생각 자체가 잘못되었었다.
그냥 reply 필드에 $push 연산자를 사용하여 사용자로부터 입력받은 값을 넣으면 자동으로 배열이 되어버린다.
만약 해당 쿼리의 reply 필드에 값이 없을 경우 값이 추가되고, 값이 있는 경우에도 배열의 끝에 추가된다.
처음에 find_one으로 해당 쿼리를 찾을 필요도 없다(update_one 하면서 num 값으로 찾기 때문!)
</details>

<!-- 성목님 꺼 -->
<details>
<summary>2.DB컬렉션에서 하나만 가져오기가 안되는 문제</summary>

## 오류 상황
MongoDB에서 받아오는 데이터를 동시에 여러가지 가져올 경우 작동하지만 한 가지 일 경우 가져오지 못하는 문제

## 오류 메시지
코드 동작은 정상적으로 하여 메세지는 나오지 않았다
  
  ## 시도
```python
@app.route('/detail/<int:num>')
def detail():
    posts = collection.find()  # MongoDB에서 정보 가져오기
    data_list = []
    for post in posts:
        data = {
            'image_url': post.get('image_url', ''),
            'address': post.get('address', ''),
            'title': post.get('title', '')
        }
        data_list.append(data)
    
    return render_template('index.html', data_list=data_list)
```
  
  ## 원인 파악
for문은 데이터 확인을 위해 사용할 때는 좋았지만 하나만 정보를 가져올 때는 find_one을 하더라도 for문이면 정상적으로 돌아가지 않았다, 또한, 조건이 빠져있다.
  
  ## 해결
```python
@app.route('/detail/<int:num>')
def detail(num):
    document = db.data.find_one({'num' : num})
    return render_template('detail.html', data=document)
```
  for문을 제거하고 collection.find()를 collection.find_one()으로 바꿔 사용 후 조건({'num' : 1})을 추가하니 잘 작동하였다
</details>

<!-- 지훈님 꺼 -->
<details>
<summary>3. 카카오맵 API를 사용하는과정에서 카카오맵에 마커와, 맵이 표시되지않는 문</summary>

## 오류 상황
카카오맵 API를 사용하는과정에서, Geocoder 오류가 발생해서, 카카오맵에 마커와, 맵이 표시되지않음.

## 오류 메시지
	Uncaught TypeError: Cannot read properties of undefined (reading 'Geocoder')
	at posts.js:32:40
  
  ## 시도
```python
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?
appkey=APIKEY"&libraries=services></script>
```
1. 카카오맵 홈페이지에서 자바스크립트에서 적용되는 API키 인지 다시 한번확인 (X)
2. 쿠키 세션 초기화 (다른사람 블로그 참조 X)
3. 카카오맵 API를 제공하는 사이트에서 공식문서를 다시 읽어서, service라이브러리를 포함하지않은걸 
파악하고, 소스 코드 수정
<head> 태그 바로아래 키 삽입하니 해결 
	
  ## 원인 파악
카카오맵에서 Service 라이브러리를 제공하는지 알지 못함 (공식문서체크 X)
코드를 haed태그 바로 아래에 붙여넣으니 해결.
  
  ## 해결
```python

```
  <head> 태그 바로아래 키 삽입하니 해결
## 느낀점
  코드를 그냥 붙여넣지말고, 해당 사이트 명세사항을 꼼꼼히 살펴보자..

</details>


<!-- 명주님 꺼 -->
<details>
<summary>4. 카테고리버튼 클릭시, 페이지 로딩 후 해당 카테고리 버튼 active가 안되는 문제</summary>


## 오류 상황
접은 내용

## 오류 메시지
접은 내용
  
  ## 시도
```python

```
  
  ## 원인 파악
접은 내용
  
  ## 해결
```python

```
  
</details>








