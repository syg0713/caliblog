import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import './Title.scss';
import PropTypes from 'prop-types';


const Title = ({ post }) => {
  // console.log(post);
  return (
    <>
        <div className="title__container">
            <Link
              href={{ pathname: '/bodyrender', query: { postId: post.id }}}
              // , query: { tag: v.slice(1) }
              as={`/bodyrender/${post.id}`}
              key={post.id}
              prefetch
            >
              <a className="link__item">
                {post.title}
              </a>
            </Link>
            <span>
              <em>{post.User.userId}</em>
              <em>{post.createdAt.slice(0,10)} {post.createdAt.slice(11,19)}</em> 
            </span>
        </div>
    </>
  );
};

Title.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Title;