import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../components/Title';
import Pagination from '../components/Pagination';
import PostButton from '../components/PostButton';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const { me } = useSelector( state => state.user );
    const { mainPosts, singlePost } = useSelector( state => state.post );
    return (
        <>
            {me ?
                <div>
                    <PostButton />
                    {mainPosts.map((item) => {
                        return (
                            <Title key={item.id} post={item}/>
                        );
                    })}
                    <Pagination  />
                </div> :
                <div>로그인이 필요 합니다.</div>
            }
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