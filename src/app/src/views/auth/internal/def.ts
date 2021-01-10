import { defineModule } from '@app/store/utils';

import { saga } from './store/sagas';

const moduleDef = defineModule({
    name: 'app.views.auth',
    saga: saga,
});

export { moduleDef };
