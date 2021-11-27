import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // eslint-disable-next-line
  Link
} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
//HigherOrderComponent로 안에 컴포넌트를 집어넣으면 새로운 컴포넌트로 만들어 반환한다.
import Auth from "./hoc/auth";//클라이언트 폴더의 auth 에서는 액션함수로 서버 폴더의 auth 미들웨어에 접근하여 현재 사용자의 권한을 확인하여 알맞게 페이지를 이동시킨다.

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={Auth(LandingPage, null)}/>
          <Route path="/login" element={Auth(LoginPage, false)}/>
          <Route path="/register" element={Auth(RegisterPage, false)}/>
        </Routes>
      </div>
    </Router>
  );
}
//react-router-dom update v5 -> v6
//참고: https://blog.naver.com/qhanfckwsmsd/222559617779
export default App;

