import React, { useEffect, useCallback } from 'react';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_SEARCH_POSTS_REQUEST } from '../reducers/post';
import Title from '../components/Title';
import './Search.scss';

const Search = ({ keyword }) => {
  const dispatch = useDispatch();
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

// getInitialProps
Search.getInitialProps = async ( context ) => {
  // console.log(context);
  const { pathname } = context;
  const { keyword } = context.query;
  context.store.dispatch({
    type: LOAD_SEARCH_POSTS_REQUEST,
    data: keyword,
  });
  return { keyword, pathname }
};

Search.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default Search;