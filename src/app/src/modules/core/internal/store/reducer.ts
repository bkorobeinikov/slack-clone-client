import { createReducer, mutate } from '@app/store';

import { featureDef } from '../def';

import { appReadyEvent, initializeAppDoneEvent } from './messages';

export const reducer = createReducer(
    featureDef,
    {
        appConfig: null,
        ready: false,
    },
    [
        mutate(initializeAppDoneEvent, (state, { payload }) => {
            return {
                ...state,
                appConfig: payload.appConfig,
            };
        }),
        mutate(appReadyEvent, state => {
            return {
                ...state,
                ready: true,
            };
        }),
    ],
);
