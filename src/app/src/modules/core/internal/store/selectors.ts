import { createSelector, defineFeatureSelector } from '@app/store';

import { FEATURE_COMMON_CORE_NAME } from '../constants';
import { reducer } from './reducer';

const getState = defineFeatureSelector(FEATURE_COMMON_CORE_NAME, reducer);

const getAppConfig = createSelector(getState, state => state.appConfig);
const getBootstrapping = createSelector(getState, state => state.bootstrapping);
const getIsAppReady = createSelector(getState, state => state.ready);

export { getAppConfig, getBootstrapping, getIsAppReady };
