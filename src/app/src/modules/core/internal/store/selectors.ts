import { createSelector, createFeatureSelector } from '@app/store';

import { featureDef } from '../def';

const getState = createFeatureSelector(featureDef);

const getAppConfig = createSelector(getState, state => state.appConfig);
const getIsAppReady = createSelector(getState, state => state.ready);

export { getAppConfig, getIsAppReady };
