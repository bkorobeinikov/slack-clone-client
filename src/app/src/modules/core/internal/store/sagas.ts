import { msgSaga, runJobs } from '@app/store';
import { put, SagaResult, takeEvery } from '@app/store/effects';

import { appReadyEvent, initializeAppAction, initializeAppDoneEvent } from './messages';
import { initializationJobs } from './jobs';

const initializeApp = msgSaga(initializeAppAction, function* () {
    // do some initialization work here
    // yield delay(1000);

    yield put(initializeAppDoneEvent({ appConfig: {} }));

    // do some more work here
    // yield delay(1000);

    yield runJobs(initializationJobs);

    yield put(appReadyEvent({}));
});

export function* saga(): SagaResult<void> {
    yield takeEvery(initializeAppAction, initializeApp);
}
