import { createSelector } from 'reselect';

import { IFeatureDef } from './feature';

export { createSelector };

export function createFeatureSelector<FeatureName extends string, TState>(
    featureDef: IFeatureDef<FeatureName, TState>,
): (store: Record<string, unknown>) => TState {
    return store => store[featureDef.featureName] as TState;
}
