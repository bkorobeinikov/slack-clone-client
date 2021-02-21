import { AnyRoute, defineMsg, withPayload } from '@app/store';

import { featureDef } from '../def';

export const registerRouteAction = defineMsg(
    featureDef,
    'register_route',
    withPayload<{
        routes: AnyRoute[];
    }>(),
);

export const navigateToAction = defineMsg(
    featureDef,
    'navigate_to',
    withPayload<{
        path: string;
    }>(),
);
