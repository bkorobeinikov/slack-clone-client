import { createSelector, createSelectorEx } from '@app/store';

import { moduleDef } from '../def';

const getState = createSelectorEx(moduleDef);

const getAppConfig = createSelector(getState, state => state.appConfig);
const getIsAppReady = createSelector(getState, state => state.ready);

export { getAppConfig, getIsAppReady };
