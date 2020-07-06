import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';
import Router from 'next/router';
import './PostForm.scss';

const PostForm = () => {
    const dispatch = useDispatch();
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const { postAdded } = useSelector(state => state.post);
    
    useEffect(() => {
        if (postAdded) {
            setTitle('');
            setContent('');
        }
    }, [postAdded]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if ( !title || !title.trim()){
            return alert('제목을 작성하세요.');
        }
        if ( !content || !content.trim()){
            return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();
        formData.append('content', title);
        formData.append('content', content);
        console.log(title, content, formData);
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        })
        Router.push('/');
    }, [ title, content ]);

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    const onChangeContent = useCallback((e) => {
        setContent(e.target.value);
    }, []);


    return (
        <>
            <form action="" onSubmit={onSubmit}>
                <textarea type="text" placeholder="제목" cols="93" rows="1" value={title} onChange={onChangeTitle}/>
                <textarea type="text" name="content" title="내용 입력" cols="93" rows="28" value={content} onChange={onChangeContent}/>
                <button type="submit">제출하기</button>
            </form>
        </>
    );
};

export default PostForm;