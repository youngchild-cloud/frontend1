import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

const Goods=()=> {
  //json데이터 값, url주소값 변수
  const [data, setData] = useState([]); //json데이터 받기 위해
  const navigate = useNavigate(); //url주소 가져오기 위해

  //검색어 입력에 사용할 키워드 변수
  //const [inputKeyword, setInputKeyword] = useState('');

  //0. 페이지 상태 변수 선언
  const [currentPage, setCurrentPage] = useState(1); //초기값 1
  const itemsPerPage = 5; //한 페이지당 보여지는 게시물 수
  const [keyword, setKeyword] = useState(''); //키워드 상태변수

  const {setGoodsCount} = useContext(AlertContext);

  //g_name검색어가 포함된 데이터만 필터링
  const filteredData = data.filter(item =>
    item.g_name.toLowerCase().includes(keyword.toLowerCase())
  );
    
  //1. 상품 리스트 조회(출력)
  const loadData=()=>{
    //비동기 통신 사용
    axios
    .get('http://localhost:9070/goods')
    //성공시 데이터를 저장
    .then(res=>{
      setData(res.data);
      setGoodsCount(res.data.length);
    })
    //실패시 에러 출력
    .catch(err=>console.log(err))
  }

  //2. 콤포넌트 생성시 한번만 데이터 불러오기
  useEffect(()=>{
    loadData();
  },[])

  //3. deleteData 함수 = 해당 g_code에 대한 자료 삭제하기 
  const deleteData =(g_code)=>{ //매개변수로 g_code값 받는다.
    if(window.confirm('정말 삭제하시겠습니까?')){
      axios //서버에 delete 요청을 전송
        .delete(`http://localhost:9070/goods/${g_code}`)
        //성공일때 아래 내용을 실행함.
        .then(()=>{
          alert('데이터가 성공적으로 삭제되었습니다.');
          loadData(); //데이터 삭제가 이루어지면 목록 다시 갱신해야 함.
        })
        //실패일 경우
        .catch(err=> console.log(err));
    }
  };

  //4. 페이지네이션 계산  - 현재 게시물 수 50 / 5 = 10페이지
  //현재 페이지의 마지막 인덱스 번호 2*5=10 10번째 아이템까지 보여주겠다는 뜻.
  const indexOfLast = currentPage * itemsPerPage;

  //현재 페이지의 첫 인덱스 번호를 계산 10-5=5, 5번째부터 9번째 아이템까지 보여줍니다.
  const indexOfFirst = indexOfLast - itemsPerPage;

  //예: data.slice(5, 10) → data[5], data[6], data[7], data[8], data[9]만 화면에 표시.
  //const currentItems = data.slice(indexOfFirst, indexOfLast);

  //수정 - 검색결과를 가지고 페이지네이션을 다시 새로 표시함.
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

   //전체 페이지 수 totalpage = Math.ceil(13 / 5) = 3, 무조건 올림
   //예) 페이지 번호는 게시물이 13개 있는 경우 1,2,3까지 나오도록 한다.
  //const totalPage = Math.ceil(data.length/itemsPerPage);

  //수정. 페이지네이션을 기준으로 filteredData변경함
  //totalPage가 0 되는 경우 방지해야
  const totalPage = Math.ceil(filteredData.length / itemsPerPage);

  //필터링 구현

  //검색어 입력 조회시 내용 변경해야
  // const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  // const totalPage = Math.max(Math.ceil(filteredData.length / itemsPerPage));

  //시작번호와 끝번호 계산
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, startPage + 4);

  //만약 끝 페이지가 totalPage에 도달했으면, 시작 페이지도 다시 보정
  startPage = Math.max(1, endPage - 4);

  //페이지 번호 배열(1-5고정, 또는 totalPages까지 제한 1,2,3,4,5)
  const pageNumbers = Array.from({length:endPage-startPage+1}, (_, i)=> startPage+i);

  //검색

  //검색 초기화

  //enter키를 누르면 검색 실행

  return (
    <main>
      <section>
        <h2>1. Goods DB 입력(C)/출력(R)/수정(U)/삭제(D)</h2>
        <p>MYSQL DB에 있는 자료를 출력(SELECT)하고, 자료입력(INSERT), 삭제(DELETE), 수정(UPDATE)하기를 실습 응용한다. - CRUD</p>
        <br />

        <h3>기능 추가 사항</h3>
        <ol>
          <li>1. create메뉴 : 새로운 페이지로 이동하여 자료 입력할 수 있도록 함.</li>
          <li>2. update메뉴 : 수정 페이지로 이동하여 자료 수정할 수 있도록 함.</li>
          <li>3. delete메뉴 : 해당 id값에 일치하는 자료 삭제 요청(axios.delete)</li>
          <li>4. 삭제 후 목록 다시 불러오기(자동 갱신)</li>
          <li>5. 페이지네이션(Pagination)</li>
          <li>6. 글등록, 삭제시 해당 상태값을 불러와 ConText표시하기</li>
        </ol>

        <br />
        <h3>페이지네이션(Pagination)</h3>
        <p>
          페이지네이션(Pagination)은 웹이나 앱에서 많은 양의 데이터를 페이지 단위로 나눠서 보여주는 방식으로, 사용자가 콘텐츠를 쉽게 탐색하고 관리할 수 있도록 돕는 UI 디자인 기법입니다. 데이터가 많을 때 한 번에 모든 데이터를 보여주지 않고, 페이지별로 나누어 보여줌으로써 '사용자 경험을 향상'시키고 '서버의 부담'을 줄일 수 있습니다. 
        </p>
        <br />

        <h3>페이지네이션(Pagination) 주요 기능</h3>
        <ol>
          <li>1. 데이터 분할 : 많은 양의 데이터를 여러 페이지로 나누어 보여준다.</li>
          <li>2. 페이지 이동 : 페이지 번호 링크를 통해 사용자가 원하는 페이지를 볼 수 있다.</li>
          <li>3. 현재 페이지 표시 : 현재 사용자가 보고 있는 페이지를 강조표시(굵게)하여 사용자가 현재 위치를 쉽게 파악할 수 있다.</li>
          <li>4. 페이지간 이동 : 이전페이지, 다음 페이지 등으로 이동할 수 있는 링크기능을 제공한다.</li>
          <li>5. 페이지당 게시물 개수 조정 : 사용자가 원하는 페이지당 항목 수를 선택할 수 있도록 옵션을 제공할 수 있다.</li>
          <li>6. 페이지네이션은 사용자의 경험 향상, 서버 부담 감소, UI디자인의 단순화 장점이 있다.</li>
        </ol>
        <br />
      
        <h3>검색기능</h3>
        <ol>
          <li>1. 검색어 입력 양식(폼)을 추가</li>
          <li>2. 검색어 input박스를 추가하고 검색단어 입력시 현재 페이지에서 데이터 검색하기</li>
          <li>3. 검색 필터링된 데이터 만들기</li>
          <li>4. 페이지네이션 기준을 filteredData로 변경(기존 내용 수정)</li>
          <li>5. 검색 결과가 없을 경우 메세지 나오게하기</li>
          <li>6. 검색버튼 클릭시에만 검색이 되도록 함.(위 내용은 검색어만 입력해도 검색되도록 한 것임)</li>
          <li>7. 검색어 input 박스에 검색단어 입력 후 'enter'키를 눌러도 검색이 되도록 함.</li>
          <li>8. 검색어 초기화 하기</li>
        </ol>

        <p>아래 GOODS데이터는 검색어를 입력시 바로 검색결과가 나오도록 함.</p>
        <br />

        <table className="data_list">
          <thead>
            <tr>
              <th>코드번호</th>
              <th>상품명</th>
              <th>상품가격</th>
              <th>편집</th>
            </tr>
          </thead>
          <tbody>
            {
              // 삼항조건 연산자를 사용하여 검색된 결과가 0보다 크면 출력되도록해야
              currentItems.length>0?(
                currentItems.map(item=>(
                //data.map(item=>(
                <tr key={item.g_code}>
                  <td>{item.g_code}</td>
                  <td>{item.g_name}</td>
                  <td>{Number(item.g_cost).toLocaleString()}</td>
                  <td>
                    
                    <button className="btn update_btn" onClick={() => navigate(`/goods/goodsupdate/${item.g_code}`)}>수정</button>

                    &nbsp;
                  <button className="btn del_btn" onClick={()=>deleteData(item.g_code)}>삭제</button>
                  </td>
                </tr>
              ))
              ):(<tr><td colspan="4">검색 결과가 없습니다.</td></tr>)             
            }
          </tbody>
        </table>

        {/* 상품등록 */}
        <div className="btn_group">
          <button onClick={()=>navigate(`/goods/goodscreate`)} className="btn write_btn">상품등록</button>
        </div>

        {/* 페이지네이션 */}
        <div style={{marginTop:'20px',textAlign:'center', width:'760px'}}>

          {/* 이전버튼 */}

            {/* 조건에 맞을 경우 버튼 나오게 함. 
              {currentPage>1 && <button>이전</button>} 
            */}

            {/*방법1.  <button 
              onClick={()=>setCurrentPage(currentPage-1)}
              style={{color:'#333',marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc', borderRadius:'4px',backgroundColor:'#e0e0e0'}}>
              이전
            </button> */}

            {/* 방법2. */}
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

            {/* 페이지번호 배열 1,2,3,4,5 */}
            {pageNumbers.map(number=>(
              <button 
              key={number} 
              onClick={()=>setCurrentPage(number)}
              style={{
                marginRight:'5px',
                backgroundColor:currentPage===number?'#4caf50':'#f0f0f0',padding:'5px 10px', border:'1px solid #ccc',borderRadius:'4px',
                color:currentPage===number?'#fff':'#333'
                }}>
                {number}
              </button>
            ))}

            {/* 조건에 맞을 경우 다음 버튼 나오게 함.
            {currentPage<totalPage && <button>다음</button>}
            */}

            {/* 다음버튼 */}
            {/* 아래 방법은 무조건 버튼이 눌려짐(첫페이지던, 마지막페이지던 상관없이 - 클릭 못하게 하거나 안보이게 해야....)          
            <button 
              onClick={()=>setCurrentPage(currentPage+1)}
              style={{color:'#333',marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc', borderRadius:'4px',backgroundColor:'#e0e0e0'}}>
              다음
            </button> */}

            {/* 삼항조건연산자로 버튼 나오게/숨기게 함. */}
            {
            currentPage<totalPage?
              <button 
                onClick={()=>{
                  setCurrentPage(currentPage+1)
                }}
                style={
                  {color:'#333',
                    marginRight:'5px',
                    padding:'5px 10px', 
                    border:'1px solid #ccc', borderRadius:'4px',backgroundColor:'#e0e0e0'}
                }
              >다음</button> :
              <button
                disabled
                style={
                  {color:'#fff',marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc', borderRadius:'4px',backgroundColor:'#e0e0e0'}
                }
              >다음</button>
            }
        </div>

        {/* 키워드 검색폼 */}
        <div style={{width:'760px',marginTop:'30px',textAlign:'center'}}>

          {/* 1. 검색창에 검색단어만 입력해도 바로 검색되는 양식 */}
          <input type="text" placeholder='상품명 검색'
            value={keyword}
            onChange={(e)=>{
              setKeyword(e.target.value);
              setCurrentPage(1);//검색은 항상 1페이지부터
            }}
            style={{
              width:'250px',
              padding:'8px',
              border:'1px solid #ccc',
              borderRadius:'4px'
            }}
          />
        </div>
      </section>
    </main>
  );
}

export default Goods;