const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken")//토큰 발행 
//스키마 생성
const userSchema = mongoose.Schema({
  /*데이터를 mongodb에 저장하려면 먼저 구조(스키마)가 있어야 한다.
  스키마는 해당 컬렉션의 문서에 어떤 종류의 값이 들어가는지를 정의한다.
  mongoose 모듈을 불러와 mongoose.Schema 를 통해 스키마 객체를 생성한다.*/
  
  name: {
    type: String,
    maxlength: 50
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,//email에 공백이 있을 때 없애주는 역할
    unique: 1//똑같은 이멜 못쓰게
  },
  password: {
    type: String,
    minlength: 5
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {//유효성관련
    type: String
  },
  tokenExp: {//token의 유효기간
    type: Number
  }
})
//pre는 mongoose 에서 가져온 메서드, save는 저장하기 전에 function을 실행
userSchema.pre('save', function(next) {//next는 바로 이 과정을 pass 함
  //현재 스키마에 들어있는 post된 password를 가져온다
  var user = this;//this는 userSchema를 가리킨다.=> 회원가입시 입력한 데이터가 들어있음
  //field에서 password가 변환될때만 password를 암호화 해준다.
  if (user.isModified('password')) {
    //bcrypt 패키지의 salt를 이용해서 비밀번호를 암호화 시킨다.
    //genSalt는 salt를 생성한다, saltRounds 는 salt의 자릿수
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err)
	  //salt를 제대로 생성했다면	plainpassword 암호화
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err)
		//암호화 성공했다면 password를 암호화된 hash 로 바꿔준다
        user.password = hash
        next()//완료 후 돌아감
      })
    })
  } else {//비밀번호 변경안할 시 그냥 나갈 곳을 만들어준다.
    next()
  }
});

userSchema.methods.comparePassword = function(plainPassword, callback) {
  //plainPassword vs hashed password (using bcrypt method)
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if (err) return callback(err)//different
    callback(null, isMatch)//same
  })
}

userSchema.methods.generateToken = function(callback) {
  var user = this;
  //jsonwebtoken을 이용해서 token 생성
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  //임의로 두번째(secret key) 지정
  //user._id + 'secretToken' = token 생성(암호화)
  //->
  //'secretToken'을 이용하면 다시 -> user._id 확인(복호화)

  user.token = token;//user 객체(userSchema)의 token field 에 토큰을 넣어준다.
  user.save(function(err, user) {
    if (err) return callback(err)
    callback(null, user)
  })
}

userSchema.statics.findByToken = function(token, callback) {
  var user = this;

  //클라이언트의 토큰을 복호화(decode) 한다
  jwt.verify(token, 'secretToken', function(err, decoded) {
    //decode를 통해 확인한 user _id(decoded)를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token 과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({ "_id": decoded, "token": token }, function(err, user) {

      if (err) return callback(err);
      callback(null, user);
    })
  })
}

//스키마를 모델로 감싸준다. 모델은 스키마를 감싸주는 역할
/*module.exports 를 통해 mongoose의 모델로 User를 사용할 수 있도록 한다. 아래 과정을 통해 User모델은 userSchema 에 접근할 수 있게 된다.

model 함수에선 기본적으론 두개의 파라미터를 필요로한다. 첫번째는 파라미터는 해당 스키마의 이름이고, 두번째는 스키마 객체이다. 스키마의 이름을 정해주면, 이의 복수형태로 컬렉션이름을 만들어준다.(현 users)

예를들어, Book 으로 설정한다면, 실제 데이터베이스에서 생성되는 컬렉션 이름은 books 이다. 그리고, BookInfo 로 설정한다면 bookinfos 로 만들어진다.*/
const User = mongoose.model('User', userSchema);
module.exports = { User };
//모델 다른 곳에서도 쓸 수 있게 export 해준다.