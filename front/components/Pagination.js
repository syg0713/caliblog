import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import './Title.scss';
import './Pagination.scss';
import PropTypes from 'prop-types';
import { 
  UPDATE_CURRENT_PAGE,
  CURRENT_PAGE_NUMBER_REQUEST,
  LOAD_MAIN_POSTS_REQUEST, UPDATE_START_END_PAGE, 
} from '../reducers/post';


const Pagination = ({ val }) => {
  const dispatch = useDispatch();
  const {  mainPosts, mainPostsAll, start, end, current, paging } = useSelector( state => state.post );

  const per = 10;
  const dbPostsAll = mainPostsAll;
  const total = Math.ceil( dbPostsAll / per );
  const array = [];
  for ( let i=0; i<total; i++ ) {
      array.push( i+1);
  }
  const target = array.slice( start, end );
  
  const updateCurrentPage = ( val ) => {
    dispatch({
        type: CURRENT_PAGE_NUMBER_REQUEST,
        payload: val,
    })
  }
  const updateStartEndPage = ( start, end ) => {
    dispatch({
        type: UPDATE_START_END_PAGE,
        payload: { start, end },
    })
}
  useEffect(() => {
    console.log(current);
  },[current])
  
  return (
    <>
        {/* <Link
          href={{pathname: '/page', query: { goto: start+1 }}}
          as={`/page/${start+1}`}
          key={start+1}
          prefetch
        >
            <a> */}
              <button
                onClick={() => {
                  if ( start > 0 ) {
                    const s = start - 5;
                    const e = end - 5;
                    updateStartEndPage(s,e);
                  }
                }}
              >이전
              </button>
            {/* </a>
        </Link> */}

        { target.map( val => (
          <Link
            href={{pathname: '/page', query: { goto: val }}}
            as={`/page/${val}`}
            key={val}
            prefetch
          >
            <li key={val} 
              onClick={() => {
                updateCurrentPage(val);
              }}
            >
              {val}
            </li>
          </Link>
        ))}

        {/* <Link
          href={{pathname: '/page', query: { goto: start+1 }}}
          as={`/page/${start+1}`}
          key={start+1}
          prefetch
        >
          <a> */}
            <button
            onClick={() => {
              if ( end < Math.ceil(dbPostsAll / 10) ) {
                const s = start + 5;
                const e = end + 5;
                updateStartEndPage(s,e);
              }
            }}
            >다음
            </button>
          {/* </a>
        </Link> */}
    </>
  );
};

Pagination.propTypes = {
  val: PropTypes.number.isRequired,
}

export default Pagination;




