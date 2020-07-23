import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../components/Title';
import Router from 'next/router';
import { LOAD_POST_REQUEST, LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = ({ id }) => {
    const { me } = useSelector( state => state.user );
    const { mainPosts, postAdded, postLoaded, isLoadingPost } = useSelector( state => state.post );
    // const [ postFormOpened, setPostFormOpened] = useState(false);
    const dispatch = useDispatch();
    
    const onTogglePost = useCallback(() => {
        if( !me ) {
            alert('로그인이 필요합니다.');
        } else {
            Router.push('/PostForm');
        }
    })
    console.log(mainPosts);
    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_MAIN_POSTS_REQUEST,
    //     })
    // },[])
    // useEffect(() => {
    //     if ( postAdded ) {
    //         setPostFormOpened(false);
    //     }
    // },[postAdded])
    const onLoadedPost = useCallback(() => {
        if( !me ) {
            alert('로그인이 필요합니다.');
        } else {
            Router.push('/PostForm');
        }
    })

    return (
        <>
            <button type="button" onClick={onTogglePost} className="custom-button">글 쓰기</button>
            {mainPosts.map((c) => {
                return (
                    <Title key={c.id} post={c} id={id}/>
                );
            })}
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