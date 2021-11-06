# NodeReact

<회원가입>
/api/users/register 에서 post 로 가입 정보를 넘겨주면 
- User 모델을 이용해서 받은 req.body 를 새로운 모델인스턴스 user 로 생성한다.
- 이후 save 메서드를 통해 user 를 db 에 저장한다.(저장하기 전에 password는 hashing 암호화한다.)
(암호화 과정)
bcrypt 의 genSalt 메서드를 통해 salt 를 생성하고, 유저가 정한 saltRounds 를해
hash 메서드로 유저의 password 를 hashing 한다. 따라서 mongodb엔 hashing 된 password 가 들어감

<로그인>
/api/users/login 에서 post 로 로그인 정보를 넘겨주면
- User 에서 findOne 메서드를 통해 같은 email 을 가진 객체를 가져온다(해당되는 객체가 없으면 false 이다.)
- 요청된 이메일이 db 에 있으면 비밀번호가 맞는 비밀번호인지 확인한다.
(비밀번호 확인 과정)
bcrypt 의 compare 메서드를 통해 /login 에서 post 한 (plain)password 와 이메일을 통해 찾은 유저의 db에
존재하는 hashing 된 password 를 비교한다 .
- 비밀번호가 맞다면 그 유저를 위한 토큰을 생성하고 cookie에 저장한다.
(토큰 생성 과정)
로그인 정보와 일치하는 db 의 user 객체의 _id 와 secret key 를 이용해 token 을 생성한다.
이후 user 객체의 token 속성에 생성한 token 을 넣어주고 save 한다.

<권한 Authentication>
/api/users/auth(인층처리를 하는 곳) 에 get 을 하게 되면 
- 미들웨어인 auth 를 통해 클라이언트의 쿠키에서 토큰을 가져오고 
- 토큰을 복호화 한 후, 해당 유저를 db 에서 찾는다.
(복호화 과정)
쿠키에서 가져온 토큰을 jwt 의 verify 메서드를 통해 복호화 한다.
이때, 토큰을 생성할 때 사용했던 secret key 를 사용하여 복호화 할 수 있다. 복호화를 하면 해당 user 의 _id 
를 구할 수 있다.
이후 복호화를 통해 구한 _id 와 db에 존재하는 해당 user 의 _id 와 일치하는지 확인한다.(토큰도 추가로 확인)
- 해당 유저가 존재한다면 req 에서 해당 user 와 token 을 사용할 수 있게 req 에 넣어준다.
