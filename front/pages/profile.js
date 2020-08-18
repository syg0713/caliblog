import React from 'react';
import PropTypes from 'prop-types';

const Profile = () => {
    return (
        <>
            <div>
                이름: 서영규
            </div>
            <div>
                직업: 풀스택 개발자인척하는 백엔드 개발자가 장래희망인 프론트엔드 개발자
            </div>
            <div>
                
            </div>
        </>
    );
};
// getInitialProps
Profile.getInitialProps = async ( context ) => {
const { pathname } = context;
return { pathname};
};
  
Profile.propTypes = {
};
export default Profile;