import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';

const SearchInput = () => {
  const enterRef = useRef();
  const [ keyword, setKeyword ] = useState("");
  const onChangeSearch = useCallback((e) => {
    setKeyword(e.target.value);
  },[])

  // useEffect(() => {
  //   // console.log(search);
  // },[keyword]);

  return (
      <div className="search">
        <input type="text" placeholder="검색어를 입력해주세요."
          className="custom-input" value={keyword}
          onChange={onChangeSearch}
          onKeyPress={( e ) => {
            event.keyCode==13 ? enterRef.current.click() : '';
          }}
        />
        <Link
          href={{ pathname: '/search', query: { keyword } }}
          as={`/search/${keyword}`}
        >
          <a ref={enterRef}>
            <button className="custom-button">검색</button>
          </a>
        </Link>
      </div>
  );
};

export default SearchInput;