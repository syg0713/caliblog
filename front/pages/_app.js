import React from 'react';
import AppLayout from "../components/AppLayout";
import PropTypes from "prop-types";
import withRedux from 'next-redux-wrapper';
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducer from "../reducers";
import rootSaga from "../sagas";
import Helmet from "react-helmet";
import './common.scss';

const CaliBlog = ({ Component, store }) => {
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
                <Component />
            </AppLayout>
        </Provider>
    );
};

CaliBlog.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
  };

// 미들웨어를 달아줘야 브라우저에서 리덕스 상태를 확인 가능하다
export default withRedux(( initialState, options ) => {
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
})(CaliBlog);



