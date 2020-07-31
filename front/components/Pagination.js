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

  
  return (
    <>
        <Link
          href={{pathname: '/Page', query: { goto: val }}}
          as={`/Page/${val}`}
          key={val}
          prefetch
        >
          <li key={val} 
              onClick={() => {
                updateCurrentPage(val);
              }}>
              {val}
          </li>
        </Link>
    </>
  );
};

Pagination.propTypes = {
  val: PropTypes.number.isRequired,
}

export default Pagination;




