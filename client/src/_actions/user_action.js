import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

export function loginUser(dataToSubmit) {
    //아래의 request 에 값을 담는 과정에서 미들웨어가 사용됨
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return { //벡엔드에서 받아온 값을 dispatch 로 reducer 에 전달한다.
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    //아래의 request 에 값을 담는 과정에서 미들웨어가 사용됨
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(dataToSubmit) {
    //아래의 request 에 값을 담는 과정에서 미들웨어가 사용됨
    const request = axios.get('/api/users/auth')//서버에서 권한을 확인함
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}
