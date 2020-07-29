import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import './Title.scss';
import PropTypes from 'prop-types';
import { 
  UPDATE_CURRENT_PAGE,
  UPDATE_CURRENT_PAGE_REQUEST,
  LOAD_MAIN_POSTS_REQUEST
} from '../reducers/post';

const Pagination = ({ val }) => {
  const dispatch = useDispatch();

  const updateCurrentPage = ( val ) => {
    dispatch({
        type: UPDATE_CURRENT_PAGE_REQUEST,
        payload: val,
    })
  }
  const updateStartEndPage = ( page ) => {
      dispatch({
          type: UPDATE_START_END_PAGE,
          payload: { start, end },
      })
  }

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




