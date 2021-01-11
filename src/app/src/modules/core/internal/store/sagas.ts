import isEmpty from 'lodash/isEmpty';

import { msgSaga } from '@app/store';
import { put, SagaResult, select, take, takeEvery } from '@app/store/effects';

import { appReadyEvent, featureBootstrapDoneEvent, initializeAppAction, initializeAppDoneEvent } from './messages';
import { getBootstrapping } from './selectors';

const initializeApp = msgSaga(initializeAppAction, function* () {
    // do some initialization work here
    // yield delay(1000);

    yield put(initializeAppDoneEvent({ appConfig: {} }));

    // do some more work here
    // yield delay(1000);

    let bootstrapping = yield* select(getBootstrapping);
    while (true) {
        if (isEmpty(bootstrapping)) {
            break;
        }

        yield take(featureBootstrapDoneEvent);
        bootstrapping = yield* select(getBootstrapping);
    }

    yield put(appReadyEvent({}));
});

export function* saga(): SagaResult<void> {
    yield takeEvery(initializeAppAction, initializeApp);
}
