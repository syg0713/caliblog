import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../components/Title';
import Pagination from '../components/Pagination';
import PostButton from '../components/PostButton';
import { 
    LOAD_MAIN_POSTS_REQUEST,
    CURRENT_PAGE_NUMBER,
    UPDATE_START_END_PAGE,
    POST_RESET_DONE 
} from '../reducers/post';

const Home = () => {
    const { me } = useSelector( state => state.user );
    const { mainPosts } = useSelector( state => state.post );
    const dispatch = useDispatch();

    useEffect(() => {
        // 홈 이동 시 페이지네이션 리셋.
        const start = 0;
        const end = 10;
        dispatch({
            type: UPDATE_START_END_PAGE,
            payload:  { start, end }
        });
        // 홈 이동 시 이미지 리셋.
        dispatch({
            type: POST_RESET_DONE,
        })
    },[])

    return (
        <>
            {me
                ? <div>
                    <PostButton />
                    { mainPosts.map((item) => {
                        return (
                            <Title key={item.id} post={item}/>
                        );
                    }) }
                    <Pagination  />
                </div>
                : <div>로그인이 필요 합니다.</div>
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
    context.store.dispatch({
        type: CURRENT_PAGE_NUMBER,
        payload: 1
    });
};
export default Home;