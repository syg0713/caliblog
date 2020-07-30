import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import './Title.scss';
import PropTypes from 'prop-types';
import { 
  UPDATE_CURRENT_PAGE,
  CURRENT_PAGE_NUMBER_REQUEST,
  LOAD_MAIN_POSTS_REQUEST
} from '../reducers/post';

const Pagination = ({ val }) => {
  const dispatch = useDispatch();
  const {  start, end, current, paging } = useSelector( state => state.post );

  const updateCurrentPage = ( val ) => {
    dispatch({
        type: CURRENT_PAGE_NUMBER_REQUEST,
        payload: val,
    })
  }
  const updateStartEndPage = ( page ) => {
      dispatch({
          type: UPDATE_START_END_PAGE,
          payload: { start, end },
      })
  }
  
  const per = 10;

  const pageGoTo = (() => {
    // if ( paging == false ) {
      const offset = (current-1)*per;
      dispatch({
          type: LOAD_MAIN_POSTS_REQUEST,
          offset,
      })
    // }
  })

  return (
    <>
        {/* <Link
          href={{pathname: '/Pages', query: { goto: val }}}
          // href={{ pathname: '/bodyrender', query: { postId: post.id }}}
          as={`/Pages/${val}`}
          key={val}
          prefetch
        > */}
          <li key={val} 
              onClick={() => {
                updateCurrentPage(val);
                pageGoTo();
              }}>
              {val}
          </li>
        {/* </Link> */}
    </>
  );
};

Pagination.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Pagination;




