import { all, fork, takeLatest, takeEvery, put, throttle, call }  from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
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

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
    ]);
}