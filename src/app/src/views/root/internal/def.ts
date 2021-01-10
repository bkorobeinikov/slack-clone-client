import { defineModule } from '@app/bonfire/features';

import { saga } from './store/sagas';

const rootViewDef = defineModule({
    name: 'app.views.root',
    reducer: null,
    saga: saga,
});

export { rootViewDef };
