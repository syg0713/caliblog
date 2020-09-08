import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/Title';
import { LOAD_MAIN_POSTS_REQUEST, UPDATE_START_END_PAGE } from '../../reducers/post';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store/configureStore';


const Page = () => {
  // const dispatch = useDispatch();
  const { mainPosts } = useSelector( state => state.post );
  const router = useRouter();
  const { page } = router.query;
  return (
    <>
      {mainPosts.map((item) => {
          return (
            <Title key={item.id} post={item} />
          );
      })}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps( async( context ) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  const { page } = context.params;

  if ( context.req && cookie ) {
      axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
      type: LOAD_USER_REQUEST,
  })
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
    offset: (page-1)*10,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {
    pathname: '/page',
  } };
});


// // getInitialProps
// Page.getInitialProps = async ( context ) => {
//   const { page } = context.query;
//   context.store.dispatch({
//     type: LOAD_MAIN_POSTS_REQUEST,
//     offset: (page-1)*10,
//   });
//   // return { page: parseInt( page, 10)};
// };

Page.propTypes = {
  // goto: PropTypes.number.isRequired,
};

export default Page;