import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import './AppLayout.scss';
import UserProfile from '../containers/UserProfile';
import LoginForm from '../containers/LoginForm';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_USER_REQUEST } from '../reducers/user';


const AppLayout = ({ children }) => {
  const { me } = useSelector( state => state.user );
  const dispatch = useDispatch();
  const enterRef = useRef();

  const [ keyword, setKeyword ] = useState("");
  const onChangeSearch = useCallback((e) => {
    setKeyword(e.target.value);
  },[])
  
  useEffect(() => {
    // console.log(search);
  },[keyword]);

  const onKeyPress = ( e ) => {
    if( event.keyCode==13 ) {
      enterRef.current.click();
    }
  }
  return (
    <>
      <header className="navigation" role="header">
        <div className="home"><Link href="/"><a>HOME</a></Link></div>
        <div className="profile"><Link href="/profile"><a>프로필</a></Link></div>
        <div className="search">
          <input type="text" placeholder="검색어를 입력해주세요." className="custom-input" value={keyword} onChange={onChangeSearch} onKeyPress={onKeyPress}/>
          <Link
            href={{ pathname: '/search', query: { keyword } }}
            as={`/search/${keyword}`}
          >
            <a ref={enterRef}>
              <button className="custom-button">검색</button>
            </a>
          </Link>
        </div>
      </header>
      <section className="content">
        <div className="privateMenu">
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
