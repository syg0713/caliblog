import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import { LOAD_SINGLE_POST_REQUEST } from '../reducers/post';

const contentRender = ({ postId }) => {

  const { singlePost } = useSelector(state => state.post);
  return (
    <div>
      {singlePost ?
        <PostCard key={postId} postId={postId} /> :
        ''}
    </div>
  );
};


// getInitialProps
contentRender.getInitialProps = async ( context ) => {
  const { postId } = context.query;
  const { pathname } = context;
  context.store.dispatch({
    type: LOAD_SINGLE_POST_REQUEST,
    data: postId,
  });
  return { postId: parseInt( postId, 10), pathname};
};

contentRender.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default contentRender;