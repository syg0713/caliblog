import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  CURRENT_PAGE_NUMBER,
  UPDATE_START_END_PAGE, 
} from '../reducers/post';

const Pagination = () => {
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
  
  // 현재 페이지 current 업데이트
  const updateCurrentPage = ( val ) => {
    dispatch({
        type: CURRENT_PAGE_NUMBER,
        payload: val,
    })
  }

  // 현재 장의 start와 end 번호 업데이트
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
  const setPrev = useCallback(() => {
      if ( start > 1 ) {
        const s = start - 10;
        const e = end - 10;
        updateStartEndPage( s, e );
      }
      updateCurrentPage( prevPageValue );
      return;
  },[ start, end ]);

  // 다음 버튼
  const setNext = useCallback(() => {
      if ( end < total ) {
        const s = start + 10;
        const e = end + 10;
        updateStartEndPage( s, e );
      }
      updateCurrentPage( nextPageValue );
      return;
  },[ start, end, total ]);


  
  useEffect(() => { // URL 이동 시 커렌트번호 삽입 및 페이지네이션 이동
    const pageUrl = document.location.href.split('page/')[1];
    const getCurrent = parseInt(pageUrl,10);
    const getStart = pageUrl ? parseInt(pageUrl[0]+'0',10) : 0;

    // 페이지 창일때 쿼리값 커랜트로 받기
    if( pageUrl ) {
      dispatch({
        type: CURRENT_PAGE_NUMBER,
        payload: getCurrent,
      })
      getCurrent <= 10 ?
      updateStartEndPage( 0, 10 ) : 
      updateStartEndPage( getStart, getStart+10 );
    }

  },[ current, start, end ])

  return (
    <>
      <div className="pagination__container">
        
      <Link
          // href={{pathname: '/page', query: { goto : prevPageValue } }}
          href={'/page/[prevPageValue]'}
          as={`/page/${ prevPageValue }`}
          key={ prevPageValue }
          // prefetch
        >
            <a className={ 
              start == 0 ? 'prev--none' : 'prev'
            }>
              <button onClick={ setPrev }>
                이전
              </button>
            </a>
        </Link>

        { target.map( val => (
          <Link
            // href={{ pathname: '/page', query: { goto: val } }}
            href={'/page/[val]'}
            as={`/page/${val}`}
            key={ val }
            // prefetch
          >
            <li key={ val }
              onClick={() => {
                updateCurrentPage( val );
              }}
              className={ 
                current === val ? 'active' : '' 
              }
            >
              {val}
            </li>
          </Link>
        ))}

        <Link
          // href={{ pathname: '/page', query: { goto: nextPageValue } }}
          href={'/page/[nextPageValue]'}
          as={`/page/${ nextPageValue }`}
          key={ nextPageValue }
          // prefetch
        >
          <a className={ 
            end+1 > total ? 'next--none' : 'next'
          }>
            <button onClick={ setNext }>
            다음
            </button>
          </a>
        </Link>

      </div>
    </>
  );
};

Pagination.propTypes = {
  // val: PropTypes.number.isRequired,
}

export default Pagination;




