// index.html 랜더링 후 index() 함수 호출!
$(document).ready(function () {
    index();
});

// 처음 접속 시 모든 카테고리의 게시글을 가져옴(카테고리 구분x)
async function index(){
    let res = await fetch('/index', {
        method: "GET",
    })
    let res_json = await res.json()
    console.log(res_json)
}