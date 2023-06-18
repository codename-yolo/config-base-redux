import {
    call,
    put,
    takeLatest,
    race,
} from 'redux-saga/effects';

import { requestGetProfileCompleted, requestGetProfileError } from './actions';
import actionTypes from './constants';
import profileServices from './services';

function* requestGetProfile(input: any) {
    try {
        const { output } = yield race({
            output: call(profileServices.getProfile, input.payload, () => {console.log('meta');}),
        });
        if (output) {
            yield put(requestGetProfileCompleted(output));
        }
    } catch (error) {
        yield put(requestGetProfileError());
    }
}

export default function* watchProfileScreenAction() {
    yield takeLatest(
        actionTypes.REQUEST_GET_PROFILE_START,
        requestGetProfile,
    );
}
