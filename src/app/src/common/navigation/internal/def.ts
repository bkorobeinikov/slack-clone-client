import { defineModule } from '@app/bonfire/features';

import { reducer } from './store/reducer';
import { saga } from './store/sagas';

const moduleDef = defineModule({
    name: 'app.common.navigation',
    reducer: reducer,
    saga: saga,
});

export { moduleDef };
