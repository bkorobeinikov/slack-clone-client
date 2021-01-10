import { defineModule } from '@app/bonfire/features';

import { MODULE_COMMON_CORE } from './constants';
import { reducer } from './store/reducer';
import { saga } from './store/sagas';

const moduleDef = defineModule({
    name: MODULE_COMMON_CORE,
    reducer: reducer,
    saga: saga,
});

export { moduleDef };
