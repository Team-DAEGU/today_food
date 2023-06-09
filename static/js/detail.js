function update_view(data) {
    $('.post-part').empty(data);
    let temp_html = `<div class="row g-0">
                        <div class="col-md-4 p-4">
                            <img src="${data['img_url']}" class="store-img img-fluid" alt="...">
                            <input class="w-100 mt-2" type="url" id="url" name="url" value="${data['img_url']}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body h-100 p-4">
                                <div class="row">
                                    <div class="row mb-1">
                                        <input class="col-8 info-title me-4" type="text" id="restaurant-name" name="restaurant-name" value="${data['title']}"">
                                        <select class="col info-category form-select" aria-label="Default select example" id="foodie">
                                            <option>음식 종류</option>
                                            <option value="양식">🍝 양식</option>
                                            <option value="일식">🍣 일식</option>
                                            <option value="중식">🥟 중식</option>
                                            <option value="한식">🍚 한식</option>
                                            <option value="술집">🍺 술집</option>
                                            <option value="카페">☕️ 카페</option>
                                        </select>
                                    </div>
                                    <div class="row mb-4">
                                        <input class="info-address" type="text" id="address" name="address" value="${data['address']}">
                                    </div>
                                    <div class="row">
                                        <input class="info-comment" type="text" id="comment" name="comment" value="${data['comment']}">
                                    </div>
                                </div>
                                <div class="tag-like">
                                    <div class="w-70">
                                        <select class="form-select" multiple aria-label="multiple select example" id="tag">
                                            <option>태그를 선택해주세요! (ctrl+클릭으로 다중 선택 가능!)</option>
                                            <option value="😋 음식이 맛있어요">😋 음식이 맛있어요</option>
                                            <option value="💗 친절해요">💗 친절해요</option>
                                            <option value="🛋️ 인테리어가 멋져요">🛋️ 인테리어가 멋져요</option>
                                            <option value="👩🏻‍🍳 특별한 메뉴가 있어요">👩🏻‍🍳 특별한 메뉴가 있어요</option>
                                            <option value="💐 특별한 날 가기 좋아요">💐 특별한 날 가기 좋아요</option>
                                            <option value="🤑 가성비가 좋아요">🤑 가성비가 좋아요</option>
                                            <option value="🌱 재료가 신선해요">🌱 재료가 신선해요</option>
                                            <option value="🍚 양이 많아요">🍚 양이 많아요</option>
                                            <option value="✨ 매장이 청결해요">✨ 매장이 청결해요</option>
                                            <option value="🕯️ 분위기가 좋아요">🕯️ 분위기가 좋아요</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
    $('.post-part').append(temp_html);
    $('#foodie').val(`${data['category']}`).prop("selected",true);
    // for (tag in data['tags']) {
    //     $('#tag').val(tag).prop("selected",true);
    // }
    $('.comment-part').empty();
    temp_html = `<div class="card-body">
                    <div class="row w-100">
                        <label class="col-3" for="nickname-input">닉네임</label>
                        <input class="col" type="name" id="name" name="name">
                    </div><br>

                    <div class="row w-100">
                        <label class="col-3" for="password-input">Password</label><br />
                        <input class="col" type="password" id="password-input">
                    </div><br>
                </div>`
    $('.comment-part').append(temp_html);
    $('.btn-group > #1').attr('onclick', `location.href ='/detail/${data['num']}'`);
    $('.btn-group > #2').text('완료');
    $('.btn-group > #2').attr('onclick', `update_post(${data['num']})`);
    $('.btn-group > #3').remove();
}

async function update_post(num){
    let restaurant_name = $('#restaurant-name').val()
    if (restaurant_name == "") {
        alert("상호명을 입력해주세요!")
        $('#restaurant-name').focus()
        return false;
    } 
    let address = $('#address').val()
    if (address == "") {
        alert("주소를 입력해주세요!")
        $('#address').focus()
        return false;
    }
    let foddie = $('#foodie').val()
    if (foddie == "") {
        alert("음식의 종류를 선택해주세요!!")
        $('#foddie').focus()
        return false;
    }
    let comment = $('#comment').val()
    if (comment == "") {
        alert("코멘트를 입력해주세요!")
        $('#comment').focus()
        return false;
    }
    let tag =$('#tag').val()
    console.log(tag)
    if (tag == "") {
        alert("태그를 입력해주세요!")
        $('#tag').focus()
        return false;
    }
    let url =  $('#url').val()
    if (url == "") {
        alert("이미지 url을 입력해주세요!")
        $('#url').focus()
        return false;
    }
    let name =$('#name').val()
    if (name == "") {
        alert("작성자의 닉네임을 입력해주세요!")
        $('#name').focus()
        return false;
    }
    let password = $('#password-input').val()
    if (password == "") {
        alert("이 게시글의 비밀번호를 입력해주세요!")
        $('#password-input').focus()
        return false;
    }

    let formData =  new FormData();
    formData.append("restaurant_name",restaurant_name)
    formData.append("address",address)
    formData.append("categories",foddie)
    formData.append("comment",comment)
    formData.append("tag", tag)
    formData.append("url", url)
    formData.append("name",name)
    formData.append("password", password)

    let res = await fetch(`/detail/${num}/update`, {
        method: "PUT",
        body: formData,
    });
    let res_json = await res.json() 
    
    if (res.status == 200){
        alert(res_json['msg'])
        window.location.href = `/detail/${num}`
    } else{
        alert('잘못된 요청')
        console.log(res.status)
    }
}

function delete_view(data) {
    alert('닉네임과 비밀번호를 입력해주세요!');
    $('.comment-part').empty();
    temp_html = `<div class="card-body">
                    <div class="row w-100">
                        <label class="col-3" for="nickname-input">닉네임</label>
                        <input class="col" type="name" id="name" name="name">
                    </div><br>

                    <div class="row w-100">
                        <label class="col-3" for="password-input">Password</label><br />
                        <input class="col" type="password" id="password-input">
                    </div><br>
                </div>`
    $('.comment-part').append(temp_html);
    $('.btn-group > #1').attr('onclick', `location.href ='/detail/${data['num']}'`);
    $('.btn-group > #3').attr('onclick', `delete_post(${data['num']})`);
    $('.btn-group > #2').remove();
}

async function delete_post(num) {
    let name = $('#name').val()
    if (name == "") {
        alert("작성자의 닉네임을 입력해주세요!")
        $('#name').focus()
        return false;
    }
    let password = $('#password-input').val()
    if (password == "") {
        alert("이 게시글의 비밀번호를 입력해주세요!")
        $('#password-input').focus()
        return false;
    }

    let formData =  new FormData();
    formData.append("name",name)
    formData.append("password", password)
    let res = await fetch(`/detail/${num}/delete`, {
        method: "DELETE",
        body: formData,
    });
    let res_json = await res.json() 
    
    if (res.status == 200){
        alert(res_json['msg'])
        window.location.href = `/`
    } else{
        alert('잘못된 요청')
        console.log(res.status)
    }
}