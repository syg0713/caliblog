import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { mainPosts } from '../reducers/post';

const PostCard = ({ post }) => {
    useEffect(() => {
        console.log(post);
    },[])
    return (
        <div>
            <div>
                { post.User.name }
            </div>
            <div>
                <img src={ post.img } alt=""/>
            </div>
            <div>
                { post.content }
            </div>
        </div>
    );
};

export default PostCard;