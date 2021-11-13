import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";
import {Provider} from "react-redux";
import {applyMiddleware} from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducers";

//원래 그냥 createStore 만 적으면 되는데 추가 기능을 위해 미들웨어를 추가해준다
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);


ReactDOM.render(
	<Provider store={createStoreWithMiddleware(Reducers,
			//브라우저에서 DEVTOOLS 익스텐션을 사용하기 위함
			window.__REDUX_DEVTOOLS_EXTENSTION__ &&
		    window.__REDUX_DEVTOOLS_EXTENSTION__()
		)}>
		<App /*이부분에 App대신 보여주고픈 컴포넌트를 넣으면 된다.*/ />
	</Provider>,
  document.getElementById('root')
  /*id가 root 인 태그(public/index.html에 위치) 안에 App 컴포넌트를 보여줄꺼라고 지정*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
