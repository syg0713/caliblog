import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import Title from '../components/Title';
import Pagination from '../components/Pagination';
import { LOAD_MAIN_POSTS_REQUEST, UPDATE_START_END_PAGE, UPDATE_LAST_PAGE } from '../reducers/post';

const Home = () => {
    const { me } = useSelector( state => state.user );
    const { mainPosts, mainPostsAll, start, end, current } = useSelector( state => state.post );
    const dispatch = useDispatch();
    const onTogglePost = useCallback(() => {
        if( !me ) {
            alert('로그인이 필요합니다.');
        } else {
            Router.push('/PostForm');
        }
    })



    // const updateLastPage = useCallback(() => {
    //     if ( start ) {
    //         dispatch({
    //             type: UPDATE_LAST_PAGE,
    //             payload: { start },
    //         })
    //     }
    // },[ start ])
    return (
        <>
            <button type="button" onClick={onTogglePost} className="custom-button">글 쓰기</button>
            {mainPosts.map((item) => {
                return (
                    <Title key={item.id} post={item}/>
                );
            })}
            <Pagination  />
        </>
    );
};

// getInitialProps
Home.getInitialProps = async ( context ) => {
    console.log(context);
    context.store.dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
};
export default Home;