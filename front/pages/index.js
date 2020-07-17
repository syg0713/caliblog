import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from './PostForm';
import PostCard from '../containers/PostCard';
import BoardHead from '../components/BoardHead';
import Router from 'next/router';
import { LOAD_POST_REQUEST } from '../reducers/post';

const Home = () => {
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
    const loadContent = () => {
     dispatch({
       type: LOAD_POST_REQUEST,
     })
    }
    return (
        <>
            <button type="button" onClick={onTogglePost} className="custom-button">글 쓰기</button>
            {/* { me && postFormOpened && (
                <PostForm />
            )} */}
            <div>
                {/* {postLoaded
                ?
                <div>
                    {mainPosts.map((c) => {
                    return (
                        <PostCard key={c.id} post={c}/>
                    // <PostCard key={c.id} post={c} />
                    );
                })}
                </div>
                :
                <div onClick={loadContent}>{mainPosts.map((c) => {
                    return (
                        <BoardHead key={c.id} post={c}/>
                    );
                })}</div>
                } */}
                <div onClick={loadContent}>{mainPosts.map((c) => {
                    return (
                        <BoardHead key={c.id} post={c}/>
                    );
                })}
                </div>
            </div>
        </>
    );
};

export default Home;