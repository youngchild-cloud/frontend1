import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom'; //url주소 이동
import axios from 'axios'; //비동기 데이터 통신
import '../question.css';
import QuestionList from './QuestionList';
import { AlertContext } from '../AlertContext';

function Question(props) {
  // 1. 상태변수 만들기
  //동의합니다. 체크박스에 체크를 안한상태이기 때문에 false가 기본값
  const [agree, setAgree] = useState(false); //기본값 false
  const { setQuestionCount } = useContext(AlertContext);
  const navigate = useNavigate(); //url주소로 이동하기 위한 변수

  const [data, setData] = useState([]);

  //2. 폼태그에 입력해야 할 값
  const [formData, setFormData] = useState({
    name:'',
    phone:'',
    email:'',
    content:''
  });

  //3. 사용자가 입력양식에 입력을 하면 발생되는 함수 handleChange = 변수에 저장
  const handleChange =(e)=>{
    const{name, value} = e.target; //사용자가 입력하는 값
    setFormData(prev=>({ //상태함수에
      ...prev, [name]:value  //각각 키:값 으로 저장한다.
    }))
  }

  //4. 문의하기 버튼 동의 여부체크 = 유효성검사
  const handleSubmit =(e)=>{
    e.preventDefault(); //새로고침 방지
    if(!agree){ //체크박스에 체크를 하지 않았다면
      alert('개인정보처리방침에 동의해주세요.');
      return; //체크하고 오세요~
    }

    //5. 전송하기 (비동기로~) 보내는거  
    // get(조회), put(수정), delete(삭제), post(입력)
    axios.post(https://port-0-backend-express-server-mkvwe9x45fceba4b.sel3.cloudtype.app/question', formData)    
    .then(()=> { //통신이 성공적으로 이루어지면
      alert('문의사항이 접수되었습니다.');
      setQuestionCount(count => count + 1); // 숫자 증가
      setFormData({ //전송끝나면 프론트에서는 값을 비운다.
        name:'',
        phone:'',
        email:'',
        content:''
      });
      navigate('/question'); //문의하기 페이지로 이동
    })
    .catch(err=>console.log(err)); //실패시 콘솔모드에 에러출력하기
  }

  // 게시글 불러오기(뱃지)
  const loadData=()=>{
    //비동기 통신 사용
    axios
    .get('http://localhost:9070/question')
    //성공시 데이터를 저장
    .then(res=>{
      setData(res.data);
      setQuestionCount(res.data.length);
    })
    //실패시 에러 출력
    .catch(err=>console.log(err))
  }

  //2. 콤포넌트 생성시 한번만 데이터 불러오기
  useEffect(()=>{
    loadData();
  },[])

  //개발순서 : 변수선언 > 함수작성 > 호출하여 내용 실행 > 결과전송 
  return (
    <main>
      <section>
        <h2>Question</h2>
        <form onSubmit={handleSubmit} className="qna_form">
          <div className="qna">
            <h3>정성을 다해 답변을 해드리겠습니다.</h3>
            <div className="left_form">
              <p>
                <label htmlFor="name">성함</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='성함을 입력해주세요'
                  required
                />
              </p>
              <p>
                <label htmlFor="phone">전화번호</label>
                <input 
                  id="phone"
                  type="number"
                  name="phone"
                  placeholder="예) 01012345678"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </p>
              <p>
                <label htmlFor="email">이메일</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일 주소를 입력해주세요."
                  required
                />
              </p>
            </div>
            <div className="right_form">
              <p>
                <label htmlFor="content">문의 내용</label>
                <textarea
                  name="content"
                  cols="30" rows="10"
                  placeholder='문의내용을 입력하세요.'
                  onChange={handleChange}
                  value={formData.content}
                  required
                ></textarea>
              </p>
            </div>

            {/* 체크박스, 전송버튼 */}
            <div className="agree_wrap">
              <input 
                className="agree"
                type="checkbox"
                id="agree"
                checked={agree}
                // 체크박스는 true, false값만 저장해야 하기때문에
                // 체크한 경우는 true값을 setAgree함수에 넣어주면 됨.
                onChange={(e)=>setAgree(e.target.checked)}
              />
              <label htmlFor="agree">개인정보처리방침에 동의합니다.</label>

              <button type="submit"
                className="submit_btn"
              >SEND</button>
            </div>
          </div>
        </form>
      </section>

      {/* 관리자가 보는 문의사항 리스트 */}
      <QuestionList />
    </main>
  );
}


export default Question;
