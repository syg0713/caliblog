import React, { useState, useEffect } from 'react';

const Signup = () => {
    const [ id, setId ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordCheck, setPasswordCheck ] = useState('');
    const [ term, setTerm ] = useState('');

    const onChangeId = e => {
        setId(e.target.value);
    } 
    const onChangePassword = e => {
        setPassword(e.target.value);
    }
    const onChangePasswordCheck = e => {
        setPasswordCheck(e.target.value);
    }
    const onChangeTerm = e => {
        setTerm(e.target.value);
    }   

    useEffect(() => {
        console.log(id,password,passwordCheck);
      }, [id,password,passwordCheck]);

    return <>
        <form>
            <div>아이디</div>
            <input type="text" value={id} required onChange={onChangeId}/>
            <div>비밀번호</div>
            <input type="password" value={password} required onChange={onChangePassword}/>
            <div>비밀번호 확인</div>
            <input type="password" value={passwordCheck} required onChange={onChangePasswordCheck}/>
            <button type="submit">가입하기</button>
            <input type="checkbox" name="xxx" value={term} required onChange={onChangeTerm}></input>
        </form>
    </>
};

export default Signup;