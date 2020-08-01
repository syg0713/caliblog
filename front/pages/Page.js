import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Title from '../components/Title';
import Pagination from '../components/Pagination';
import { LOAD_MAIN_POSTS_REQUEST, UPDATE_START_END_PAGE } from '../reducers/post';

const Page = ({ goto }) => {
  const dispatch = useDispatch();
  const { mainPosts, getBegin, mainPostsAll, start, end, current } = useSelector( state => state.post );
  console.log(goto);

  useEffect(() => {
    const per = 10;
    const offset = (goto-1)*per;
    dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
        offset,
    })
  },[goto])



  return (
    <div>
        {mainPosts.map((item) => {
            return (
                <Title key={item.id} post={item}/>
            );
        })}
        <Pagination />
    </div>
  );
};


// getInitialProps
Page.getInitialProps = async ( context ) => {
  const { goto } = context.query;
  return { goto: parseInt( goto, 10)};
};

Page.propTypes = {
  goto: PropTypes.number.isRequired,
};

export default Page;