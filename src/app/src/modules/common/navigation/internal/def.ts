import { defineModule } from '@app/store/utils';

import { FEATURE_COMMON_NAVIGATION_NAME } from './constants';
import { reducer } from './store/reducer';
import { saga } from './store/sagas';

const moduleDef = defineModule({
    name: FEATURE_COMMON_NAVIGATION_NAME,
    reducer: reducer,
    saga: saga,
});

export { moduleDef };
