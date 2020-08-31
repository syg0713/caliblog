import React from 'react';
import Link from 'next/link';
import UserProfile from '../components/UserProfile';
import LoginForm from './LoginForm';
import SearchInput from './SearchInput';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';


const AppLayout = ({ children }) => {
  const { me } = useSelector( state => state.user );
  const dispatch = useDispatch();

  return (
    <>
      <header className="navigation" role="header">
        <div className="home"><Link href="/"><a>HOME</a></Link></div>
        <div className="profile"><Link href="/profile"><a>프로필</a></Link></div>
        <SearchInput  />
      </header>
      <section className="content">
        <div className="privateMenu">
          { me
            ? <UserProfile />
            : <LoginForm />
          }
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
