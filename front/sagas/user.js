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
} from "../reducers/user";

axios.defaults.baseURL = 'http://localhost:8080/api';

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
    return axios.post("/user/login/", loginData);
    // return axios.post("/user/login/", loginData, {
    //     withCredentials: true,
    // });
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



export default function* userSaga() {
    yield all([
        fork(watchSignUp),
        fork(watchLogIn),
        fork(watchLogOut),
    ]);
}
