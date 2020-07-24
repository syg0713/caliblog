import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POST_REQUEST, LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Title = ({ post, id }) => {
  console.log(id);
  return (
    <>
        <div>
            <Link
              href={{ pathname: '/bodyrender', query: { id: post.id }}}
              // , query: { tag: v.slice(1) }
              as={`/bodyrender/${post.id}`}
              key={post.id}
              prefetch
            >
              <a>{post.title}</a>
            </Link>
        </div>
    </>
  );
};

export default Title;