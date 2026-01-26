import React from 'react';

function Main(props) {
  return (
    <main>
      <h2>첫페이지- Main </h2> 
      <p>MYSQL DB에 있는 TABLE자료들을 React에서 불러와 입력/출력/수정/삭제 기능을 실습하기</p>
      <dl>
        <dt>기능 추가 사항</dt>
        <dd>1. create메뉴 : 새로운 페이지로 이동하여 자료 입력할 수 있도록 함.</dd>
        <dd>2. update메뉴 : 수정 페이지로 이동하여 자료 수정할 수 있도록 함.</dd>
        <dd>3. delete메뉴 : 해당 id값에 일치하는 자료 삭제 요청(axios.delete)</dd>
        <dd>4. 삭제 후 목록 다시 불러오기(자동 갱신)</dd>
        <dd>5. 테이블 하단에 페이지네이션 추가하여 '이전', '다음', '번호'클릭시 해당 기능구현 함.</dd>
        <dd>6. 검색폼을 하단에 추가하여 검색어 입력시 해당 자료가 출력이 되도록 함.(글입력시, 또는 검색 버튼 클릭시 실행되어야...)</dd>
        <dd>5. 데이터베이스(DB)에서 자료가 변경되면 자동을 인식하여 메뉴 목록 옆에 '숫자 뱃지'가 자동으로 카운트 되도록 하기</dd>
      </dl>
    </main>
  );
}

export default Main;