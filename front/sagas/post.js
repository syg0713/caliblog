import { all, fork, takeLatest, takeEvery, put, throttle, call }  from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    LOAD_MAIN_POSTS_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS,
    LOAD_MAIN_POSTS_FAILURE,
    LOAD_SINGLE_POST_REQUEST,
    LOAD_SINGLE_POST_SUCCESS,
    LOAD_SINGLE_POST_FAILURE,
    LOAD_SEARCH_POSTS_REQUEST,
    LOAD_SEARCH_POSTS_SUCCESS,
    LOAD_SEARCH_POSTS_FAILURE,
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
        // console.log(result);
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
function removePostAPI(postId) {
    return axios.delete(`/post/${postId}`, {
      withCredentials: true,
    });
}
function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
        type: REMOVE_POST_SUCCESS,
        data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
        type: REMOVE_POST_FAILURE,
        error: e,
        });
    }
}
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function loadMainPostsAPI(lastId = 0, limit = 10, offset = 0) {
    return axios.get(`/posts?lastId=${lastId}&limit=${limit}&offset=${offset}`);
}
function* loadMainPosts(action) {
    try {
        // console.log(action.offset);
        const result = yield call(loadMainPostsAPI, action.lastId, action.limit, action.offset);
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
function loadSinglePostAPI(postId) {
    return axios.get(`/post/${postId}`);
}
function* loadSinglePost(action) {
    try {
        const result = yield call(loadSinglePostAPI, action.data);
        yield put({
        type: LOAD_SINGLE_POST_SUCCESS,
        data: result.data,
        });
    } catch (e) {
        yield put({
        type: LOAD_SINGLE_POST_FAILURE,
        error: e,
        });
    }
}
function* watchLoadSinglePost() {
    yield throttle(2000, LOAD_SINGLE_POST_REQUEST, loadSinglePost);
}
function loadSearchPostsAPI(keyword, lastId) {
    return axios.get(`/search/${encodeURIComponent(keyword)}?lastId=${lastId}`);
}
function* loadSearchPosts(action) {
    try {
        // console.log(action);
        const result = yield call(loadSearchPostsAPI, action.data, action.lastId);
        console.log(result);
        yield put({
        type: LOAD_SEARCH_POSTS_SUCCESS,
        data: result.data,
        });
    } catch (e) {
        yield put({
        type: LOAD_SEARCH_POSTS_FAILURE,
        error: e,
        });
    }
}
function* watchLoadSearchPost() {
    yield throttle(2000, LOAD_SEARCH_POSTS_REQUEST, loadSearchPosts);
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

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchLoadMainPosts),
        fork(watchLoadSinglePost),
        fork(watchLoadSearchPost),
        fork(watchUploadImages),
    ]);
}