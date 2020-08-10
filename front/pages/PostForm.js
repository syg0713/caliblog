import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';
import PropTypes from 'prop-types';
import Router from 'next/router';
import './PostForm.scss';
// import img from '../assets/imgUpload.png';

const PostForm = () => {
    const dispatch = useDispatch();
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const { imagePaths, postAdded } = useSelector(state => state.post);
    const imageInput = useRef();

    useEffect(() => {
        if ( postAdded ) {
            Router.push('/');
            setTitle('');
            setContent('');
        }
    }, [ postAdded ]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if ( !title || !title.trim()){
            return alert('제목을 작성하세요.');
        }
        if ( !content || !content.trim()){
            return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();
        imagePaths.forEach((i) => {
            formData.append('image', i);
        });
        formData.append('title', title);
        formData.append('content', content);
        console.log(title, content, formData);
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        })
    }, [ title, content ]);

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    const onChangeContent = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    const onChangeImages = useCallback((e) => {
        console.log(e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onRemoveImage = useCallback(index => () => {
        dispatch({
            type: REMOVE_IMAGE,
            index,
        });
    }, []);

    return (
        <>
            <form action="" onSubmit={onSubmit} className="postForm__container" encType="multipart/form-data">
                <textarea type="text" placeholder="제목" cols="93" rows="1.5" value={title} onChange={onChangeTitle}/>
                <div>
                    <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}/>
                    <button className="custom-button" onClick={onClickImageUpload}>이미지 업로드</button>
                </div>
                <div>
                    <textarea type="text" name="content" title="내용 입력" cols="93" rows="28" value={content} onChange={onChangeContent}/>
                </div>
                <div>
                    <button type="submit" className="custom-button">제출하기</button>
                </div>
                <div>
                    {imagePaths.map(( v, i ) => (
                        <div key={v}>
                            <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }}alt={v} />
                            <div>
                                <div className="custom-button" onClick={onRemoveImage(i)}>제거</div>
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </>
    );
};

PostForm.propTypes = {
    
}

export default PostForm;