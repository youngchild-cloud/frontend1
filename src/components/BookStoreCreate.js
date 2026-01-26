import React, { useState} from 'react';
// import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import {AlertContext} from '../AlertContext';

function BookStoreCreate(props) {

  ///1. 상태변수 선언하기
  const [form, setForm] = useState({
    name:'',
    area1:'',
    area2:'',
    area3:'',
    book_cnt:0,
    owner_nm:'',
    tel_num:''
  });

  //2. url주소 관리
  const navigate = useNavigate();

  // const {setBookstoreCount} = useContext(AlertContext);

  //3. 사용자가 입력폼에 데이터 입력시 발생되는 함수
  const handleChange=(e)=>{
    const {name, value} = e.target; //입력값 변수

    setForm((prev)=>({
      ...prev,
      [name]:name==='book_cnt'?Number(value):value
    }));
  }

  //3. '신규상품 등록하기'버튼 클릭시 내용 백엔드로 주소전송하기
  const handleSubmit=(e)=>{
    e.preventDefault(); //새로고침 방지
    axios.post('http://localhost:9070/bookstore', form)
    .then(()=>{ //성공시
      alert('상품이 등록 완료되었습니다.');
      // setBookstoreCount(count=>count+1);//숫자증가
      navigate('/bookstore'); //처음 목록페이지로 이동
    })
    .catch((err)=>{//실패시
      console.error(err);
      alert('등록 중 오류가 발생되었습니다.');
    });
  }
  
  return (
    <main>
      <section>
        <h2>4. BOOKS DB입력을 위한 페이지</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">서점명 : </label> 
            <input 
              id="name" 
              name="name" 
              value={form.name} 
              onChange={handleChange}
              required 
            />
          </div>
          <div>
            <label htmlFor="area1">지역1(시) : </label>
            <select id="area1" 
              name="area1"
              value={form.area1}
              onChange={handleChange}
              required
            >
              <option value="">지역을 선택하세요.</option>  
              <option value="서울">서울</option>  
              <option value="경기">경기</option>  
              <option value="경남">경남</option>  
              <option value="광주">광주</option>  
              <option value="강원">강원</option>  
              <option value="대전">대전</option>  
              <option value="대구">대구</option>  
              <option value="부산">부산</option>  
              <option value="제주도">제주도</option>  
            </select>
          </div>
          <div>
            <label htmlFor="area2">지역2(구) : </label>
            <select 
              id="area2"
              name="area2"
              value={form.area2}
              onChange={handleChange}
              required
            >
              <option value="">지역2를 선택하세요</option>
              <option value="서초">서초</option>
              <option value="성남">성남</option>
              <option value="남구">남구</option>
              <option value="창원">창원</option>
              <option value="서귀포">서귀포</option>
              <option value="수영">수영</option>
              <option value="경기">경기</option>
            </select>
          </div>
          <div>
            <label htmlFor="area3">지역3(동) : </label>
            <select
              id="area3" name="area3"
              value={form.area3}
              onChange={handleChange}
              required
            >
              <option value="">지역3를 선택하세요</option>
              <option value="방배">방배</option>
              <option value="청담">청담</option>
              <option value="구기">구기</option>
              <option value="인사">인사</option>
              <option value="명동">명동</option>
              <option value="익선">익선</option>
              <option value="삼청">삼청</option>
            </select>
          </div>
          <div>
            <label htmlFor="">상품개수 :</label>
            <input 
              id="book_cnt" type="number" name="book_cnt"
              value={form.book_cnt}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="owner_nm">대표자명 : </label>
            <input 
              id="owner_nm" name="owner_nm"
              value={form.owner_nm}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="tel_num">전화번호 : </label>
            <input 
              id="tel_num" name="tel_num"
              value={form.tel_num}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">
            신규상품 등록하기
          </button>
        </form>
      </section>
    </main>
  );
}

export default BookStoreCreate;