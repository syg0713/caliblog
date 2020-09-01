import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../../components/PostCard';
import { LOAD_SINGLE_POST_REQUEST } from '../../reducers/post';
import { useRouter } from 'next/router';
import axios from 'axios';

const post = () => {

  const { singlePost } = useSelector(state => state.post);
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      {singlePost ?
        <PostCard key={id} postId={id} /> :
        ''}
    </div>
  );
};


// getInitialProps
post.getInitialProps = async ( context ) => {
  // const { id } = context.params;
  const { pathname } = context;
  context.store.dispatch({
    type: LOAD_SINGLE_POST_REQUEST,
    data: context.query.id,
  });
  // return { id: parseInt( id, 10), pathname};
  return { pathname };
};

post.propTypes = {
  id: PropTypes.number.isRequired,
};

export default post;