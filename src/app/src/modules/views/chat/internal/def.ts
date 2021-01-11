import { defineModule } from '@app/store/utils';

import { FEATURE_VIEWS_CHAT_NAME } from './constants';

const moduleDef = defineModule({
    name: FEATURE_VIEWS_CHAT_NAME,
    reducer: null,
    saga: null,
});

export { moduleDef };
