import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST, REMOVE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
    const { singlePost } = useSelector(state => state.post);
    console.log(post);
    // const id = useSelector((state) => state.user.me && state.user.me.id);
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log(singlePost.User.userId);
    },[]);
    const onRemovePost =  useCallback((userId) => () => {
        console.log(userId);
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: userId,
        })
    },[])
    return (
        <div>
            <div onClick={onRemovePost(post)}>삭제</div>
            <div>
                { singlePost.User.userId}
            </div>
            <div>
                <img src={ singlePost.img } alt=""/>
            </div>
            <div>
                { singlePost.title }
            </div>
            <div>
                { singlePost.content }
            </div>
        </div>
    );
};

export default PostCard;