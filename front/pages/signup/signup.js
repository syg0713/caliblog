import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from '../../reducers/user';
import './signup.scss';

// 커스텀 훅
export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [value, handler];
};

const Signup = () => {
    const [ id, onChangeId ] = useInput('');
    const [ password, onChangePassword ] = useInput('');
    const [ passwordCheck, onChangePasswordCheck ] = useInput('');
    const [ term, onChangeTerm ] = useInput('');
    const dispatch = useDispatch();
    // const { isSigningUp } = useSelector( state => state.user );

    // 커스텀 훅으로 코드 줄임
    // const [ id, setId ] = useState('');
    // const [ password, setPassword ] = useState('');
    // const [ passwordCheck, setPasswordCheck ] = useState('');
    // const [ term, setTerm ] = useState('');
    // const onChangeId = e => {
    //     setId(e.target.value);
    // };
    // const onChangePassword = e => {
    //     setPassword(e.target.value);
    // };
    // const onChangePasswordCheck = e => {
    //     setPasswordCheck(e.target.value);
    // };
    // const onChangeTerm = e => {
    //     setTerm(e.target.value);
    // };

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: SIGN_UP_REQUEST,
        })
        // console.log({
        //     id,
        //     password,
        //     passwordCheck,
        //     term,
        // });
    })

    useEffect(() => {
        console.log({
            id,
            password,
            passwordCheck,
            term,
        });
      }, [id,password,passwordCheck,term]);



    return <>
    <div className="signup">
        <form onSubmit={onSubmit}>
            <div>아이디
                <input type="text" value={id} required onChange={onChangeId} className="custom-input"/>
            </div>
            <div>비밀번호
                <input type="password" value={password} required onChange={onChangePassword} className="custom-input"/>
            </div>
            <div>비밀번호 확인
                <input type="password" value={passwordCheck} required onChange={onChangePasswordCheck} className="custom-input"/>
            </div>
            <div className="term">
                <label htmlFor="term__check">
                    <input type="checkbox" name="" value={term} required onChange={onChangeTerm} id="term__check"></input>
                    약관에 동의합니다.
                </label>
            </div>
            <button type="submit" className="custom-button">가입하기</button>
        </form>
    </div>
    </>
};

export default Signup;