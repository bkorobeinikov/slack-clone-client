import { createStore as createReduxStore, compose, applyMiddleware, Store, Middleware } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';

import isEmpty from 'lodash/isEmpty';

import { IReducersMap, combineReducers } from './reducer';
import { AnyMessage } from './message';
import { createStoreMiddlwareMngr } from './middlewares';
import { IFeature } from './feature';

export interface IStore {
    getReduxStore(): Store<Record<string, unknown>, AnyMessage>;
    addFeature<TState>(feature: IFeature<TState>): void;
    addMiddlware(middlware: Middleware): void;
}

export interface IStoreOptions {
    features: IFeature<unknown>[];
}

export function createStore(options: IStoreOptions): IStore {
    const features = [...options.features];

    const reducers: IReducersMap<Record<string, unknown>> = {};
    const sagas: { [featureName: string]: Task } = {};

    const initialReducers = combineReducers<Record<string, unknown>>({ none: (state = 0) => state });
    const initialState: Record<string, unknown> = { none: 0 };

    const sagaRuntime = createSagaMiddleware();
    const middlwares = createStoreMiddlwareMngr();

    const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;
    const store = createReduxStore(initialReducers, initialState, composeEnhancers(applyMiddleware(sagaRuntime, middlwares.enhancer)));

    // register reducers
    features.forEach(fDef => {
        if (fDef.reducer) {
            reducers[fDef.featureName] = fDef.reducer;
        }
    });

    if (!isEmpty(reducers)) {
        store.replaceReducer(combineReducers(reducers));
    }

    // register sagas
    features.forEach(fDef => {
        if (fDef.saga) {
            sagas[fDef.featureName] = sagaRuntime.run(fDef.saga);
        }
    });

    return {
        getReduxStore: () => store,
        addFeature: feature => {
            if (feature.reducer) {
                reducers[feature.featureName] = feature.reducer;
                store.replaceReducer(combineReducers(reducers));
            }

            if (feature.saga) {
                sagas[feature.featureName] = sagaRuntime.run(feature.saga);
            }
        },
        addMiddlware: (middlware: Middleware) => {
            middlwares.addMiddleware(middlware);
        },
    };
}
