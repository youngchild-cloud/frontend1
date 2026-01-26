import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(props) {

  //1. 상태변수 선언 username, password
  const [form, setForm] = useState({
    username:'', //아이디 저장을 위한 변수
    password:''  //패스워드 저장을 위한 변수
  });

  const [error, setError] = useState('');

  // url주소 관리 - 로그인 성공시 이동할 페이지 설정을 위해
  const navigate = useNavigate();

  //2. 입력시 발생되는 함수
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  //3. 로그인 버튼 클릭시 실행되는 함수
  const handleSubmit = async e =>{
    e.preventDefault(); //새로고침 방지
    //console.log(form.username, form.password)

    try{ //성공시 실행내용
      const res = await axios.post('http://localhost:9070/login', form);
      //사용자 인증이 끝나면 '토근'을 발급한다.
      localStorage.setItem('token', res.data.token);
      
      alert('로그인 성공');

      //해당페이지로 이동하기
      navigate('/');
      
    // 리디렉션 등 필요 시
    }catch(err){ //실패시 실행내용
      setError('로그인 실패 : 아이디와 패스워드를 다시 확인하세요.');
    }
  };

  return (
    <main>
      <section className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="username">아이디 : </label>
            <input type="text" 
            id="username" 
            name="username"
            value={form.username} 
            onChange={handleChange}
            className="input-box" 
            placeholder='아이디' 
            required />
          </p>
          <p>
            <label htmlFor="password">패스워드 : </label>
            <input type="password" 
            id="password" 
            name="password" 
            value={form.password}
            onChange={handleChange}
            className="input-box" 
            placeholder="패스워드" 
            required />
          </p>
          <p>
            <input type="submit" className="login-button" value="로그인" />
          </p>

          {/* 에러가 발생이 되면 빨강색으로 표시하기 */}
          {error&&<p style={{color:'red'}}>{error}</p>}

          <p className="btn-group">
            <Link to="/id_search">아이디 찾기 </Link>
            &#10072;
            <Link to="/pw_search">비번찾기 </Link>
            &#10072;
            <Link to="/join">회원가입</Link>
          </p>
        </form>

        <br /><br />
        <dl>
          <dt>//0. 로그인 구현 전체 구성</dt>
          <dd>1. 프론트엔드(React) : 로그인 폼 작성, 로그인 버튼 클릭시 서버에 인증 요청하기</dd>
          <dd>2. 백엔드(Backend : Node.js + Express) : 로그인 처리, JWT토큰 발급</dd>
          <dd>3. 데이터베이스(MYSQL) : DB입/출력</dd>
          <dd>4. 보안 : 비밀번호 bycrpt암호화, JWT로 인증을 유지</dd>
        </dl>
        <br />
        <div style={{textAlign:'left'}}>
          <p>//1. DB 설계(users)</p>
          <p>
            CREATE TABLE users (<br />
            id INT AUTO_INCREMENT PRIMARY KEY,<br />
            username VARCHAR(100) UNIQUE NOT NULL,<br />
            password VARCHAR(255) NOT NULL,<br />
            datetime TIMESTAMP NOT NULL DEFAULT <br />CURRENT_TIMESTAMP<br />
          );<br /><br />
          </p>

          <p>
          //2. 데이터베이스에 회원정보 입력하기(INSERT INTO)<br />
        INSERT INTO users VALUES(1, 'jeon', '1234', '2025-05-26');<br />
        INSERT INTO users VALUES(2, 'jeon1', '1234', '2025-05-26');<br />
        INSERT INTO users VALUES(3, 'jeon2', '1234', '2025-05-26');<br />
        INSERT INTO users VALUES(4, 'jeon3', '1234', '2025-05-26');<br />
        INSERT INTO users VALUES(5, 'jeon4', '1234', '2025-05-26');<br /><br />

          //3. UI화면 설계 - 로그인 폼, 회원가입 폼 구현
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;