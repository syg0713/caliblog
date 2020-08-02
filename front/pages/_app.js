import React from 'react';
import AppLayout from "../components/AppLayout";
import PropTypes from "prop-types";
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducer from "../reducers";
import rootSaga from "../sagas";
import Helmet from "react-helmet";
import { LOAD_USER_REQUEST } from '../reducers/user';
import axios from 'axios';
import '../common.scss';
import '../containers/PostCard.scss';
import '../containers/LoginForm.scss';
import '../containers/UserProfile.scss';


const CaliBlog = ({ Component, store, pageProps }) => {
    // console.log(Component +'1');
    return (
        <Provider store={store}>
            <Helmet
                title="CaliBlog"
                htmlAttributes={{ lang: "ko" }}
                meta={[
                    {
                    charset: "UTF-8",
                    },
                    {
                    name: "viewport",
                    content:
                        "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover",
                    },
                    {
                    "http-equiv": "X-UA-Compatible",
                    content: "IE=edge",
                    },
                    {
                    name: "description",
                    content: "CaliBlog",
                    },
                    {
                    name: "og:title",
                    content: "CaliBlog",
                    },
                    {
                    name: "og:description",
                    content: "CaliBlog",
                    },
                    {
                    property: "og:type",
                    content: "website",
                    },
                    {
                    property: "og:image",
                    content: "http://caliblog.com/favicon.ico",
                    },
                ]}
                link={[
                    {
                        rel: "shortcut icon",
                        href: "/favicon.ico",
                    },
                    {
                        rel: "stylesheet",
                        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
                    },
                ]}
            />
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </Provider>
    );
};

// propTypes
CaliBlog.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
  };

// getInitialProps
CaliBlog.getInitialProps = async ( context ) => {
    // console.log(context);
    const { ctx, Component } = context;
    let pageProps = {};
    const state = ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
    if ( ctx.isServer && cookie ) {
        axios.defaults.headers.Cookie = cookie;
    }
    if ( !state.user.me ) {
        ctx.store.dispatch({
            type: LOAD_USER_REQUEST,
        })
    }
    if ( Component.getInitialProps ) {
        pageProps = await Component.getInitialProps( ctx );
    }
    return { pageProps };
};

// 미들웨어를 달아줘야 브라우저에서 리덕스 상태를 확인 가능하다
// export default withRedux(( initialState, options ) => {
//     const sagaMiddleware = createSagaMiddleware(); // 사가 미들웨어 아래 미들웨어에 넣어주기.
//     const middlewares = [sagaMiddleware];
//     const enhancer =
//     process.env.NODE_ENV === "production"
//       ? compose(applyMiddleware(...middlewares))
//       : compose(
//         applyMiddleware(...middlewares),
//         !options.isServer &&
//           typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
//           ? window.__REDUX_DEVTOOLS_EXTENSION__()
//           : (f) => f
//       );
//     const store = createStore(reducer, initialState, enhancer);
//     store.sagaTask = sagaMiddleware.run(rootSaga); // 리덕스를 사가태스크로 연결하여 사가미들웨어로 사가를 실행.
//     return store;
// })(withReduxSaga(CaliBlog));

// 미들웨어를 달아줘야 브라우저에서 리덕스 상태를 확인 가능하다
const configureStore = ( initialState, options ) => {
    const sagaMiddleware = createSagaMiddleware(); // 사가 미들웨어 아래 미들웨어에 넣어주기.
    const middlewares = [sagaMiddleware];
    const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
        applyMiddleware(...middlewares),
        !options.isServer &&
          typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : (f) => f
      );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga); // 리덕스를 사가태스크로 연결하여 사가미들웨어로 사가를 실행.
    return store;
}
export default withRedux(configureStore)(withReduxSaga(CaliBlog));


