import { defineRoute, routeParams } from '@app/common/navigation/routing';

import { ROUTING_INITIAL_COMPONENT_NAME } from './constants';

export const chatRouteDef = defineRoute({ path: '/chat', componentName: ROUTING_INITIAL_COMPONENT_NAME }, routeParams());
