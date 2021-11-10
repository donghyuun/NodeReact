import React, {useEffect} from "react"
import axios from "axios"

function LandingPage() {
  //LandingPage에 들어오자 마자 useEffect 가 실행됨
  useEffect(()=> {
    axios.get('/api/hello')//서버에게 해당 주소로 get 하라고 get request를 서버에 보냄,
    .then(res => console.log(res.data))//서버에서 돌아오는 response를 console창에 출력
  }, [])

  return(
    <div>
      LandingPage 랜딩페이지
    </div>
  )
}

export default LandingPage