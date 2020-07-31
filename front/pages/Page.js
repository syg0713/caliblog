import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Title from '../components/Title';
import Pagination from '../components/Pagination';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Page = ({ goto }) => {
  const dispatch = useDispatch();
  const { mainPosts, mainPostsAll, start, end } = useSelector( state => state.post );


  const per = 10;
  const dbPostsAll = mainPostsAll;
  console.log(mainPostsAll);
  const total = Math.ceil( dbPostsAll / per );
  const array = [];
  for ( let i=0; i<total; i++ ) {
      array.push( i+1);
  }
  const target = array.slice( start, end );

  useEffect(() => {
    const per = 10;
    const offset = (goto-1)*per;
    dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
        offset,
    })
  },[goto])
  

  return (
    <div>
        {mainPosts.map((item) => {
            return (
                <Title key={item.id} post={item}/>
            );
        })}
        { target.map( val => (
            <Pagination key={val} val={val} />
        ))}

    </div>
  );
};


// getInitialProps
Page.getInitialProps = async ( context ) => {
  return { goto: parseInt( context.query.goto, 10)};
};

Page.propTypes = {
  goto: PropTypes.number.isRequired,
};

export default Page;