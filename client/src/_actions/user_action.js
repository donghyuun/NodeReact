import axios from "axios";
import { LOGIN_USER } from './types';

export function loginUser(dataToSubmit){
	//아래의 request 에 값을 담는 과정에서 미들웨어가 사용됨
	const request = axios.post('api/users/login', dataToSubmit)
	  .then(response => response.data)
	
	return {
		type: LOGIN_USER,
		payload: request
	}
}