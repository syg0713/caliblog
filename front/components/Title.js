import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

const Title = ({ post }) => {
  return (
    <>
      <div>
        <Link
          href={{ pathname: '/bodyrender' }}
          key={post}
        >
          <a>{post.title}</a>
        </Link>
        {/* {post.map((v)   => {
            <Link
              href={{ pathname: '/bodyrender', query: { tag: v.slice(1) } }}
              as={`/bodyrender/${v.slice(1)}`}
              key={v}
            >
              <a>{v.title}</a>
            </Link>
        })} */}
      </div>
    </>
  );
};

export default Title;