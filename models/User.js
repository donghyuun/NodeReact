const mongoose = require('mongoose');

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

//스키마를 모델로 감싸준다.
//모델은 스키마를 감싸주는 역할
const User = mongoose.model('User', userSchema)

module.exports = { User }//모델 다른 곳에서도 쓸 수 있게 export 해준다.