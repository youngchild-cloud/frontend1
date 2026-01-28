import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function FruitsUpdate(props) {

  //1. url경로에서 num값을 추출하여 가져옴.
  const { num } = useParams();

  const [form, setForm] = useState({
    num: '',
    name: '',
    price: '',
    color: '',
    country: ''
  });

  const navigate = useNavigate();

  //백엔드 서버측에 넘길 num값을 비동기로 통신하여 성공, 실패여부 출력하고
  //콤포넌트가 마운트 될때 해당 num값에 데이터를 조회하여 출력함.

  useEffect(() => {
    axios.get(`https://port-0-backend-express-server-mkvwe9x45fceba4b.sel3.cloudtype.app/fruits/${num}`)
      //성공이면
      .then(res => {
        console.log('서버 응답 값 : ', res.data);
        setForm(res.data);
      })
      //실패이면
      .catch(err => console.log('조회 오류 : ', err));
  }, [num])

  //입력폼에 입력시 데이터 입력을 위한 함수
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value//값을 저장
    });
  }

  //수정하기 버튼 클릭시 내용 전송을 위한 함수
  const handleSubmit = (e) => {
    e.preventDefault(); //새로고침 방지

    //비동기방식으로 업데이트할 내용을 백엔드로 전달함
    axios.put(`https://port-0-backend-express-server-mkvwe9x45fceba4b.sel3.cloudtype.app/fruits/fruitsupdate/${num}`, {
      name: form.name, //과일명 저장
      price: form.price, //가격정보 저장
      color: form.color, //색상
      country: form.country //원산지
    })
      .then(() => { //통신이 성공적으로 이루어질 경우
        alert('상품정보가 수정 완료되었습니다.');
        navigate('/fruits');//fruits페이지로 이동하기
      })
      .catch( //통신이 실패할 경우
        err => console.log('수정실패 : ', err));
  }

  return (
    <main>
      <section>
        <h2>Fruits DATA 수정(업데이트)을 위한 문서입니다.</h2>
        <form name="과일정보입력" onSubmit={handleSubmit}>
          <div>
            <p>
              <label htmlFor="num">Num : </label>
              <input
                id="num"
                name="num"
                value={form.num}
                readOnly
              />
            </p>
            <p>
              <label htmlFor="name">과일명 : </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label htmlFor="price">가격 : </label>
              <input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label htmlFor="color">색상 : </label>
              <input
                id="color"
                name="color"
                value={form.color}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label htmlFor="country">원산지 : </label>
              <input
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <button type="submit">수정하기</button>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default FruitsUpdate;