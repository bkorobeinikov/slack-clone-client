import { defineModule } from '@app/store/utils';

import { FEATURE_VIEWS_AUTH_NAME } from './constants';
import { saga } from './store/sagas';

const moduleDef = defineModule({
    name: FEATURE_VIEWS_AUTH_NAME,
    saga: saga,
});

export { moduleDef };
