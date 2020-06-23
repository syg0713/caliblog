import React from 'react';
import Link from 'next/link';
import './AppLayout.scss';


const AppLayout = ({ children }) => {

  return (
    <>
      <div className="wrapper">
          <div className="home">CALI</div>
          <div className="search">
            <input type="text" placeholder="검색어를 입력해주세요."/>
            <button>검색</button>
          </div>
      </div>
      {children}
    </>
  );
};

export default AppLayout;
