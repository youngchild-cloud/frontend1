import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css'; //서식
import Main from './Main'; //메인 콤포넌트
import Goods from './components/Goods'; //불러올 콤포넌트
import GoodsCreate from './components/GoodsCreate'; //불러올 콤포넌트
import GoodsUpdate from './components/GoodsUpdate'; //불러올 콤포넌트
import Fruits from './components/Fruits';//과일정보 
import FruitsCreate from './components/FruitsCreate'; //불러올 콤포넌트
import FruitsUpdate from './components/FruitsUpdate'; //불러올 콤포넌트
import BookStore from './components/BookStore';//북스토어 
import BookStoreCreate from './components/BookStoreCreate'; //불러올 콤포넌트
import BookStoreUpdate from './components/BookStoreUpdate'; //불러올 콤포넌트
import Noodle from './components/Noodle'; //Noodle
import NoodleCreate from './components/NoodleCreate'; //NoodleCreate
import NoodleUpdate from './components/NoodleUpdate'; //NoodleUpdate
import Question from './components/Question'; //Question
import Login from './components/Login'; //Login
import Join from './components/Join'; //Join

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <h1>Frontend(React) + Backend(MySQL) Setting, DB데이터 입력(C)/수정(U)/출력(R)/삭제(D)</h1>
          <nav>
            <ul>
              <li><Link to="/">Main</Link></li>
              <li><Link to="/goods">Goods</Link></li>
              <li><Link to="/fruits">Fruits</Link></li>
              <li><Link to="/bookstore">BookStore</Link></li>
              <li><Link to="/noodle">Noodle</Link></li>
              <li><Link to="/question">Contact US</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/goods' element={<Goods />} />
          <Route path='/goods/goodscreate' element={<GoodsCreate />} />
          <Route path='/goods/goodsupdate/:g_code' element={<GoodsUpdate />} />
          <Route path='/fruits/' element={<Fruits />}/>          
          <Route path='/fruits/fruitscreate/' element={<FruitsCreate />}/>          
          <Route path='/fruits/fruitsupdate/:num' element={<FruitsUpdate />}/>    

          <Route path='/bookstore/' element={<BookStore />}/>
          <Route path='/bookstore/bookstorecreate' element={<BookStoreCreate />}/>
          <Route path='/bookstore/bookstoreupdate/:code' element={<BookStoreUpdate />}/>

          <Route path='/noodle/' element={<Noodle />}/>
          <Route path='/noodle/noodlecreate' element={<NoodleCreate />}/>
          <Route path='/noodle/noodleupdate/:code' element={<NoodleUpdate />}/>

          <Route path='/question' element={<Question />} />

          {/* path주소에 적힌 주소명이 url주소뒤에 붙는 이름, 불러올 콤포넌트 명은 element에 작성 */}
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
          
        </Routes>

        <footer>
          <address>Copyright&copy;2025 React Frontend_Backend + MySQL allrights reserved.</address>
        </footer>
      </BrowserRouter>
    </>
  );
}
export default App;