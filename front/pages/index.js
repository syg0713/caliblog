import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from './PostForm';
import PostCard from '../containers/PostCard';
import Router from 'next/router';
// import Link from "next/link";
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const { me } = useSelector( state => state.user );
    const { mainPosts, postAdded } = useSelector( state => state.post );
    // const [ postFormOpened, setPostFormOpened] = useState(false);
    const dispatch = useDispatch();
    
    const onTogglePost = useCallback(() => {
        if( !me ) {
            alert('로그인이 필요합니다.');
        } else {
            Router.push('/PostForm');
        }
    })
    // useEffect(() => {
    //     if ( postAdded ) {
    //         setPostFormOpened(false);
    //     }
    // },[postAdded])
    return (
        <>
            <button type="button" onClick={onTogglePost} className="custom-button">글 쓰기</button>
            {/* { me && postFormOpened && (
                <PostForm />
            )} */}
            {mainPosts.map((c) => {
                return (
                <PostCard key={c.id} post={c} />
                );
            })}
        </>
    );
};

export default Home;