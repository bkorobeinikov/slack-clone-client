import { createStore } from '@app/store/utils';

import { moduleDef } from './def';

const bonfire = createStore({ features: [moduleDef] });

export { bonfire };
