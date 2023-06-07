
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

function show_category_list(category) {
    $(".store-list").empty();
    fetch(`/list/${category}`).then(res => res.json()).then(data => {
        let rows = data['result'];
        rows.forEach(e => {
            let title = e['title'];
            let address = e['address'];
            let tags = e['tags'];
            let img_url = e['img_url'];
            let like = e['like'];
            let like_url = "";
            if (like != 0) {
                like_url = "../static/images/heart-fill.png";
            } else {
                like_url = "../static/images/heart-light.png";
            }
            let temp_html = `<div class="col"> <!-- card 시작-->
                                <div class="card h-100">
                                    <img class="store-thumnail" src="${img_url}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <p>
                                            <span class="title">${title} </span>
                                            <span class="address">${address}</span>
                                        </p>
                                        <p class="tag-like">
                                            <span class="tag-list">
                                                <span class="tag">😋 음식이 맛있어요</span>
                                                <span class="tag">💗 친절해요</span>
                                                <span class="tag">🛋️ 인테리어가 멋져요</span>
                                            </span>
                                            <span>
                                                <a class="like-btn" onclick="change_like()">
                                                    <img class="like" src="${like_url}">
                                                </a>
                                                ${like}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div> <!-- card 끝-->`;
            $(".store-list").append(temp_html);
            let tag_list = $(".store-list .col:last-child .tag-list");
            tag_list.empty();
            tags.forEach(tag => {
                let temp_html = `<span class="tag">${tag}</span>`;
                tag_list.append(temp_html);
            });            
        });
    });
}

// function change_like() {
//     // 클릭한 좋아요의 블럭 id를 가져와서
//     // 좋아요수 증가시키기
// }