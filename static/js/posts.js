src="https://code.jquery.com/jquery-3.6.0.min.js"

function goBack() {
    window.location.href = "/"
}

async function save_post(){


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
    let foddie = $('#foddie').val()
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

    let res = await fetch('/posts', {
        method: "POST",
        body: formData,
    });
    let res_json = await res.json() 
    
    if (res.status == 200){
        alert(res_json['msg'])
        window.location.href = "/"
    } else{
        alert('잘못된 요청')
        console.log(res.status)
    }
}