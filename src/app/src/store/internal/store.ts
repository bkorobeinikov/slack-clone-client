import { createStore as createReduxStore, compose, applyMiddleware, Store, Middleware } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';

import isEmpty from 'lodash/isEmpty';

import { IReducer, IReducersMap, combineReducers } from './reducer';
import { SagaResult } from './effects';
import { AnyMessage } from './message';
import { createDynamicMiddlewares } from './middlewares';

export interface IStoreModuleDefOptions<TState> {
    name: string;
    reducer?: IReducer<TState>;
    saga?: () => SagaResult<void>;
}

export interface IStoreModuleDef<TState = void> {
    readonly name: string;
    reducer?: IReducer<TState>;
    saga?: () => SagaResult<void>;
}

export function defineModule<TState = void>(options: IStoreModuleDefOptions<TState>): IStoreModuleDef<TState> {
    return {
        name: options.name,
        reducer: options.reducer,
        saga: options.saga,
    };
}

export interface IStore {
    getReduxStore(): Store<Record<string, unknown>, AnyMessage>;
    addFeature<TState>(feature: IStoreModuleDef<TState>): void;
    addMiddlware(middlware: Middleware): void;
}

export interface IStoreOptions {
    features: IStoreModuleDef<unknown>[];
}

export function createStore(options: IStoreOptions): IStore {
    const features = [...options.features];

    const reducers: IReducersMap<Record<string, unknown>> = {};
    const sagas: { [featureName: string]: Task } = {};

    const initialReducers = combineReducers<Record<string, unknown>>({ none: (state = 0) => state });
    const initialState: Record<string, unknown> = { none: 0 };

    const sagaRuntime = createSagaMiddleware();
    const dynamicMiddlwares = createDynamicMiddlewares();

    const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;
    const store = createReduxStore(initialReducers, initialState, composeEnhancers(applyMiddleware(sagaRuntime, dynamicMiddlwares.enhancer)));

    // register reducers
    features.forEach(fDef => {
        if (fDef.reducer) {
            reducers[fDef.name] = fDef.reducer;
        }
    });

    if (!isEmpty(reducers)) {
        store.replaceReducer(combineReducers(reducers));
    }

    // register sagas
    features.forEach(fDef => {
        if (fDef.saga) {
            sagas[fDef.name] = sagaRuntime.run(fDef.saga);
        }
    });

    return {
        getReduxStore: () => store,
        addFeature: feature => {
            if (feature.reducer) {
                reducers[feature.name] = feature.reducer;
                store.replaceReducer(combineReducers(reducers));
            }

            if (feature.saga) {
                sagas[feature.name] = sagaRuntime.run(feature.saga);
            }
        },
        addMiddlware: (middlware: Middleware) => {
            dynamicMiddlwares.addMiddleware(middlware);
        },
    };
}
