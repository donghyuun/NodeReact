import React, { useEffect } from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {auth} from "../_actions/user_action";

export default function(SpecificComponent, option, adminRoute = null){
	//SpecificComponent: 현재 감싸고 있는 컴포넌트
	//option 은 null, true, false 옵션이 있다. null은 아무나 출입가능한 페이지, 
	//true는 로그인한 유저만 출입가능한 페이지, false는 로그인한 유저는 출입불가능한 페이지
	
	
	function AuthenticationCheck(props){
		const dispatch = useDispatch();
		
		useEffect(()=> {
			//원래는 axios.get('api/users/auth')
			dispatch(auth()).then(response => {
				//백엔드에서 처리해서 가져온 정보
				console.log(response);
			})
		})
	}
	
	return AuthenticationCheck;
}