import React, { useEffect } from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {auth} from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

//백엔드에 request 를 날려서 유저의 상태를 백엔드로부터 받아온다.
//가져온 정보를 바탕으로 접근하려 하는 페이지의 권한을 확인하고 그에 따라 처리한다.
export default function(SpecificComponent, option, adminRoute = null){
	//SpecificComponent: 현재 감싸고 있는 컴포넌트
	//option 은 null, true, false 옵션이 있다. 
	//null => 아무나 출입가능한 페이지, 
	//true => 로그인한 유저만 출입가능한 페이지
	//false => 로그인한 유저는 출입불가능한 페이지
	
	
	
	function AuthenticationCheck(props){
		let navigate = useNavigate();
		const dispatch = useDispatch();
		
		useEffect(()=> {//페이지에 접근할때마다 실행되서 권한을 확인할 수 있도록 함
			//원래는 axios.get('api/users/auth')
			dispatch(auth()).then(response => {//auth 액션함수가 반환하는 값(=reducer에게 전달될 값)
				//백엔드에서 처리해서 가져온 정보
				console.log(response);
				
				//로그인 하지 않은 상태
				if(!response.payload.isAuth){
					if(option){
						navigate('/login');
					}
				} else {
					//로그인 한 상태
					//adminRoute에 접근하려는데 admin이 아닌 경우
					if(adminRoute && !response.payload.isAdmin){navigate('/')} 
					else { //option 이 false 일때, login page or register page
						//로그인한 유저는 출입불가인 페이지에 접근할 때
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