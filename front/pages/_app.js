import React from 'react';
import AppLayout from "../components/AppLayout";
import PropTypes from "prop-types";
import withRedux from 'next-redux-wrapper';
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from "../reducers";
import Helmet from "react-helmet";
import './signup/index.scss';
import './post/index.scss';
import './index.scss';


const CaliBlog = ({ Component, store }) => {
    console.log(Component +'1');
    return (
        <Provider store={store}>
            <Helmet
                title="Cali blog"
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
                    content: "Cali blog",
                    },
                    {
                    name: "og:title",
                    content: "Cali blog",
                    },
                    {
                    name: "og:description",
                    content: "Cali blog",
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
                    }
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

export default withRedux(( initialState, options ) => {
    const middlewares = [];
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
    return store;
})(CaliBlog);



