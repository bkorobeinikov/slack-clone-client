import { defineModule } from '@app/store/utils';

import { reducer } from './store/reducer';
import { saga } from './store/sagas';

const moduleDef = defineModule({
    name: 'app.core',
    reducer: reducer,
    saga: saga,
});

export { moduleDef };
