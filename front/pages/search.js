import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../components/Title';
import { LOAD_SEARCH_POSTS_REQUEST } from '../reducers/post';

const Search = ({ keyword }) => {
  const { mainPosts } = useSelector( state => state.post );
  // console.log(keyword);
  // const reg = new RegExp(/\bkeyword\b/ig);



  return (
    <div>
      { mainPosts.map((item) => {
            var title = item.title;
            var regex = new RegExp(keyword);
            var result = regex.test(title);
            console.log(result);
            return (
              result ? 
                <Title key={item.id} post={item}/> :
                ''
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