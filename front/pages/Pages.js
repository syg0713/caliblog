import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../containers/PostCard';
import Title from '../components/Title';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Pages = ({  }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector( state => state.post );
  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
      lastId: mainPosts[mainPosts.length -1].id,
    })
  },[])
  return (
    <div>
        {mainPosts.map((item) => {
            return (
                <Title key={item.id} post={item}/>
            );
        })}
    </div>
  );
};


// getInitialProps
// Pages.getInitialProps = async ( context ) => {
//   context.store.dispatch({
//     type: LOAD_MAIN_POSTS_REQUEST,
//     data: context.query.goto,
//     lastId: mainPosts[mainPosts.length -1]
//   });
//   return { goto: parseInt( context.query.goto, 10)};
// };

Pages.propTypes = {
  goto: PropTypes.number.isRequired,
};

export default Pages;