import {
    call,
    put,
    takeLatest,
    race,
} from 'redux-saga/effects';

import { requestGetPostsCompleted, requestGetPostsError } from './actions';
import actionTypes from './constants';
import homeServices from './services';

function* requestGetPosts(input: any) {
    try {
        const { output } = yield race({
            output: call(homeServices.getPosts, input.payload),
        });
        if (output) {
            yield put(requestGetPostsCompleted(output));
        }
    } catch (error) {
        yield put(requestGetPostsError());
    }
}

export default function* watchForgotPasswordScreenAction() {
    console.log('saga');
    yield takeLatest(
        actionTypes.REQUEST_GET_POSTS_START,
        requestGetPosts,
    );
}
