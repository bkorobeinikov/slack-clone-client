import { createSelector, createFeatureSelector } from '@app/store';

import { featureDef } from '../def';

const getState = createFeatureSelector(featureDef);

const getRoutes = createSelector(getState, state => state.routes);

export { getRoutes };
