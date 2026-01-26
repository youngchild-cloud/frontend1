// import React, {useState, useContext} from 'react';
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
//import {AlertContext} from '../AlertContext';

function FruitsCreate(props) {
  //1. 폼양식에 입력한 상태값 관리를 위함
  const [form, setForm] = useState({
    name:'',//과일명
    price:'', //가격
    color:'', //색상
    country:'' //원산지
  });

  //url주소 관리
  const navigate = useNavigate();

  //const {setFruitsCount} = useContext(AlertContext);

  //2. 폼양식에 데이터를 입력하면 호출되는 함수
  const handleChange=(e)=>{
    setForm({
      ...form, //기존 배열값에 추가하여 입력
      [e.target.name]:e.target.value  //키:값
      //{키:값}
    });
  }

  //3. 폼양식 아래 'submit'버튼 클릭시 호출되는 함수
  const handleSubmit=(e) =>{
    e.preventDefault(); //새로고침 방지
    //비동기로 backend server에 데이터 넘김
    axios.post('http://localhost:9070/fruits', form)
    .then(()=>{//통신이 성공적으로 이루어지면
      alert('상품이 정상적으로 등록 완료 되었습니다.');
      //setFruitsCount(count=>count+1);      
      navigate('/fruits'); //상품목록 페이지로 이동하기
    })
    .catch(err=>console.log(err)); //실패시 콘솔모드에 에러출력함.
  }

  return (
    <main>
      <section>
        <h2>Fruits DB입력을 위한 페이지</h2>
        <form name="과일정보입력" onSubmit={handleSubmit}>
          <div>
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
              <button type="submit">신규상품 등록하기</button>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default FruitsCreate;