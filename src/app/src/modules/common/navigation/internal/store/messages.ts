import { defineMsg, msgPayload } from '@app/store';
import { IRouteDef } from './models/routing';

export const registerRouteAction = defineMsg(
    'app/common/navigation/register_route',
    msgPayload<{
        routes: IRouteDef[];
    }>(),
);

export const navigateTo = defineMsg(
    'app/common/navigation/navigate_to',
    msgPayload<{
        path: string;
    }>(),
);
