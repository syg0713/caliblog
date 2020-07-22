import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import axios from "axios";
import {
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
} from "../reducers/user";


function signUpAPI(signUpData) {
    return axios.post("/user/", signUpData);
}
function* signUp(action) {
    try {
        yield call(signUpAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            // reason: e.response && e.response.data,
            error: e,
        });
    }
}
function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}
function logInAPI(loginData) {
    // return axios.post("/login");
    // return axios.post("/user/login/", loginData);
    // 서버와 도메인이 다르면 프론트에서 쿠키를 받을수 없다.(cors 문제)
    // 그래서 프론트(axios)에서 withCredentials를 설정하고 백엔드에서 cors 부분도 설정해준다.
    return axios.post("/user/login/", loginData, {
        withCredentials: true,
    });
}
function* logIn(action) {
    try {
        console.log(action.data);
        const result = yield call(logInAPI, action.data);
        yield put({
            // put은 dispatch와 동일
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        // LoginAPI 실패
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
            reason: e.response && e.response.data,
        });
    }
}
function* watchLogIn() {
    yield takeEvery(LOG_IN_REQUEST, logIn);
}
function logOutAPI() {
    return axios.post("/user/logout",{},{
        withCredentials: true,
    });
}
function* logOut(action) {
    try {
        // const result = yield call(logInAPI, action.data);
        yield call(logOutAPI);
        yield put({
            // put은 dispatch와 동일
            type: LOG_OUT_SUCCESS,
        });
    } catch (e) {
        // LogOutAPI 실패
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error: e,
        });
    }
}
function* watchLogOut() {
    yield takeEvery(LOG_OUT_REQUEST, logOut);
}
function loadUserAPI(userId) {
    // 서버에 요청을 보내는 부분
    return axios.get( "/user/", {
        withCredentials: true, // 클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉해줘요
    }); // 서버사이드렌더링일 때는, 브라우저가 없어요.
}
function* loadUser(action) {
    try {
        // yield call(loadUserAPI);
        const result = yield call(loadUserAPI, action.data);
        yield put({
        // put은 dispatch 동일
        type: LOAD_USER_SUCCESS,
        data: result.data,
        // me: !action.data,
        });
    } catch (e) {
        // loginAPI 실패
        console.error(e);
        yield put({
        type: LOAD_USER_FAILURE,
        error: e,
        });
    }
}
function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}


export default function* userSaga() {
    yield all([
        fork(watchSignUp),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchLoadUser),
    ]);
}
