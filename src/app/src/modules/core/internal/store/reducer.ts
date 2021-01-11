import { defineReducer, mutate } from '@app/store';

import { appReadyEvent, initializeAppDoneEvent } from './messages';
import { IAppConfig } from './models';

interface IState {
    appConfig: IAppConfig;

    ready: boolean;
}

const initialState: IState = {
    appConfig: null,
    ready: false,
};

const reducer = defineReducer<IState>(initialState, [
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
]);

export { reducer, IState };
