import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';
import { LOG_IN_REQUEST } from '../reducers/user';
import './LoginForm.scss';

export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [value, handler];
};

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
                ID
                <input type="text" value={id} onChange={onChangeId} required/>
            </div>
            <div className="password">
                PASSWORD
                <input type="password" value={password} onChange={onChangePassword} required/>
            </div>
            <div className="buttons">
                <button type="submit">로그인</button>
                <button><Link href="/signup/signup"><a>회원가입</a></Link></button>
            </div>
        </form>
    );
};

export default LoginForm;