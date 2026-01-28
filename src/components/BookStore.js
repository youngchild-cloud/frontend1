import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function BookStore(props) {
  //1. 상태변수 만들기
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //초기값
  const itemsPerPage = 5; //한 페이지에 보여지는 게시물 개수
  
  const [inputKeyword, setInputKeyword] = useState('');//입력을 위한 키워드 변수
  const [keyword, setKeyword] = useState(''); //실제 검색에 사용될 키워드 변수

  const navigate = useNavigate();
  const {setBookstoreCount} = useContext(AlertContext);

  // 검색어가 포함된 데이터만 필터링
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  //2. 데이터 리스트 비동기로 받아서 출력
  const loadData=()=>{
    axios //비동기로
    .get('https://port-0-backend-express-server-mkvwe9x45fceba4b.sel3.cloudtype.app/bookstore') //주소로 요청한 json데이터 파일을 가져온다.
    .then(res=>{ //성공시 내용
      setData(res.data); //데이터 저장
      setBookstoreCount(res.data.length);
    })
    .catch( //실패시
      err=>console.log(err)
    )
  }

  //3. useEffect - 콤포넌트 생명주기에서 데이터를 한번만 불러와야...함.
  useEffect(()=>{
    loadData(); //비동기방식으로 함수실행
  },[])

  //4. 삭제를 위한 함수
  const deleteData=(code)=>{
    if(window.confirm('정말로 삭제하시겠습니까?')){
      axios
        .delete( `http://localhost:9070/bookstore/${code}`)
        .then(()=>{
          alert('삭제되었습니다.');
          loadData(); //삭제후 다시 목록을 갱신한다.
        });
    }
  };

  //5. 페이지 번호
  //페이지 계산공식 현재 게시물 수 56개 / 5 = 11페이지
    const indexOfLast = currentPage * itemsPerPage;
  
    //현재 페이지의 첫 인덱스 번호를 계산 10 - 5 = 5,
    const indexOfFirst = indexOfLast - itemsPerPage;
  
    //data 배열 중 현재 페이지에 해당하는 부분만 잘라냅니다. 
    //예: data.slice(5, 10) → data[5], data[6], data[7], data[8], data[9]만 화면에 표시.
    //const currentItems = data.slice(indexOfFirst, indexOfLast);
    const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  
    //전체 페이지 수 totalpage = Math.ceil(13 / 5) = 3, 무조건 올림
    //페이지 번호는 게시물이 13개 있는 경우 1, 2, 3까지 나오도록 한다.
    //const totalPage = Math.ceil(data.length/itemsPerPage);

    //검색시 1페이지부터 검색되어야
    const totalPage = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  
    //시작번호와 끝번호를 계산 해야 한다.
    let startPage = Math.max(1, currentPage-2);
    let lastPage = Math.min(totalPage, startPage + 4);
  
    //페이지 번호 배열 (1~5를 동적으로 변환되도록 변경해야, 또는 totalPages까지 제한 가능)
    // const pageNumbers = Array.from({length:Math.min(totalPage, 5)},(_,i) => i+1);
    const pageNumbers = Array.from({length:lastPage - startPage + 1}, (_,i)=> startPage+i);

    //검색버튼 클릭시 검색하게
    const handleSearch=()=>{
      setKeyword(inputKeyword);
      setCurrentPage(1);
    }

    //Enter키를 눌러도 검색되게
    const handleKeyDown=(e)=>{
      if(e.key==='Enter'){
        handleSearch(); //Search함수 실행
      }
    }

    //초기화
    const handleReset=()=>{
      setInputKeyword('');
      setKeyword('');
      setCurrentPage(1);
    }
  return (
    <main>
      <section>
        <h2>3. BOOKS DB 입력(C)/출력(R)/수정(U)/삭제(D)</h2>
        <p>* MYSQL DB에 있는 자료를 출력(SELECT)하고, 자료입력(INSERT), 삭제(DELETE), 수정(UPDATE)하기를 실습 응용한다. - CRUD</p>
        <p>* 검색기능 : 검색어를 입력 후 '검색'버튼을 클릭하면 검색이 되도록하고, 'Enter'키를 눌러도 검색이 되도록 함.</p>
        <p>* 초기화 버튼 : '초기화'버튼 클릭시 검색입력 박스에 내용이 초기화 되도록 함.</p>
        <p>&nbsp;</p>
        
        <table>
          <caption>BOOKS DB입력/출력/삭제/수정</caption>
          <thead>
            <tr>
              <th>코드</th>
              <th>서점명</th>
              <th>지역1</th>
              <th>지역2</th>
              <th>지역3</th>
              <th>주문개수</th>
              <th>주문자</th>
              <th>주문자 연락처</th>
              <th>편집</th>
            </tr>
          </thead>
          <tbody>
            {/* backend에서 db요청하여 결과를 json으로 받아서 map함수로 출력한다. */}
            {
              currentItems.length>0?(
                currentItems.map(item=>(
                //data.map(item=>(
                <tr key={item.code}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.area1}</td>
                  <td>{item.area2}</td>
                  <td>{item.area3}</td>
                  <td>{Number(item.book_cnt).toLocaleString()}</td>
                  <td>{item.owner_nm}</td>
                  <td>{item.tel_num}</td>
                  <td>
                    <button className="btn update_btn" onClick={()=>navigate(`/bookstore/bookstoreupdate/${item.code}`)}>수정</button>
                    &nbsp;
                    <button className="btn del_btn" onClick={()=>deleteData(item.code)}>삭제</button>
                  </td>
                </tr>
              ))
              ):(
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        
        {/* 글쓰기 버튼 */}
        <div className="btn_group">
          {/* 클릭시 url주소에 http://localhost:3000/books/create 나오게 하기 위함. */}
          <button className="btn write_btn" onClick={()=>navigate('./bookstorecreate')}>상품 등록</button>
        </div>

        {/* 페이지번호 */}
        <div
          style={{marginTop:'20px', textAlign:'center', width:'760px'}}
        >
          {/* 첫페이지일 경우 이전 버튼 안나오게 하기 */}
          {/* {currentPage > 1 &&(
            <button 
              onClick={()=>setCurrentPage(currentPage-1)}
            >이전</button>
          )} */}

          {/* 첫번째 페이지일 경우 이전 버튼이 숨겨지지 않고 비활성화되게 하기 */}
          {currentPage>1?
            <button
              onClick={()=>setCurrentPage(currentPage-1)}
              style={{
                color:'#333',
                marginRight: '5px',
                padding: '5px 10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#e0e0e0'
              }}
            >이전</button>:
            <button disabled
              style={{
                color:'#fff',
                marginRight: '5px',
                padding: '5px 10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#e0e0e0'
              }}
            >이전</button>
          }
          &nbsp;

          {/* 페이지 번호(1,2,3,4,5)가 출력되는 곳 */}
            {pageNumbers.map(number=>(
              <button
                key={number}
                style={{
                  marginRight: '5px',
                  backgroundColor: currentPage === number ? '#4caf50' : '#f0f0f0',
                  color: currentPage === number ? '#fff' : '#000',
                  padding: '5px 10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                onClick={()=>setCurrentPage(number)}
              >
                {number}
              </button>
            ))
          }

          {/* 방법1. 마지막 페이지에 다음 버튼 숨기기 */}
          {/* {currentPage<totalPage &&(
            <button
              onClick={()=>setCurrentPage(currentPage+1)}
            > 다음</button>
          )} */}

          {/* 방법2. 마지막 페이지에 다음 버튼 비활성화 시키기 */}
          {currentPage<totalPage?
            <button
              onClick={()=>setCurrentPage(currentPage+1)}
              style={{
                color:'#333',
                marginRight: '5px',
                padding: '5px 10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#e0e0e0'
              }}
            >다음</button>:
            <button disabled
              style={{
                color:'#fff',
                marginRight: '5px',
                padding: '5px 10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#e0e0e0'
              }}
            >다음</button>
          }
        </div>

        {/* 검색폼 */}
        <div style={{marginTop:'20px', textAlign:'center', width:'760px'}}>
          <input type="text" placeholder='상품명 검색'
            value={inputKeyword}
            onKeyDown={handleKeyDown}
            onChange={(e)=>{
              setInputKeyword(e.target.value);
            }}
            style={{
              width: '250px',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button onClick={handleSearch}
            style={{
              marginLeft: '10px',
              padding: '8px 15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#4caf50',
              color: '#fff',
              cursor: 'pointer'
            }}
          >검색</button>
          <button onClick={handleReset}
            style={{
              marginLeft: '5px',
              padding: '8px 15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#777',
              color: '#fff',
              cursor: 'pointer'
            }}
          >초기화</button>
        </div>
      </section>
    </main>
  );
}


export default BookStore;
