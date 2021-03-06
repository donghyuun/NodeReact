//다운받았던 express 모듈을 가져온다.
//참고: https://expressjs.com/ko/guide/routing.html
const express = require("express");
//새로운 express app 을 만든다.
const app = express()
//client 에서 보내는 정보를 분석해서 서버에서 받을 수 있게 해준다.
//bodyParser를 사용하지 않으면 req.body가 undefinded를 default로 받는다.
const bodyParser = require("body-parser")
//모델을 가져온다.
const cookieParser = require("cookie-parser");
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require("./models/User");
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
/*bodyparser는 client 에서 오는 정보를 "분석해서" 가져올 수 있게 한다.
x-www-form-urlencoded 이렇게 된 데이터와
json 형식의 데이터를 분석할 수 있게 하기 위해 윗 문장을 적어준다.*/
app.use(cookieParser());
/*app.use(
	cors({
		origin: cors_origin, //허락하고자 하는 요청주소
		credentials: true, //true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
	})
);*/

const mongoose = require('mongoose');//스키마를 만들고, 해당 스키마에 맞는 모델을 만들어 공통된 조건에 맞게 조회 및 저장이 가능하다.
mongoose.connect(config.mongoURI)//서버와 데이터베이스(mongoDB)를 연결
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log("MongoDB error: ", err));

//root 디렉토리에 오면 hello world를 출력한다
app.get('/', (req, res) => res.send('hello world'))

//let cors_origin = ['http://localhost:3000'];

app.get('/api/hello', (req,res) => {
  res.send("Hello World~ ")
})

app.post('/api/users/register', (req, res) => {
  //회원가입할때 필요한 정보들을 client(현재는 postman) 에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  //받은 정보로 모델 생성, json 형식으로 req가 들어있다.
  const user = new User(req.body)//req.body를 모델에 넣어 인스턴스를 생성한다.
  //컬렉션(DB)에 저장하려면 mongoose의 save() 메소드를 호출하면 됩니다.
  //req.body에 들어있을 수 있는 이유는 bodyparser를 사용하기 때문
  //save메서드를 사용해 데이터베이스(mongodb)에 생성한 user 모델 인스턴스를 저장한다.
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
  //결과적으로 http post 메소드로 백엔드 서버로 유저 정보를 날려주고 백엔드 서버에서 save 메소드로 DB에 저장을 해준다
})

app.post('/api/users/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 찾는다. mongoDB 메서드 이용
  User.findOne({ email: req.body.email }, (err, user) => {
    //요청한 email이 db정보 안에 있을 때 해당 db정보를 담은 객체 user 가 생성된다.
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인 
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) //비밀번호가 틀림
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다" })
      //비밀번호가 맞다면 그 유저를 위한 토큰 생성
      user.generateToken((err, user) => {//token이 들어있는 user 객체
        if (err) return res.status(400).send(err);

        //토큰을 저장한다. 어디에? 쿠키, localStorage 등.. 지금은 쿠키의 "x_auth"경로에
        res.cookie("x_auth", user.token)
          .status(200)//성공했다는 표시
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

//현재의 role => role 0 -> 일반유저, role 0 아니면 관리자
app.get('/api/users/auth', auth/*미들웨어*/, (req, res) => {
  //미들웨어 실행~~
	
  //여기 까지 미들웨어를 통과해 왔다는 얘기는 authentication 이 true 라는 말
  //클라이언트에 true라는 정보를 제공
  res.status(200).json({
    _id: req.user._id,//auth에서 user 를 req 에 넣었기 때문에 사용가능
    isAdmin: req.user.role === 0 ? false : true,//변경가능
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res)=> {
  //첫번째 인자에 찾을 조건, 두번재 인자에 변경할 것
  User.findOneAndUpdate({_id: req.user._id/*auth에서 req에 넣어줬음*/}, 
  {token: ""},
  (err, user)=> {
    if(err) return res.json({success: false, err});
    return res.status(200).send({success:true})
  })
})

//5000번 포트를 백서버로 둔다.
const port = 5000
//5000번 포트에서 연결을 청취하고, 연결됬을 시 콜백함수를 실행한다.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//mongoose guide 
//https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174385/mongoose-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0
