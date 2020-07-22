import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

const Title = ({ post }) => {
  return (
    <>
      <div>
        <Link
          href={{ pathname: '/bodyrender' }}
          key={post.id}
        >
          <a>{post.title}</a>
        </Link>
      </div>
    </>
  );
};

export default Title;