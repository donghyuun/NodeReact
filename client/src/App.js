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

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </Routes>
      </div>
    </Router>
  );
}
//react-router-dom update v5 -> v6
//참고: https://blog.naver.com/qhanfckwsmsd/222559617779
export default App;

