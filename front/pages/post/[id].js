import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import PostCard from '../../components/PostCard';
import { LOAD_SINGLE_POST_REQUEST } from '../../reducers/post';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store/configureStore';


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


export const getServerSideProps = wrapper.getServerSideProps( async( context ) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  const { pathname } = context;
  if ( context.req && cookie ) {
      axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
      type: LOAD_USER_REQUEST,
  })
  context.store.dispatch({
    type: LOAD_SINGLE_POST_REQUEST,
    data: context.query.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  // return { pathname };
});

// getInitialProps
// post.getInitialProps = async ( context ) => {
//   // const { id } = context.params;

// };

post.propTypes = {
  id: PropTypes.number.isRequired,
};

export default post;