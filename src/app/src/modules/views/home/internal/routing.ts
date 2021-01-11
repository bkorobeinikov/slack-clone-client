import { defineRoute, routeParams } from '@app/common/navigation/routing';

import { ROUTING_INITIAL_COMPONENT_NAME } from './constants';

export const homeRouteDef = defineRoute({ path: '/', componentName: ROUTING_INITIAL_COMPONENT_NAME }, routeParams());
