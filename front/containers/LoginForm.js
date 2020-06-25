import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';
import { LOG_IN_REQUEST } from '../reducers/user';
import './LoginForm.scss';
import { useInput } from "../pages/signup/signup";


const LoginForm = () => {
    const [ id, onChangeId ] = useInput("");
    const [ password, onChangePassword ] = useInput("");
    const dispatch = useDispatch();
    
    const onSubmitForm = useCallback((e) => {
      e.preventDefault();
        dispatch({
            type:LOG_IN_REQUEST,
            data:{
                id,
                password
            }
        },[id, password])
    })


    return (
        <form onSubmit={onSubmitForm}>
            <div className="identity">
                아이디
                <input type="text" value={id} onChange={onChangeId} required className="custom-input"/>
            </div>
            <div className="password">
                비밀번호
                <input type="password" value={password} onChange={onChangePassword} required className="custom-input"/>
            </div>
            <div className="buttons">
                <button type="submit" className="custom-button">로그인</button>
                <Link href="/signup/signup"><a><button className="custom-button">회원가입</button></a></Link>
            </div>
        </form>
    );
};

export default LoginForm;