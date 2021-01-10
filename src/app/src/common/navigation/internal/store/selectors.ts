import { createSelector } from 'reselect';

import { createModuleStateSelector } from '@app/utils/store';

import { moduleDef } from '../def';

const getState = createModuleStateSelector(moduleDef);

const getRoutes = createSelector(getState, state => state.routes);

export { getRoutes };
