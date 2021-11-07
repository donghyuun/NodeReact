if(process.env.NODE_ENV/*환경변수*/ === 'development')
//process.env.NODE_ENV 는 현재 위치한 모드를 가리킨다.
{//development 모드
  module.exports = require('./prod');
} else {//production 모드(deploy, 배포한 후)))
  module.exports = require('./dev');
}