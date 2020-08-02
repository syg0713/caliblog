import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

const PostButton = () => {
  const { me } = useSelector( state => state.user );

  const onTogglePost = useCallback(() => {
    if( !me ) {
        alert('로그인이 필요합니다.');
    } else {
        Router.push('/PostForm');
    }
})

  return (
    <>
      <button type="button" onClick={onTogglePost} className="custom-button">글 쓰기</button>
    </>
  );
};

export default PostButton;