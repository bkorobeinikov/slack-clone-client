import { createSelector } from 'reselect';

import { createModuleStateSelector } from '@app/utils/store';

import { moduleDef } from '../def';

const getState = createModuleStateSelector(moduleDef);

const getIsAppReady = createSelector(getState, state => state.ready);

export { getIsAppReady };
