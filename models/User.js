const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken")
//스키마 생성
const userSchema = mongoose.Schema({
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
userSchema.pre('save', function(next){//next는 바로 이 과정을 pass 함
  //현재 스키마에 들어있는 post된 password를 가져온다
  var user = this;
  //field에서 password가 변환될때만 password를 암호화 해준다.
  if(user.isModified('password')){
    //bcrypt 패키지의 salt를 이용해서 비밀번호를 암호화 시킨다.
    //genSalt는 salt를 생성한다
    bcrypt.genSalt(saltRounds, function(err, salt){
    if(err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err)
      user.password = hash//password를 암호화된 hash 로 바꿔준다
      next()//완료 후 돌아감
    })
  })
  } else {//그냥 나갈 곳을 만들어준다.
    next()
  }
});

userSchema.methods.comparePassword = function(plainPassword, callback){
  //plainPassword vs hashed password (using bcrypt method)
  bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    if(err) return callback(err)//different
    callback(null, isMatch)//same
  })
}

userSchema.methods.generateToken = function(callback){
  var user = this;
  //jsonwebtoken을 이용해서 token 생성
  var token = jwt.sign(user._id.toHexString(), 'secretToken');//임의로 두번째 지정
  //user._id + 'secretToken' = token (incode)
  //->
  //'secretToken' -> user._id (decode)
  
  user.token = token;//user 객체의 token 에 토큰을 넣어준다.
  user.save(function(err, user){
    if(err) return callback(err)
    callback(null, user)
  })
}

userSchema.statics.findByToken = function(token, callback){
  var user = this;

  //토큰을 복호화(decode) 한다
  jwt.verify(token, 'secretToken', function(err, decoded){
    //유저 아이디(decoded)를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token 과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({"_id": decoded, "token": token }, function(err, user){

      if(err) return callback(err);
      callback(null, user);
    })
  })
}

//스키마를 모델로 감싸준다.
//모델은 스키마를 감싸주는 역할
const User = mongoose.model('User', userSchema)

module.exports = { User }//모델 다른 곳에서도 쓸 수 있게 export 해준다.