import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';
import Router from 'next/router';
import './PostForm.scss';

const PostForm = () => {
    const dispatch = useDispatch();
    const [ text, setText ] = useState('');
    const { postAdded } = useSelector(state => state.post);
    
    useEffect(() => {
        if (postAdded) {
            setText('');
        }
    }, [postAdded]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if ( !text || !text.trim()){
            return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();
        formData.append('content', text);
        console.log(text, formData);
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        })
        Router.push('/');
    }, [ text ]);

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
      }, []);

    return (
        <>
            <form action="" onSubmit={onSubmit}>
                <textarea id="textbox" name="content" title="내용 입력" cols="93" rows="28" value={text} onChange={onChangeText}/>
                <button type="submit">제출하기</button>
            </form>
        </>
    );
};

export default PostForm;