import React, { useCallback, memo } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';


const Title = memo(({ post }) => {
  const { me } = useSelector( state => state.user );
  const preventAccess = useCallback(() => {
    alert('로그인이 필요합니다.');
  },[])

  return (
    <>
        <div className="title__container">
            { me ?
                <Link
                href={{ pathname: '/contentRender', query: { postId: post.id }}}
                as={`/contentRender/${post.id}`}
                key={post.id}
                prefetch
              >
                <a className="link__item">
                  {post.title}
                </a>
              </Link>
              :
              <a className="link__item" onClick={preventAccess}>
                {post.title} 
              </a>
           }
            <span>
              <em>{post.User.userId}</em>
              <em>{post.createdAt.slice(0,10)}</em> 
              {/* <em>{post.createdAt.slice(0,10)} {post.createdAt.slice(11,19)}</em>  */}
            </span>
        </div>
    </>
  );
});

Title.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Title;