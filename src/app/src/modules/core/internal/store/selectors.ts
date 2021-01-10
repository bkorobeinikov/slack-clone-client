import { createSelector, createSelectorEx } from '@app/store';

import { moduleDef } from '../def';

const getState = createSelectorEx(moduleDef);

const getIsAppReady = createSelector(getState, state => state.ready);

export { getIsAppReady };
