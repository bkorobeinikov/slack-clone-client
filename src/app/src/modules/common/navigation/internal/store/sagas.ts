import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { createJob, useJob } from '@app/store';
import { call, SagaResult } from '@app/store/effects';
import { defineModule } from '@app/store/utils';

import { appStore } from '@app/core';

import { runtimeHistory } from './utils';
import { initializationJobs } from '@app/core/internal/store/jobs';

const initializeJob = createJob(initializationJobs, function* () {
    runtimeHistory.history = createBrowserHistory({});

    const historyReducer = connectRouter(runtimeHistory.history);

    const historyModuleDef = defineModule({
        name: 'router',
        reducer: historyReducer,
    });

    appStore.addFeature(historyModuleDef);
    appStore.addMiddlware(routerMiddleware(runtimeHistory.history));

    yield call(() => 1);
});

function* saga(): SagaResult<void> {
    yield useJob(initializationJobs, initializeJob);
}

export { saga };
