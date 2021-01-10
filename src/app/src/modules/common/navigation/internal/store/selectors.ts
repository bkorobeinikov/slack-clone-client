import { createSelector, createSelectorEx } from '@app/store';

import { moduleDef } from '../def';

const getState = createSelectorEx(moduleDef);

const getRoutes = createSelector(getState, state => state.routes);

export { getRoutes };
