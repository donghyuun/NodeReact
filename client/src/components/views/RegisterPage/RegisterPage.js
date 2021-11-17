import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const dispatch = useDispatch();//디스패치 기능을 사용하기 위함
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const onEmailHandler = e => { setEmail(e.target.value); }
  const onNameHandler = e => { setName(e.target.value); }
  const onPasswordHandler = e => { setPassword(e.target.value); }
  const onConfirmPasswordHandler = e => { setConfirmPassword(e.target.value); }
  
  let navigate = useNavigate();
  const onSubmitHandler = e => {
	  e.preventDefault();//refresh 막아줌
	  
	  if(password !== confirmPassword){
		  return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
	  }
	  
	  //서버에 보낸다.
	  let body = {
		  email: email,
		  password: password,
		  name: name
	  };
	  dispatch(registerUser(body))
	  .then(response => {//리듀서가 리턴하는 값을 참고함
		  if(response.payload.success){
			  navigate('/login')
		  }else{
			  alert('Failed to sign up')
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
		  
		  <label>Name</label>
		  <input type="name" value={name} onChange={onNameHandler} ></input>
		  
		  <label>Password</label>
		  <input type="password" value={password} onChange={onPasswordHandler} ></input>
		  
		  <label>Confirm Password</label>
		  <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} ></input>
		  
		  <br/>
		  <button>
		  	회원가입
		  </button>
	  </form>
		  
    </div>
  )
}

export default Register