//다운받았던 express 모듈을 가져온다.
const express = require("express");
//새로운 express app 을 만든다.
const app = express()
//5000번 포트를 백서버로 둔다.
const port = 5000
//client 에서 보내는 정보를 분석해서 서버에서 받을 수 있게 해준다.
const bodyParser = require("body-parser")
//모델을 가져온다.
const config = require('./config/key');
const { User } = require("./models/User");
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)//데이터베이스와 연결
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log("MongoDB error: ", err));

//root 디렉토리에 오면 hello world를 출력한다
app.get('/',(req, res) => res.send('헬로 월드'))

app.post('/register', (req,res) => {
  //회원가입할때 필요한 정보들을 client(현재는 postman) 에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  //받은 정보로 모델 생성, json 형식으로 req가 들어있다.
  const user = new User(req.body)
  //정보들이 database 에 save 된다.
  user.save((err, doc) => {
    if(err) return res.json({success:false,err})
    return res.status(200).json({success: true})
  })
})

app.post('/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 찾는다. mongoDB 메서드 이용
  User.findOne({email: req.body.email}, (err, user) => {
    if(!userInfo){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
        })
    }
  })
  //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인 
  user.comparePassword(req.body.password, (err, isMatch) => {
    if(!isMatch) 
    return res.json({loginSuccess: false, message:"비밀번호가 틀렸습니다"})
  //비밀번호가 맞다면 그 유저를 위한 토큰을 생성
  user.generateToken((err, user) => {
    
  })
  })

})

//5000번 포트에서 연결을 청취하고, 연결됬을 시 콜백함수를 실행한다.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
