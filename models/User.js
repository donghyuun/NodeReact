const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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

//스키마를 모델로 감싸준다.
//모델은 스키마를 감싸주는 역할
const User = mongoose.model('User', userSchema)

module.exports = { User }//모델 다른 곳에서도 쓸 수 있게 export 해준다.