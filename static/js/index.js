$('.like-btn').click(function(){
    // 클릭한 좋아요의 col의 num을 가져와서
    let num = $(this).parents('.col').attr('id');
    console.log(num);

    let formData = new FormData();
    formData.append('num', num);

    // 좋아요수 증가시키기
    fetch('/update/like', { method: "POST", body: formData, }).then((response) => response.json()).then((data) => {
        console.log(data["msg"]);
        window.location.reload();
    });
});

$('.col').click(async function(){
    let num = $(this).attr('id')
    window.location.href = `/detail/${num}`
})