// import React, {useState, useContext} from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { AlertContext } from '../AlertContext';

function GoodsCreate(props) {
  //상태값 관리를 위한 함수
  const [form, setForm] = useState({
    g_name: '',
    g_cost: ''
  });

  //url주소관리
  const navigate = useNavigate();
  //const {setGoodsCount} = useContext(AlertContext)

  //사용자가 입력박스에 입력을 하면 호출되는 함수 == 값 저장
  const handleChange = (e) => {
    setForm({
      ...form, //기존 배열값에 새롭게 추가한다.
      [e.target.name]: e.target.value
    });
  }

  //신규상품 등록하기 버튼 클릭시 호출되는 함수 == backend 서버로 전달 
  const handleSubmit = (e) => {
    e.preventDefault(); //새로고침 막기

    axios.post('https://port-0-backend-express-server-mkvwe9x45fceba4b.sel3.cloudtype.app/goods', form)
      .then(() => { //통신이 성공하면
        alert('상품이 등록 완료 되었습니다.');
        navigate('/goods'); //상품목록 페이지로 이동하기
        //setGoodsCount(count=>count+1);
      })
      .catch(err => console.log(err));  //실패시 콘솔모드에 에러를 출력함
  }

  return (
    <main>
      <section>
        <h2>Goods DB입력을 위한 페이지</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label>상품명 : </label>
            <input
              name="g_name"
              value={form.g_name}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label>가격 : </label>
            <input
              type="number"
              name="g_cost"
              value={form.g_cost}
              onChange={handleChange}
              required
            />
          </p>
          <button type='submit'>신규 상품 등록하기</button>
        </form>
      </section>
    </main>
  );
}

export default GoodsCreate;