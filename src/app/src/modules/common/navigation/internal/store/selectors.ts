import { createSelector, defineFeatureSelector } from '@app/store';

import { FEATURE_COMMON_NAVIGATION_NAME } from '../constants';
import { reducer } from './reducer';

const getState = defineFeatureSelector(FEATURE_COMMON_NAVIGATION_NAME, reducer);

const getRoutes = createSelector(getState, state => state.routes);

export { getRoutes };
