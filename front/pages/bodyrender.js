import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../containers/PostCard';
import { LOAD_SINGLE_POST_REQUEST } from '../reducers/post';

const BodyRender = ({ id }) => {
  const dispatch = useDispatch();
  const { singlePost } = useSelector(state => state.post);
  console.log(singlePost)
  return (
    <div>
        <PostCard key={id} />
    </div>
  );
};


// getInitialProps
BodyRender.getInitialProps = async ( context ) => {
  context.store.dispatch({
    type: LOAD_SINGLE_POST_REQUEST,
    data: context.query.id,
  });
  return { id: parseInt( context.query.id, 10)};
};

BodyRender.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BodyRender;