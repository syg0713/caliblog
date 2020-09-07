import React, { useEffect, useCallback } from 'react';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/Title';

import { useRouter } from 'next/router'
import { LOAD_SEARCH_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store/configureStore';

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { keyword } = router.query;
  const { mainPosts, hasMorePost } = useSelector( state => state.post );
  const seeMore = useCallback(() => {
      if ( hasMorePost ) {
        dispatch({
          type: LOAD_SEARCH_POSTS_REQUEST,
          lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length -1].id,
          data: keyword,
        })
      }
  })

  return (
    <div>
      { mainPosts.map((item) => {
            return (
                <Title key={item.id} post={item}/> 
            );
        }) }
      { hasMorePost ?
        <button onClick={seeMore} className="morePost">더 보기 +</button>
        :
        ''
      }
    </div>
  );
};


export const getServerSideProps = wrapper.getServerSideProps( async( context ) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  const { keyword } = context.query;

  if ( context.req && cookie ) {
      axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
      type: LOAD_USER_REQUEST,
  })
  context.store.dispatch({
    type: LOAD_SEARCH_POSTS_REQUEST,
    data: keyword,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {
    pathname: '/search',
  } };
});

// getInitialProps
// Search.getInitialProps = async ( context ) => {
//   // console.log(context);
//   const { pathname } = context;
//   const { keyword } = context.query;
//   context.store.dispatch({
//     type: LOAD_SEARCH_POSTS_REQUEST,
//     data: keyword,
//   });
//   return { keyword, pathname }
// };

Search.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default Search;