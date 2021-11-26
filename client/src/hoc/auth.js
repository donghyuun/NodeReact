import React, { useEffect } from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {auth} from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function(SpecificComponent, option, adminRoute = null){
	//SpecificComponent: 현재 감싸고 있는 컴포넌트
	//option 은 null, true, false 옵션이 있다. null은 아무나 출입가능한 페이지, 
	//true는 로그인한 유저만 출입가능한 페이지, false는 로그인한 유저는 출입불가능한 페이지
	
	let navigate = useNavigate();
	function AuthenticationCheck(props){
		const dispatch = useDispatch();
		
		useEffect(()=> {//페이지에 접근할때마다 실행되서 권한을 확인할 수 있도록 함
			//원래는 axios.get('api/users/auth')
			dispatch(auth()).then(response => {
				//백엔드에서 처리해서 가져온 정보
				console.log(response);
				
				//로그인 하지 않은 상태
				if(!response.payload.isAuth){
					if(option){
						navigate('/login');
					}
				} else {
					//로그인 한 상태
					if(adminRoute && !response.payload.isAdmin){navigate('/')} 
					else { //option 이 false 일때, login page or register page
						if(option === false){ navigate('/'); }
					}
				}
			})
		},[])
		return (
		<SpecificComponent/>
		)
	}
	
	return AuthenticationCheck();
}