import { defineMsg, msgPayload } from '@app/store';
import { IRoute } from './models/route';

export const registerRouteAction = defineMsg(
    'app/common/navigation/register_route',
    msgPayload<{
        routes: IRoute[];
    }>(),
);
