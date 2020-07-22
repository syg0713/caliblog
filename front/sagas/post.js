import { all, fork, takeLatest, takeEvery, put, throttle, call }  from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    LOAD_MAIN_POSTS_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS,
    LOAD_MAIN_POSTS_FAILURE,
    UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
} from '../reducers/post';

function addPostAPI(postData) {
    console.log(postData+'사가 포스트데이터');
    return axios.post('/post', postData, {
        withCredentials: true,
    })
}
function* addPost(action) {
    try {
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
function loadMainPostsAPI(lastId = 0, limit = 10) {
    return axios.get(`/posts?lastId=${lastId}&limit=${limit}`);
}

function* loadMainPosts(action) {
    try {
        const result = yield call(loadMainPostsAPI, action.lastId);
        console.log(result,'last id');
        yield put({
        type: LOAD_MAIN_POSTS_SUCCESS,
        data: result.data,
        });
    } catch (e) {
        yield put({
        type: LOAD_MAIN_POSTS_FAILURE,
        error: e,
        });
    }
}

function* watchLoadMainPosts() {
    yield throttle(2000, LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        // fork(watchLoadPost),
        fork(watchUploadImages),
        fork(watchLoadMainPosts),
    ]);
}