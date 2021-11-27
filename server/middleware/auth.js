//유저 모델을 가져온다.
const { User } = require('../models/User');

//인증 처리를 하는 곳
let auth = (req, res, next) => {
  //1. 클라이언트 쿠키에서 토큰을 가져온다. cookie parser 이용
  let token = req.cookies.x_auth;//암호화(incode)되있는 상태
  
  //2. 토큰을 복호화 한 후, 해당 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if(err) throw err;
	//해당 토큰을 가진 유저가 없다(=유저가 로크인 되지 않았다.)
    if(!user) return res.json({isAuth: false, error: true})
  
  //유저가 있다면 req에서 user와 token 을 사용할 수 있게 해준다.
  req.token = token;
  req.user = user;
  next();//미들웨어를 벗어나 계속 갈 수 있게
  })
}

module.exports = { auth };