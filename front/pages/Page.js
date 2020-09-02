import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Title from '../components/Title';
import { LOAD_MAIN_POSTS_REQUEST, UPDATE_START_END_PAGE } from '../reducers/post';
import styled from 'styled-components';


const Page = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector( state => state.post );
  // const Title = styled.div`
  //   width: 5rem;
  //   height: 5rem;
  // `;
  // offset(현제 페이지 * 10) 값 전송
  // useEffect(() => {
  //   const per = 10;
  //   const offset = (goto-1)*per;
  //   dispatch({
  //       type: LOAD_MAIN_POSTS_REQUEST,
  //       offset,
  //   })
  // },[ goto ])

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

// getInitialProps
Page.getInitialProps = async ( context ) => {
  const { goto } = context.query;
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
    offset: (goto-1)*10,
  });
  // return { goto: parseInt( goto, 10)};
};

Page.propTypes = {
  goto: PropTypes.number.isRequired,
};

export default Page;