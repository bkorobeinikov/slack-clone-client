import { msgSaga } from '@app/store';
import { registerRouteAction } from './messages';

const registerRoute = msgSaga(registerRouteAction, function* (msg) {});

function* saga() {}

export { saga };
