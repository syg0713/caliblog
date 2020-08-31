import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import { LOAD_SINGLE_POST_REQUEST } from '../reducers/post';
import { useRouter } from 'next/router';
import { useRouter } from 'next/router'
import axios from 'axios';

const post = ({ postId }) => {

  const { singlePost } = useSelector(state => state.post);
  const router = useRouter();
  const { post } = router.query;

  return (
    <div>
      {/* {singlePost ? */}
        <PostCard key={post} postId={post} /> 
        {/* // ''} */}
    </div>
  );
};


// getInitialProps
post.getInitialProps = async ( context ) => {
  console.log(context);
  const { post } = context.params;
  const { pathname } = context;
  context.store.dispatch({
    type: LOAD_SINGLE_POST_REQUEST,
    data: post,
  });
  return { post: parseInt( post, 10), pathname};
};

post.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default post;