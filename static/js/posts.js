src="https://code.jquery.com/jquery-3.6.0.min.js"
src="//dapi.kakao.com/v2/maps/sdk.js?appkey=638897c834de0b494df4f47f9c031aac"




function goBack() {
  window.location.href = "/"
}

const geocoder = new kakao.maps.services.Geocoder();
const keywordInput = document.getElementById('keyword-input');
const searchBtn = document.getElementById('search-btn');

// '검색' 버튼 클릭 시 keywordSearch 함수 호출 
searchBtn.addEventListener('click', function(event) {
  event.preventDefault(); // 폼 전송 방지
  const keyword = keywordInput.value;
  
  // 키워드 검색 요청
  geocoder.keywordSearch(keyword , function(result, status){
    if (status === kakao.maps.services.Status.OK){
      var coords= new kakao.maps.LatLng(result[0].y,result[0].x);

      // 결과값으로 받은 위치 좌표로 마커 만들어줍니다.
      var marker=new kakao.maps.Marker({
        map:map,
        position:coords,
 clickable:true,
       });
                
       // 지도 중심 좌표 변경하기 
       map.setCenter(coords);
     }   
   });    
});


  


 






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
  

