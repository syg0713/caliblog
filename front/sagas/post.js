import { all, fork, takeLatest, takeEvery, put, throttle, call }  from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POST_FAILURE,
    UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS
} from '../reducers/post';

function addPostAPI(postData) {
    console.log(postData+'사가 포스트데이터');
    return axios.post('/post', postData)
}
function* addPost(action) {
    try {
        console.log(action+'사가 리절트');
        const result = yield call(addPostAPI, action.data);
        console.log(result);
        // throw (new Error("Something went wrong"));
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
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

function uploadImagesAPI(formData) {
    return axios.post('/post/images', formData, {
        withCredentials: true,
    });
} 
function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
        type: UPLOAD_IMAGES_SUCCESS,
        data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
        type: UPLOAD_IMAGES_FAILURE,
        error: e,
        });
    }
}
function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
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