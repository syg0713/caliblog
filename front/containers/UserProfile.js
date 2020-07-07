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
        <>
         <div className="identification">{ me.userId }</div>
         <div className="logOut"><button onClick={onLogOut}>로그아웃</button></div>
        </>
    );
};

export default UserProfile;