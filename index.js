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
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log("MongoDB error: ", err));

//root 디렉토리에 오면 hello world를 출력한다
app.get('/',(req, res) => res.send('헬로 월드'))

app.post('/register', (req,res) => {
  //회원가입할때 필요한 정보들을 client(현재는 postman) 에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  //모델 생성, json 형식으로 req가 들어있다.
  const user = new User(req.body)
  //정보들이 user 모델에 저장된다
  user.save((err, doc) => {
    if(err) return res.json({success:false,err})
    return res.status(200).json({success: true})
  })
})


//5000번 포트에서 연결을 청취하고, 연결됬을 시 콜백함수를 실행한다.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
