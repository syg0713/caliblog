import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import post from './post';
import { backUrl } from '../config/config';

// axios.defaults.baseURL = 'http://localhost:3065/api';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(user),
    fork(post),
  ]);
}
