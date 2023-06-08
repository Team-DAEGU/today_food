$(document).ready(function(){
    active_btn();
});

// 카테고리 버튼 active시키기
function active_btn() {
    let path = decodeURI($(location).attr('pathname'));
    console.log(path);
    $('.category > button').removeClass('active');
    if (path == "/") {
        $('#전체').addClass('active');
    } else {
        let category = path.split("/list/")[1]
        $(`#${category}`).addClass('active');
    }
}

// 카테고리 버튼 클릭시 해당 카테고리 페이지 로딩
$('.category > button').click(function() {
    if (this.id == "전체") {
        window.location.href = '/';
    } else {
        window.location.href = `/list/${this.id}`
    }
});

// 게시글 클릭시 상세페이지로 이동
$('.col').click(async function(){
    let num = $(this).attr('id')
    window.location.href = `/detail/${num}`
})


// 좋아요수 증가 시키기
$('.like-btn').click(function(){
    // 클릭한 좋아요의 col의 num을 가져와서
    let num = $(this).parents('.col').attr('id');
    console.log(num);

    let formData = new FormData();
    formData.append('num', num);

    // api 호출
    fetch('/update/like', { method: "POST", body: formData, }).then((response) => response.json()).then((data) => {
        console.log(data["msg"]);
        window.location.reload();
    });
});