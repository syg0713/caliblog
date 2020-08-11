import React from 'react';

const result = () => {
  return (
    <div>
      
    </div>
  );
};

// getInitialProps
result.getInitialProps = async ( context ) => {
  console.log(context);
  // const { goto } = context.query;
  // context.store.dispatch({
  //   type: LOAD_MAIN_POSTS_REQUEST,
  //   offset: (goto-1)*10,
  // });
  return { goto: parseInt( goto, 10)};
};

result.propTypes = {
  // goto: PropTypes.number.isRequired,
};

export default result;