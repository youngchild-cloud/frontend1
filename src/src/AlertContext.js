import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [goodsCount, setGoodsCount] = useState(0);
  const [fruitsCount, setFruitsCount] = useState(0);
  const [bookstoreCount, setBookstoreCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  //페이지 로딩시 1번만 데이터 불러옴.
  useEffect(() => {
    axios.get('https://port-0-backend-express-server-mkvwe9x45fceba4b.sel3.cloudtype.app/goods')
      .then(res => setGoodsCount(res.data.length));
    axios.get('https://port-0-backend-express-server-mkvwe9x45fceba4b.sel3.cloudtype.app/fruits')
      .then(res => setFruitsCount(res.data.length));
    axios.get('https://port-0-backend-express-server-mkvwe9x45fceba4b.sel3.cloudtype.app/bookstore')
      .then(res => setBookstoreCount(res.data.length));
    axios.get('https://port-0-backend-express-server-mkvwe9x45fceba4b.sel3.cloudtype.app/question')
      .then(res => setQuestionCount(res.data.length));
  }, []);

  return (
    <AlertContext.Provider value={{
      goodsCount, setGoodsCount, fruitsCount, setFruitsCount, bookstoreCount, setBookstoreCount, questionCount, setQuestionCount
    }}>
      {children}
    </AlertContext.Provider>
  );
}