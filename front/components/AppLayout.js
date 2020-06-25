import React, { useState } from 'react';
import Link from 'next/link';
import './AppLayout.scss';
import UserProfile from '../containers/UserProfile';
import LoginForm from '../containers/LoginForm';
import PropTypes from 'prop-types';


const AppLayout = ({ children }) => {
  const [ me, setMe ] = useState('');
  return (
    <>
      <header className="navigation" role="header">
        <div className="home"><Link href="/"><a>HOME</a></Link></div>
        <div className="profile"><Link href="/profile/profile"><a>프로필</a></Link></div>
        <div className="search">
          <input type="text" placeholder="검색어를 입력해주세요." className="custom-input"/>
          <button className="custom-button">검색</button>
        </div>
      </header>
      <section className="content">
        <div className="private-menu">
          {me
          ? <UserProfile />
          : <LoginForm />}
        </div>
        <div className="main" role="main">
          {children}
        </div>
      </section>
    </>
  );
};


AppLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppLayout;
