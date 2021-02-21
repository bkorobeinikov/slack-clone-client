import { createStore } from '@app/store/utils';

import { featureDef } from './def';
import { reducer } from './store/reducer';
import { saga } from './store/sagas';

const feature = featureDef.create({ reducer, saga });

const appStore = createStore({ features: [feature] });

export { appStore };
