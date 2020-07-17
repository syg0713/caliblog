import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const BoardHead = ({ post }) => {

  return (
    <div className="head">
    { post.title }
    </div>
  );
};

export default BoardHead;