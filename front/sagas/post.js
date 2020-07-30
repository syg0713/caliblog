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
    UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    LOAD_MAIN_POSTS_ALL_REQUEST,
    LOAD_MAIN_POSTS_ALL_SUCCESS,
    LOAD_MAIN_POSTS_ALL_FAILURE,
    CURRENT_PAGE_NUMBER_REQUEST,
    CURRENT_PAGE_NUMBER_SUCCESS,
    CURRENT_PAGE_NUMBER_FAILURE,
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
function loadMainPostsAPI(lastId = 0, limit = 10, offset = 0) {
    return axios.get(`/posts?lastId=${lastId}&limit=${limit}&offset=${offset}`);
}
function* loadMainPosts(action) {
    try {
        // console.log(action.offset);
        const result = yield call(loadMainPostsAPI, action.lastId, action.limit, action.offset);
        // console.log(result.data.postsAll.length,'last id');
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
        // console.log(action);
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
function loadMainPostsAllAPI(limit = 10) {
    return axios.get(`/posts?lastId=${lastId}`);
}
function* loadMainPostsAll(action) {
    try {
        const result = yield call(loadMainPostsAllAPI, action.lastId);
        yield put({
        type: LOAD_MAIN_POSTS_ALL_SUCCESS,
        data: result.data,
        });
    } catch (e) {
        yield put({
        type: LOAD_MAIN_POSTS_ALL_FAILURE,
        error: e,
        });
    }
}
function* watchLoadMainPostsAll() {
    yield throttle(2000, LOAD_MAIN_POSTS_ALL_REQUEST, loadMainPostsAll);
    // yield throttle(2000, LOAD_MAIN_POSTS_All_REQUEST, loadMainPostsAll);
}
function currentPageNumberAPI() {
    return axios.get(`/posts?limit=${limit}`);
}
function* currentPageNumber(action) {
    try {
        // const result = yield call(currentPageNumberAPI, action.lastId);
        yield put({
        type: CURRENT_PAGE_NUMBER_SUCCESS,
        // data: result.data,
        });
    } catch (e) {
        yield put({
        type: CURRENT_PAGE_NUMBER_FAILURE,
        error: e,
        });
    }
}
function* watchCurrentPageNumber() {
    yield throttle(2000, CURRENT_PAGE_NUMBER_REQUEST, currentPageNumber);
    // yield throttle(2000, LOAD_MAIN_POSTS_All_REQUEST, loadMainPostsAll);
}
// function updateCurrentPageAPI(limit = 10) {
//     return axios.get(`/posts?limit=${limit}`);
// }
// function* updateCurrentPage(action) {
//     try {
//         const result = yield call(updateCurrentPageAPI, action.data);
//         yield put({
//         type: UPDATE_CURRENT_PAGE_SUCCESS,
//         data: result.data,
//         });
//     } catch (e) {
//         yield put({
//         type: UPDATE_CURRENT_PAGE_FAILURE,
//         error: e,
//         });
//     }
// }
// function* watchUpdateCurrentPage() {
//     yield throttle(2000, UPDATE_CURRENT_PAGE_REQUEST, updateCurrentPage);
// }
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchUploadImages),
        fork(watchLoadMainPosts),
        fork(watchLoadSinglePost),
        fork(watchRemovePost),
        fork(watchLoadMainPostsAll),
        fork(watchCurrentPageNumber)
    ]);
}