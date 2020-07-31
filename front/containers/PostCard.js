import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_POST_REQUEST, POST_DELETE_DONE } from '../reducers/post';
import PropTypes from 'prop-types';
import Router from 'next/router';
// import './PostCard.scss';

const PostCard = ({ postId }) => {
    const { singlePost, postDeleted } = useSelector(state => state.post);
    const { me } = useSelector( state => state.user);
    const dispatch = useDispatch();

    const menuRef = useRef();
    const deleteRef = useRef();
    const modifyRef = useRef();

    useEffect(() =>{
        if( postDeleted ) {
            Router.push('/');
            dispatch({
                type: POST_DELETE_DONE,
            })
        }
    },[ postDeleted ])

    const showMenu = useCallback(() => { // 메뉴창 토글
        if ( me.id === singlePost.User.id) {
            const activated = menuRef.current.classList.contains('active');
            if ( !activated ) {
                menuRef.current.classList.add('active');
            } else {
                menuRef.current.classList.remove('active');
            } 
        } else {
            menuRef.current.classList.remove('active');
        }
    },[ me.id, singlePost.User.id ])

    const deleteConfirm = useCallback(() => {
        if (confirm("정말 삭제하시겠습니까??") == true){ // 삭제 확인
            dispatch({
                type: REMOVE_POST_REQUEST,
                data: postId,
            })
        }else{ //취소
            return false;
        }
    },[ postId.id ])

    return (
            <div className="postCard__container">
                <section className="head">
                    <div className="head__headLine">
                        { singlePost.title }
                    </div>
                    <button className="head__menu custom-button" ref={menuRef} onClick={showMenu}>
                            ...
                            <div>
                                <div className="remove" ref={deleteRef} onClick={deleteConfirm}>삭제</div>
                                <div className="cancel" ref={modifyRef}>수정</div>
                            </div>
                    </button>
                </section>

                <div>
                    { singlePost.User.userId }
                </div>
                <div>
                    <img src={ singlePost.img } alt=""/>
                </div>
                <div>
                    { singlePost.content }
                </div>
            </div>

    );
};

PostCard.propTypes = {
    postId: PropTypes.number.isRequired,
};

export default PostCard;