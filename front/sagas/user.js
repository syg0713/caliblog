import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
} from "../reducers/user";


// function logInAPI(loginData) {
//     return axios.post("/user/login", loginData, {
//         withCredentials: true,
//     });
// }

function* logIn(action) {
    try {
        // const result = yield call(logInAPI, action.data);
        yield put({
            // put은 dispatch와 동일
            type: LOG_IN_SUCCESS,
            // data: result.data,
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



export default function* userSaga() {
    yield all([
        fork(watchLogIn),
    ]);
}
