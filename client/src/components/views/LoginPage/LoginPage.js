import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

function LoginPage() {
  const dispatch = useDispatch();//디스패치 기능을 사용하기 위함
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const onEmailHandler = e => { setEmail(e.target.value); }
  const onPasswordHandler = e => { setPassword(e.target.value); }
  const onSubmitHandler = e => {
	  e.preventDefault();//refresh 막아줌
	  
	  //서버에 보낸다.
	  let body = {
		  email: email,
		  password: password
	  };
	  dispatch(loginUser(body));
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