import { defineModule } from '@app/store/utils';

import { saga } from './store/sagas';

const rootViewDef = defineModule({
    name: 'app.views.root',
    reducer: null,
    saga: saga,
});

export { rootViewDef };
