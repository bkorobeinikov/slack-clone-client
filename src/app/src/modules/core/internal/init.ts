import { createStore } from '@app/store/utils';

import { moduleDef } from './def';

const appStore = createStore({ features: [moduleDef] });

export { appStore };
