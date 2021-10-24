if(process.env.NODE_ENV/*환경변수*/ === 'development'){
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}