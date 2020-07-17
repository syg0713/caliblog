import { all, fork, takeLatest, takeEvery, put, throttle, call }  from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POST_FAILURE,
} from '../reducers/post';

function addPostAPI(postData) {
    return axios.post('/post', postData, {
        withCredentials: true,
    })
}

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        // throw (new Error("Something went wrong"));
        yield put({
            type: ADD_POST_SUCCESS,
            // data: result.data,
        })
    } catch (e) {
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function loadPostAPI(postData) {
    return axios.post('/post', postData, {
        withCredentials: true,
    })
}

function* loadPost(action) {
    try {
        yield put({
            type: LOAD_POST_SUCCESS,
        })
    } catch (e) {
        yield put({
            type: LOAD_POST_FAILURE,
            error: e,
        });
    }
}

function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchLoadPost),
    ]);
}