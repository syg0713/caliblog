import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../components/Title';
import { LOAD_SEARCH_POSTS_REQUEST } from '../reducers/post';

const Search = ({ keyword }) => {
  const { mainPosts } = useSelector( state => state.post );



  return (
    <div>
      { mainPosts.map((item) => {
            return (
                <Title key={item.id} post={item} keyword={keyword}/> 
            );
        }) }
    </div>
  );
};

// getInitialProps
Search.getInitialProps = async ( context ) => {
  // console.log(context);
  const { keyword } = context.query;
  context.store.dispatch({
    type: LOAD_SEARCH_POSTS_REQUEST,
    data: keyword,
  });
  return { keyword }
};

Search.propTypes = {
};

export default Search;