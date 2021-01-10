import { defineModule } from '@app/bonfire/features';

import { saga } from './store/sagas';

const moduleDef = defineModule({
    name: 'app.views.auth',
    saga: saga,
});

export { moduleDef };
