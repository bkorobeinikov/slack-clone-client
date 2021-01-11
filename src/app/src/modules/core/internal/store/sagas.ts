import { msgSaga } from '@app/store';
import { delay, put, SagaResult, takeEvery } from '@app/store/effects';

import { appReadyEvent, initializeAppAction, initializeAppDoneEvent } from './messages';

const initializeApp = msgSaga(initializeAppAction, function* (msg) {
    // do some initialization work here
    yield delay(1000);

    yield put(initializeAppDoneEvent({ appConfig: { basename: msg.payload.options.basename } }));

    // do some more work here
    yield delay(1000);

    yield put(appReadyEvent({}));
});

export function* saga(): SagaResult<void> {
    yield takeEvery(initializeAppAction, initializeApp);
}
