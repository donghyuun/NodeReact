import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();//디스패치 기능을 사용하기 위함
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const onEmailHandler = e => { setEmail(e.target.value); }
  const onPasswordHandler = e => { setPassword(e.target.value); }
  let navigate = useNavigate();
  const onSubmitHandler = e => {
	  e.preventDefault();//refresh 막아줌
	  //서버에 보낸다.
	  let body = {
		  email: email,
		  password: password
	  };
	  dispatch(loginUser(body))
	  .then(response => {//리듀서가 리턴하는 값을 참고함
		  if(response.payload.loginSuccess){
			  navigate('/')//페이지 이동
		  }else{
			  alert('Error')
		  }
	  })
  }	
  return(
    <div style={{ display:"flex", justifyContent: "center", alignItems: "center",
				width: "100%", height: "100vh"}}>
		  
      <form style={{display:"flex", flexDirection:"column"}}
		  onSubmit={onSubmitHandler}>
		  <label>Email</label>
		  <input type="email" value={email} onChange={onEmailHandler} ></input>
		  <label>Password</label>
		  <input type="password" value={password} onChange={onPasswordHandler} ></input>
		  <br/>
		  <button>
		  	Login
		  </button>
	  </form>
		  
    </div>
  )
}

export default LoginPage