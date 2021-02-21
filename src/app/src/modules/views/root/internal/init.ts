import { rootViewDef } from './def';
import { RootView } from './components';
import { saga } from './store/sagas';

export const rootView = rootViewDef.create({
    viewComponent: RootView,
    saga: saga,
});
