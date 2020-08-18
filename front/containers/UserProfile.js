import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from '../reducers/user';
import Router from 'next/router';

const UserProfile = () => {
    const { me } = useSelector( state => state.user );
    const dispatch = useDispatch();
    const onLogOut = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        })
        Router.push('/');
    })
    return (
        <div className="userProfile__container">
         <div className="identification">{ me.userId }</div>
         <div className="logOut"><button onClick={onLogOut} className="custom-button">로그아웃</button></div>
        </div>
    );
};

export default UserProfile;