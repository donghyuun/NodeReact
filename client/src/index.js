import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App/*이부분에 App대신 보여주고픈 컴포넌트를 넣으면 된다.*/ />
  </React.StrictMode>,
  document.getElementById('root')
  /*id가 root 인 태그(public/index.html에 위치) 안에 App 컴포넌트를 보여줄꺼라고 지정*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
