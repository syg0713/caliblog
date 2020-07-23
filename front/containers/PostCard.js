import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { mainPosts } from '../reducers/post';

const PostCard = ({ post }) => {
    const { singlePost } = useSelector(state => state.post);
    useEffect(() => {
        // console.log(post);
    },[])
    return (
        <div>
            <div>
                { singlePost.UserId }
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