import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../containers/PostCard';
import { LOAD_SINGLE_POST_REQUEST } from '../reducers/post';

const BodyRender = ({ postId }) => {
  // const dispatch = useDispatch();
  // console.log(postId);
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
BodyRender.getInitialProps = async ( context ) => {
  const { postId } = context.query;
  // console.log('bodyrender getInitialProps', postId);
  context.store.dispatch({
    type: LOAD_SINGLE_POST_REQUEST,
    data: postId,
  });
  return { postId: parseInt( postId, 10)};
};

BodyRender.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default BodyRender;