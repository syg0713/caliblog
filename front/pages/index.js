import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Title from '../components/Title';
import Pagination from '../components/Pagination';
import { LOAD_MAIN_POSTS_REQUEST, UPDATE_START_END_PAGE } from '../reducers/post';

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

    const per = 10;
    const dbPostsAll = mainPostsAll;
    console.log(mainPostsAll);
    const total = Math.ceil( dbPostsAll / per );
    const array = [];
    for ( let i=0; i<total; i++ ) {
        array.push( i+1);
    }
    const target = array.slice( start, end );
    const updateStartEndPage = ( start, end ) => {
        dispatch({
            type: UPDATE_START_END_PAGE,
            payload: { start, end },
        })
    }
    // useEffect(() => {
    //     if ( start ) {
    //         Router.push(`/Page/${start}`);
    //     }
    // },[ start && next ])

    return (
        <>
            <button type="button" onClick={onTogglePost} className="custom-button">글 쓰기</button>
            {mainPosts.map((item) => {
                return (
                    <Title key={item.id} post={item}/>
                );
            })}
            <button
            onClick={() => {
                const s = start - 10;
                const e = end - 10;
                updateStartEndPage(s,e);
            }}
            >이전</button>
            { target.map( val => (
                <Pagination key={val} val={val} />
            ))}

            <button
            onClick={() => {
                const s = start + 10;
                const e = end + 10;
                updateStartEndPage(s,e);
            }}
            >다음</button>
        </>
    );
};

// getInitialProps
Home.getInitialProps = async ( context ) => {
    context.store.dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
};
export default Home;