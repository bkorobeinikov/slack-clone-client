import { createStore, compose, applyMiddleware, Store } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';

import isEmpty from 'lodash/isEmpty';

import { IReducersMap, combineReducers } from '@app/store/reducer';

import { BonfireFeatureType, IBonfireLazyModuleDef, IBonfireModuleDef } from './features';

type AnyBonfireFeatureDef = IBonfireModuleDef<void> | IBonfireLazyModuleDef;

interface IBonfire {
    getStore(): Store;
    addFeature(feature: AnyBonfireFeatureDef): void;
}

interface IBonfireOptions {
    features: AnyBonfireFeatureDef[];
}

function makeBonfire(options: IBonfireOptions): IBonfire {
    const features = [...options.features];

    const reducers: IReducersMap<any> = {};
    const sagas: { [featureName: string]: Task } = {};

    const initialReducers = combineReducers({ none: (state = 0) => state });
    const initialState: any = {};

    const sagaRuntime = createSagaMiddleware();

    const composeEnhancers = (globalThis as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(initialReducers, initialState, composeEnhancers(applyMiddleware(sagaRuntime)));

    // register reducers
    features.forEach(fDef => {
        if (fDef.type === BonfireFeatureType.Module) {
            if (fDef.reducer) {
                reducers[fDef.name] = fDef.reducer;
            }
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
        getStore: () => store,
        addFeature: (feature: AnyBonfireFeatureDef) => {
            if (feature.type === BonfireFeatureType.Module) {
                if (feature.reducer) {
                    reducers[feature.name] = feature.reducer;
                    store.replaceReducer(combineReducers(reducers));
                }
            }

            if (feature.saga) {
                sagas[feature.name] = sagaRuntime.run(feature.saga);
            }
        },
    };
}

export { IBonfire, makeBonfire };
