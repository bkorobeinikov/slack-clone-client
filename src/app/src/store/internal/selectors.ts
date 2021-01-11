import { createSelector } from 'reselect';

import { ExtractReducerState, IReducer } from './reducer';

export { createSelector };

export function defineFeatureSelector<TState, TReducer extends IReducer<TState>>(
    featureName: string,
    _reducer: TReducer,
): (store: Record<string, unknown>) => ExtractReducerState<TReducer> {
    return store => store[featureName] as ExtractReducerState<TReducer>;
}
