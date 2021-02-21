import { featureDef } from './def';

import { AuthView } from './components';
import { saga } from './store/sagas';

const feature = featureDef.create({
    saga: saga,
    viewComponent: AuthView,
});

export { feature };
