const { User } = require('../models/User');

let auth = (req, res, next) => {

  //인증 처리를 하는 곳
  
  //클라이언트 쿠키에서 토큰을 가져온다. cookie parser 이용
  let token = req.cookies.x_auth;//암호화(incode)되있는 상태
  //토큰을 복호화(암호화해제) 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({isAuth: false, error: true})
  })

  req.token = token;
  req.user = user;
  next();
  //유저가 있으면 인증OKAY

  //유저가 없으면 인증NO
}

module.exports = { auth };