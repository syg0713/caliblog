import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../components/Title';
import Pagination from '../components/Pagination';
import PostButton from '../components/PostButton';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    // const { me } = useSelector( state => state.user );
    const { mainPosts } = useSelector( state => state.post );
    return (
        <>
            <PostButton />
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
    // console.log(context);
    context.store.dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
};
export default Home;