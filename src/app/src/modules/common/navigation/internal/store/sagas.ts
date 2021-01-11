import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { msgSaga } from '@app/store';
import { put, SagaResult, takeEvery } from '@app/store/effects';
import { defineModule } from '@app/store/utils';

import { appStore } from '@app/core';
import { featureBootstrapBeganEvent, featureBootstrapDoneEvent, initializeAppDoneEvent } from '@app/core/messages';

import { runtimeHistory } from './utils';
import { FEATURE_COMMON_NAVIGATION_NAME } from '../constants';

const initializeAppDone = msgSaga(initializeAppDoneEvent, function* () {
    runtimeHistory.history = createBrowserHistory({});

    const historyReducer = connectRouter(runtimeHistory.history);

    const historyModuleDef = defineModule({
        name: 'router',
        reducer: historyReducer,
    });

    appStore.addFeature(historyModuleDef);
    appStore.addMiddlware(routerMiddleware(runtimeHistory.history));

    yield put(featureBootstrapDoneEvent({ featureName: FEATURE_COMMON_NAVIGATION_NAME }));
});

function* saga(): SagaResult<void> {
    yield put(featureBootstrapBeganEvent({ featureName: FEATURE_COMMON_NAVIGATION_NAME }));

    yield takeEvery(initializeAppDoneEvent, initializeAppDone);
}

export { saga };
