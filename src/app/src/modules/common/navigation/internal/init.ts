import { featureDef } from './def';
import { reducer } from './store/reducer';
import { saga } from './store/sagas';

export const feature = featureDef.create({
    reducer: reducer,
    saga: saga,
});
