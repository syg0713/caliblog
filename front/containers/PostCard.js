import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { REMOVE_POST_REQUEST, POST_DELETE_DONE } from '../reducers/post';
import Rating from '../components/Rating';
// import './PostCard.scss';

const PostCard = ({ postId }) => {
    const { singlePost, postDeleted } = useSelector(state => state.post);
    const { me } = useSelector( state => state.user);
    const dispatch = useDispatch();

    const menuRef = useRef();
    const deleteRef = useRef();
    const modifyRef = useRef();

    useEffect(() =>{
        // console.log(singlePost.Images[0].src);
        if( postDeleted ) {
            Router.push('/');
            dispatch({
                type: POST_DELETE_DONE,
            })
        }
    },[ postDeleted, singlePost ])

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

    const dummy = [
        {
        image: 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg',
        id: 1,
        content: 'Lorem1',
        rating: 4
        },
        // {
        // image: 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg',
        // id: 2,
        // content: 'Lorem2',
        // rating: 1
        // },
        // {
        // image: 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg',
        // id: 3,
        // content: 'Lorem3',
        // rating: 2
        // },
    ]
    
    return (
            <div className="postCard__container">
                <section className="head">
                    <div className="head__headLine">
                        { singlePost.title }
                    </div>
                    <button className="head__menu custom-button" ref={ menuRef } onClick={showMenu}>
                            ...
                            <div>
                                <div className="remove" ref={ deleteRef } onClick={deleteConfirm}>삭제</div>
                                <div className="cancel" ref={ modifyRef }>수정</div>
                            </div>
                    </button>
                </section>
                <div>
                    { singlePost.User.userId }
                </div>
                <div>
                {singlePost.Images && singlePost.Images[0] && <img src={ `http://localhost:3065/${singlePost.Images[0].src}` } style={{ maxWidth: '800px' }} alt=""/>}
                </div>
                <div>
                    { singlePost.content }
                </div>

                {dummy.map((v) => {
                    return(
                        <div>
                            <div><img src={v.image} alt=""/></div>
                            <div>{v.id}</div>
                            <div>{v.content}</div>
                            <Rating star={v.rating} />
                        </div>
                    )
                })}
            </div>

    );
};

PostCard.propTypes = {
    postId: PropTypes.number.isRequired,
};

export default PostCard;