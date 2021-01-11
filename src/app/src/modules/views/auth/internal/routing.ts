import { defineRoute, routeParams } from '@app/common/navigation/routing';

import { ROUTING_INITIAL_COMPONENT_NAME } from './constants';

export const authRouteDef = defineRoute({ path: '/auth', componentName: ROUTING_INITIAL_COMPONENT_NAME }, routeParams());
