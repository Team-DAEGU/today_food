src="https://code.jquery.com/jquery-3.6.0.min.js"



    async function save_post(){
        let restaurant_name = $('#restaurant-name').val()
        let address = $('#address').val()
        let foddie = $('#foddie').val()
        let comment = $('#comment').val()
        let tag =$('#tag').val()
        let url =  $('#url').val()
        let name =$('#name').val()
        let password = $('#password-input').val()

        let formData = new FormData();
   
        
        formData.append("restaurant_name",restaurant_name)
        formData.append("address",address)
        formData.append("categories",foddie)
        formData.append("comment",comment)
        formData.append("tag", tag)
        formData.append("url", url)
        formData.append("name",name)
        formData.append("password", password)

        console.log(name)
        console.log(password)

        let res = await fetch('/posts', {
            method: "POST",
            body: formData,
        });
        let res_json = await res.json() 
        if (res.status == 200){
            alert(res_json['msg'])
            window.location.reload();
        } else{
            alert('잘못된 요청')
        }
    }
  

