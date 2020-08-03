import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './Title.scss';
import './Pagination.scss';
import { 
  CURRENT_PAGE_NUMBER_REQUEST,
  UPDATE_START_END_PAGE, 
} from '../reducers/post';

const Pagination = ({ val }) => {
  const dispatch = useDispatch();
  const { mainPostsAll, start, end, current } = useSelector( state => state.post );

  // 페이지네이션 도트 개수 설정
  const per = 10;
  const dbPostsAll = mainPostsAll;
  const total = Math.ceil( dbPostsAll / per );
  const array = [];
  for ( let i=1; i < total+1; i++ ) {
      array.push( i );
  }
  const target = array.slice( start, end );
  
  // 현재 페이지 번호 업데이트
  const updateCurrentPage = ( val ) => {
    dispatch({
        type: CURRENT_PAGE_NUMBER_REQUEST,
        payload: val,
    })
  }

  // 현재장의 처음페이지 번호와 마지막페이지 번호 업데이트
  const updateStartEndPage = ( start, end ) => {
    dispatch({
        type: UPDATE_START_END_PAGE,
        payload: { start, end },
    })
  }

  // PREV & NEXT 페이지 이동 쿼리값, 변수
  const prevPageValue = start > 0 ? start : current;
  const nextPageValue =  end < total ? end+1 : total;

  // 이전 버튼
  const prevButton = useCallback(() => {
      if ( start > 1 ) {
        const s = start - 5;
        const e = end - 5;
        updateStartEndPage( s, e );
      }
      updateCurrentPage( prevPageValue );
  },[ start, end]);

  // 다음 버튼
  const nextButton = useCallback(() => {
      if ( end < total ) {
        const s = start + 5;
        const e = end + 5;
        updateStartEndPage( s, e );
      }
      updateCurrentPage( nextPageValue );
  },[ start, end, total ]);

  // 처음페이지 & 마지막 페이지 버튼 클릭 방지
  useEffect(() => {
    if( start == 0 ) { 
      document.querySelector('.prev').style.display='none'
    } else { 
      document.querySelector('.prev').style.display='inline-block'
    };
    if( end > total ) { 
      document.querySelector('.next').style.display='none'
    } else {
      document.querySelector('.next').style.display='inline-block'
    };
    const pageUrl = document.location.href.split('page/')[1];
    const parseUrl = parseInt(pageUrl,10)
    const ceilUrl = Math.ceil(parseUrl);
    console.log(ceilUrl);
    // if ( pageUrl ) {
    //   updateCurrentPage( parseUrl );
    //   updateStartEndPage( parseUrl-5, parseUrl );
    // }
    // const dividePages = dbPostsAll / 5;
    // const pageValue = dbPostsAll / dividePages;
    // console.log(dividePages, pageValue);
        // console.log(current,'현재페이지');
    // console.log(total,'총게시물개수');
  },[ current, end, start, total ])



  return (
    <>
        <Link
          href={{pathname: '/page', query: { goto : prevPageValue } }}
          as={`/page/${ prevPageValue }`}
          key={ prevPageValue }
          prefetch
        >
            <a className="prev">
              <button
                onClick={ prevButton }
              >이전
              </button>
            </a>
        </Link>

        { target.map( val => (
          <Link
            href={{ pathname: '/page', query: { goto: val } }}
            as={`/page/${val}`}
            key={ val }
            prefetch
          >
            <li key={ val } 
              onClick={() => {
                updateCurrentPage( val );
              }}
            >
              {val}
            </li>
          </Link>
        ))}

        <Link
          href={{ pathname: '/page', query: { goto: nextPageValue } }}
          as={`/page/${ nextPageValue }`}
          key={ nextPageValue }
          prefetch
        >
          <a className="next">
            <button
            onClick={ nextButton }
            >다음
            </button>
          </a>
        </Link>
    </>
  );
};

Pagination.propTypes = {
  val: PropTypes.number.isRequired,
}

export default Pagination;




