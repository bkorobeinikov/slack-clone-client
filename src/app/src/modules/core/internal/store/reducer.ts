import { defineReducer, mutate } from '@app/store';

import { appReadyEvent, featureBootstrapBeganEvent, featureBootstrapDoneEvent, initializeAppDoneEvent } from './messages';
import { IAppConfig } from './models';

interface IState {
    appConfig: IAppConfig;

    bootstrapping: { [featureName: string]: boolean };

    ready: boolean;
}

const initialState: IState = {
    appConfig: null,
    bootstrapping: {},
    ready: false,
};

const reducer = defineReducer<IState>(initialState, [
    mutate(initializeAppDoneEvent, (state, { payload }) => {
        return {
            ...state,
            appConfig: payload.appConfig,
        };
    }),
    mutate(featureBootstrapBeganEvent, (state, { payload }) => {
        if (state.ready) {
            if (DEBUG) {
                throw new Error('featureBoostrapBeganEvent cannot be called when appReady is true');
            }

            return state;
        }

        return {
            ...state,
            bootstrapping: { ...state.bootstrapping, [payload.featureName]: true },
        };
    }),
    mutate(featureBootstrapDoneEvent, (state, { payload }) => {
        if (state.ready) {
            if (DEBUG) {
                throw new Error('featureBoostrapDoneEvent cannot be called when appReady is true');
            }

            return state;
        }

        const bootstrapping = { ...state.bootstrapping };
        delete bootstrapping[payload.featureName];

        return {
            ...state,
            bootstrapping,
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
