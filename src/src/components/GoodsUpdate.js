import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';


function GoodsUpdate(props) {
  //1. 변수선언
  const {g_code} = useParams(); //받아온 code 파라미터값 변수
  const [form, setForm] = useState({
    g_code:'',
    g_name:'',
    g_cost:''
  });

  const navigate = useNavigate();

  //2. 백엔드 서버측으로 넘길 데이터를 통신해서 성공, 실패여부를 출력한다.
  useEffect(()=>{
    axios.get(`http://localhost:9070/goods/${g_code}`)
    //성공이면 출력
    .then(res=>{
      console.log('서버 응답 값 : ', res.data);
      
      //배열
      if(Array.isArray(res.data)){
        setForm(res.data[0])
      }else{
        setForm(res.data);
      }      
    })
    //실패면 오류 메세지
    .catch(err=>console.log('조회 오류 : ', err));
  }, [g_code]);

  //3. 사용자가 입력양식에 데이터를 입력했을 경우 상태 변수에 저장하기
  const handleChange=(e)=>{
    setForm({
      ...form, //기존 배열에 새롭게 추가
      [e.target.name]:e.target.value//값을 저장
    });
  }

  //4. 수정하기 버튼을 클릭시 실행되는 함수
  const handleSubmit=(e)=>{
    e.preventDefault();

    //비동기로 업데이트할 내용을 백엔드로 전달해줌
    axios.put(`http://localhost:9070/goods/goodsupdate/${g_code}`,{
      g_name:form.g_name, //상품명 저장
      g_cost:form.g_cost //가격정보 저장 
    })
    .then(()=>{//통신이 성공적으로 이루어질 경우
      alert('상품정보가 수정 완료되었습니다.');
      navigate('/goods'); //goods페이지로 이동하기
    })
    .catch( //통신이 실패할 경우
      err => console.log('수정 실패 : ', err));
  };

  return (
    <main>
      <section>
        <h2>Goods 데이터 수정 페이지입니다.</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="g_code">코드번호 :</label>
            <input name="g_code" id="g_code" value={form.g_code} readOnly />
          </p>
          <p>
            <label htmlFor="g_name">상품명 : </label>
            <input name="g_name" id="g_name" onChange={handleChange} value={form.g_name} required />
          </p>
          <p>
            <label htmlFor="g_cost">가격정보 : </label>
            <input type="number" name="g_cost" id="g_cost" onChange={handleChange} value={form.g_cost} required />
          </p>
          <button type="submit">수정하기</button>
        </form>

      </section>
    </main>
  );
}

export default GoodsUpdate;