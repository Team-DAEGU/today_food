src="https://code.jquery.com/jquery-3.6.0.min.js"
src="//dapi.kakao.com/v2/maps/sdk.js?appkey=638897c834de0b494df4f47f9c031aac"




let map; // 맵 객체를 전역 변수로 선언합니다.

// Find Address 버튼을 클릭할 때 Kakao Map을 호출합니다.
function findAddress() {
      // Kakao Map 창을 열기 위한 URL
  var mapUrl = "https://map.kakao.com/";

  // 새 창을 열고 Kakao Map을 표시
  window.open(mapUrl);
  // Kakao Map 초기화 함수
  function initMap() {
      // 주소 입력 요소를 가져옵니다.
  var input = document.getElementById('address');
  
  // 입력 요소에서 주소를 가져옵니다.
  var address = input.value;

  // 주소를 URL 인코딩합니다.
  var encodedAddress = encodeURIComponent(address);

  // 새 창을 열기 위한 URL을 생성합니다.
  var mapUrl = "https://map.kakao.com/link/map/" + encodedAddress;

  // 새 창을 열고 Kakao Map을 표시합니다.
  window.open(mapUrl);



    // 서울 시청을 중심으로 하는 맵 객체를 생성합니다.
    map = new kakao.maps.Map(document.getElementById('map'), {
      center: new kakao.maps.LatLng(37.5662952, 126.9779451),
      level: 15,
    });

    // 장소 검색 객체를 생성합니다.
    var ps = new kakao.maps.services.Places();

    // 주소 입력 요소를 가져옵니다.
    var input = document.getElementById('address');

    // 주소가 변경될 때마다 호출되는 콜백 함수입니다.
    function searchPlaces() {
      // 입력 요소에서 키워드를 가져옵니다.
      var keyword = input.value;

      // 키워드가 비어있는 경우 에러 메시지를 표시합니다.
      if (!keyword) {
        alert('검색어를 입력해주세요.');
        return;
      }

      // 콘솔에 키워드를 출력합니다. (디버깅용)
      console.log(keyword);

      // 장소 검색 결과 콜백 함수입니다.
      function placesSearchCB(data, status, pagination) {
        // 상태가 OK인 경우, 맵에 마커를 표시합니다.
        if (status === kakao.maps.services.Status.OK) {
          // 경계 객체를 생성합니다.
          var bounds = new kakao.maps.LatLngBounds();

          // 검색 결과를 순회하며 마커 객체를 생성합니다.
          for (var i = 0; i < data.length; i++) {
            // 마커 객체를 생성합니다.
            var marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(data[i].y, data[i].x),
            });

            // 맵에 마커를 추가합니다.
            marker.setMap(map);

            // 경계 객체를 마커의 위치로 확장합니다.
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          // 맵의 경계를 경계 객체로 설정합니다.
          map.setBounds(bounds);
        } else {
          // 상태가 OK가 아닌 경우 에러 메시지를 표시합니다.
          alert('검색 결과가 없거나 오류가 발생했습니다.');
        }
      }

      // 주소 입력 요소의 Enter 키 이벤트에 대한 이벤트 리스너를 추가합니다.
      input.onkeydown = function (e) {
        if (e.keyCode === 13) {
          searchPlaces();
        }
      };

      // 장소 검색을 실행합니다.
      ps.keywordSearch(keyword, placesSearchCB);
    }

    // 주소 검색 함수를 호출합니다.
    searchPlaces();
  }

  // Kakao Map API 스크립트가 로드되면 initMap 함수를 호출합니다.
  kakao.maps.load(initMap);
}





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
  

