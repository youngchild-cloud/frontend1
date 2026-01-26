import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {AlertContext} from '../AlertContext';

function Fruits(props) {
  // 1. 상태변수
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //초기값 1페이지
  const [inputKeyword, setInputKeyword] = useState(''); //검색어 입력용 
  const [keyword, setKeyword] = useState('');// 실제 검색에 사용될 키워드
  const {setFruitsCount} = useContext(AlertContext);

  //검색 버튼 클릭시 검색을 위한 함수
  const handleSearch =() => {
    setKeyword(inputKeyword); //검색단어 확정
    setCurrentPage(1);        //검색 시 항상 1페이지부터
  }

  //키보드 'Enter'키를 눌러도 검색이 되도록함.
  const handleKeyDown =(e)=>{
    if(e.key==='Enter'){
      handleSearch();
    }
  }

  //필터링 : 검색시 name(과일명)기준으로 검색
  const filterData = data.filter(item=>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  //검색폼에 입력된 데이터 초기화
  const handleReset =()=>{
    setInputKeyword(''); //입력값 초기화
    setKeyword('');     //검색 키워드 제거
    setCurrentPage(1); //첫페이지로 이동
  }

  //2. 한페이지에 보여줄 페이지 개수 
  const itemsPerPage = 5; //한페이지에 보여질 게시물 개수

  //글쓰기 버튼시 해당 콤포넌트 주소로 이동하기 위함
  const navigate = useNavigate();

  //2. 데이터 조회
  //1. 상품 리스트 조회(출력)
  const loadData=()=>{
    //React비동기 통신
    axios
    //DB에서 json데이터를 불러온다.
    .get('http://localhost:9070/fruits')
    //성공시 데이터를 변수에 저장
    .then(res=>{
      setData(res.data);
      setFruitsCount(res.data.length);
    })

    //실패시 에러 출력
    .catch(err=>console.log(err))
  }

	//함수를 작성하여 loadData(); 함수 호출
  useEffect(()=>{
    loadData(); //콤포넌트 실행시 한번만 데이터를 로딩
  },[]); //의존성 배열에 아무것도 없을 시 

  //1. 선택한 자료 삭제하기
  const deleteData=(num)=>{
    if(window.confirm('정말 삭제하시겠습니까?')){
      axios
        .delete(`http://localhost:9070/fruits/${num}`)
        .then(()=>{ //성공시
          alert('삭제되었습니다.');
          loadData(); //삭제후 다시 불러와서 목록을 새로고침
        })
        .catch(err=> console.log(err)); //오류시 에러 출력
      }
  };

  //페이지네이션 계산공식 만들기   게시물 50개 / 5개씩 보여주겠다 = 50/5 = 5개 페이지가 나와야
  //현재 페이지의 마지막 인덱스 번호 2*5=10 10번째 아이템까지 보여주겠다는 뜻
  const indexOfLast = currentPage * itemsPerPage;

  //현재 페이지의 첫 인덱스 번호를 계산 10-5=5, 5번째부터 9번째까지 아이템을 보여주겠다는 뜻
  const indexOfFirst = indexOfLast - itemsPerPage;

  //data배열 중 현재 페이지에 해당하는 부분만 잘라서 출력해야
  //예) data.slice(5, 10) -> data[5] ~ data[9]만 화면에 표시함

  //const currentItems = data.slice(indexOfFirst, indexOfLast);
  //수정 : 필터링된 데이터
  const currentItems = filterData.slice(indexOfFirst, indexOfLast);

  //전체 페이지수 totalpage = Math.ceil(13/5) = 3, 무조건 올림
  // const totalPage = Math.ceil(data.length/itemsPerPage);

  //수정 : 필터링된 데이터의 전체 페이지수
  // const totalPage = Math.ceil(filterData.length/itemsPerPage);

  //수정 : totalPage가 0되는 경우를 방지해야 해서 무조건 최소값 1
  const totalPage = Math.max(1, Math.ceil(filterData.length / itemsPerPage));
  
  //시작번호와 끝번호 계산하기
  let startPage = Math.max(1, currentPage-2);
  let endPage = Math.min(totalPage, startPage+4);

  //만약에 끝 페이지가 totalpage에 도달하면 시작페이지도 다시 수정
  startPage = Math.max(1, endPage - 4);

  //페이지 번호 배열(1~5까지 고정)
  const pageNumbers = Array.from({length:endPage - startPage + 1}, (_, i) => startPage+i);

  return (
    <main>
      <section>
        <h2>2. Fruits DB 입력(C)/출력(R)/수정(U)/삭제(D)</h2>
        <p>* MYSQL DB에 있는 자료를 출력(SELECT)하고, 자료입력(INSERT), 삭제(DELETE), 수정(UPDATE)하기를 실습 응용한다. - CRUD</p>
        <p>* 검색기능 : 검색어를 입력 후 '검색'버튼을 클릭하면 검색이 되도록하고, 'Enter'키를 눌러도 검색이 되도록 함.</p>
        <p>* 초기화 버튼 : '초기화'버튼 클릭시 검색입력 박스에 내용이 초기화 되도록 함.</p>

        <br />

        <table className="data_list2">
          {/* <caption>fruits data map함수로 출력하기</caption> */}
          <thead>
            <tr>
              <th>번호</th>
              <th>과일명</th>
              <th>가격</th>
              <th>색상</th>
              <th>원산지</th>
              <th>편집</th>
            </tr>
          </thead>
          <tbody>
            { 
            // 삼항조건연산자를 사용하여 조회된 데이터 개수가 0보다 크면 출력되게함
              currentItems.length>0?(
                currentItems.map(item=>(
                <tr key={item.num}>
                  <td>{item.num}</td>
                  <td>{item.name}</td>
                  <td>{Number(item.price).toLocaleString()}</td>
                  <td>{item.color}</td>
                  <td>{item.country}</td>
                  <td>
                    <button className="btn update_btn" onClick={()=>
                      navigate(`/fruits/fruitsupdate/${item.num}`)}>수정</button>
                    &nbsp;<button className="btn del_btn" onClick={()=>deleteData(item.num)}>삭제</button>
                  </td>
                </tr>
              ))
              ):(
                //조회된 결과가 0(없으면) 검색결과 없다라고 표시함.
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>

        {/* 글쓰기 버튼 */}
        <div className="btn_group">
          <button onClick={()=>navigate('/fruits/fruitscreate')} className="btn write_btn">글쓰기</button>
        </div>
        
        {/* 페이지 번호 출력 */}
        <div style={{marginTop:'20px', textAlign:'center', width:'760px'}}>

          {/* 
            이전 버튼이 숨겨지는 내용
          {currentPage>1&&(
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
            >이전</button>
          )} */}

          {/* 이전 버튼이 숨겨지지 않고 비활성화되게 하기 */}
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

          {/*
            조건부 렌더링 공식 => 값이 참인 경우 && 실행할 값
            삼항조건연산자     => 조건식?참인값:거짓인값 
          */}
            
            {/* 페이지 번호 출력하기 */}
            {pageNumbers.map(number=>(
              <button 
                key={number}
                style={{
                  marginRight: '5px',
                  backgroundColor: currentPage === number ? '#4caf50' : '#f0f0f0',
                  color: currentPage === number ? '#fff' : '#333',
                  padding: '5px 10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                onClick={()=>setCurrentPage(number)}
              >{number}</button>
            ))}
          
          {/* 다음 버튼 - currentPage가 totalPage보다 작을 때 나와야 */}
          {/* 
              마지막 페이지 일 경우 다음 버튼이 사라짐
            {currentPage<totalPage && (
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
            >다음</button>
          )} */}

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

        {/* 키워드 검색폼 */}
        <div style={{width:'760px',marginTop:'30px',textAlign:'center'}}>

          {/* 1. 검색창에 검색단어를 입력하고 검색버튼 클릭시 검색되게하기 */}
          <input type="text" placeholder='상품명 검색'
            value={inputKeyword}
            onKeyDown={handleKeyDown}
            onChange={(e)=>setInputKeyword(e.target.value)}
            style={{
              width: '250px',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              marginLeft: '10px',
              padding: '8px 15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#4caf50',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            검색
          </button>
          <button
            onClick={handleReset}
            style={{
              marginLeft: '5px',
              padding: '8px 15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#777',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            초기화
          </button>
        </div>
      </section>
    </main>
  );
}

export default Fruits;