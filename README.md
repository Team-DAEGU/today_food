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
[page](https://www.figma.com/file/FmvTyaiZ6CvZtQCifPIMx6/%EC%99%80%EC%9D%B4%EC%96%B4-%ED%94%84%EB%A0%88%EC%9E%84?type=design&node-id=0-1&t=J3Y7t6S0tId5458R-0)


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

<details>
<summary>1. DB 컬렉션의 특정 필드 배열에 값이 추가되지 않고 수정되는 문제</summary>

<!-- summary 아래 한칸 공백 두어야함 -->
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


<details>
<summary>1. DB 컬렉션의 특정 필드 배열에 값이 추가되지 않고 수정되는 문제</summary>

<!-- summary 아래 한칸 공백 두어야함 -->
## 오류 상황
게시글의 상세페이지에서 댓글 작성 api를 구현하던 중 댓글 작성 시 해당 게시글의 댓글 배열에 값이 추가 되지 않고 변경되는 상황 발생

## 오류 메시지
코드는 작동했으나 기존 배열이 사라지고 새 배열에 하나의 값만 저장됨
  
  ## 시도
```python

```
  
  ## 원인 파악
접은 내용
  
  ## 해결
```python

```
  
</details>


<details>
<summary>1. DB 컬렉션의 특정 필드 배열에 값이 추가되지 않고 수정되는 문제</summary>

<!-- summary 아래 한칸 공백 두어야함 -->
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


<details>
<summary>1. DB 컬렉션의 특정 필드 배열에 값이 추가되지 않고 수정되는 문제</summary>

<!-- summary 아래 한칸 공백 두어야함 -->
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







