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
      <div className="nav">
        <div className="home"><Link href="/"><a>HOME</a></Link></div>
        <div className="profile"><Link href="/profile/profile"><a>프로필</a></Link></div>
        <div className="search">
          <input type="text" placeholder="검색어를 입력해주세요."/>
          <button>검색</button>
        </div>
      </div>
      <div className="content">
        <div className="private">
          {me
          ? <UserProfile />
          : <LoginForm />}
        </div>
        <div className="render">
          {children}
        </div>
      </div>
    </>
  );
};


AppLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppLayout;
