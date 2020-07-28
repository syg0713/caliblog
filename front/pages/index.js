import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../components/Title';
import Router from 'next/router';
import { 
    LOAD_MAIN_POSTS_REQUEST,
    LOAD_MAIN_POSTS_ALL_REQUEST,
} from '../reducers/post';
import Pagination from '../components/Pagination';

const Home = () => {
    const { me } = useSelector( state => state.user );
    const { mainPosts, mainPostsAll, start, end } = useSelector( state => state.post );
    const dispatch = useDispatch();
    const onTogglePost = useCallback(() => {
        if( !me ) {
            alert('로그인이 필요합니다.');
        } else {
            Router.push('/PostForm');
        }
    })
    console.log(mainPosts)

    // useEffect(() => {
    // console.log(mainPosts.length);
    // },[mainPosts.length])

    const per = 10;
    const dbPostsAll = mainPostsAll;
    const total = Math.ceil( dbPostsAll / per );
    const array = [];
    for ( let i=0; i<total; i++ ) {
        array.push( i+1);
    }
    const target = array.slice( start, end );
    return (
        <>
            <button type="button" onClick={onTogglePost} className="custom-button">글 쓰기</button>
            {mainPosts.map((item) => {
                return (
                    <Title key={item.id} post={item}/>
                );
            })}
            { target.map( val => (
                <Pagination val={val} />
            ))}
        </>
    );
};
// getInitialProps
Home.getInitialProps = async ( context ) => {
    context.store.dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_MAIN_POSTS_ALL_REQUEST,
    });
};
export default Home;