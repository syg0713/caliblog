import React from 'react';
import AppLayout from "../components/AppLayout";
import './index.scss';

const CaliBlog = ({ Component, store, pageProps }) => {
    console.log(Component +'1');
    return (
        <>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </>
    );
};

export default CaliBlog;



