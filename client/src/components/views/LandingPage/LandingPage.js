import React, {useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  let navigate = useNavigate();
  //LandingPage에 들어오자 마자 useEffect 가 실행됨
  useEffect(()=> {
    axios.get('/api/hello')//서버에게 해당 주소로 get 하라고 get request를 서버에 보냄,
    .then(response => console.log(response.data))//서버에서 돌아오는 response를 console창에 출력
  }, [])

  const onClickHandler = () => {
	  axios.get('api/users/logout')//서버에서 axios.get 요청을 받아 처리한다.
	  .then(response => {
		  if(response.data.success){
			  navigate("/login");
			  console.log(response.data);
		  } else {
			  alert('로그아웃 하는데 실패했습니다.');
		  }
	  })
  }
	
  return(
    <div style={{ display:"flex", justifyContent: "center", alignItems: "center",
				width: "100%", height: "100vh"}}>
      <h2>시작페이지</h2>
	  <button onClick={onClickHandler}>로그아웃</button>	  
		  
    </div>
  )
}

export default LandingPage