import { defineMsg, withPayload } from '@app/store';
import { featureDef } from '../def';

import { IAppConfig, IAppInitializeOptions } from '../models';

export const initializeAppAction = defineMsg(
    featureDef,
    'initialize_app',
    withPayload<{
        options: IAppInitializeOptions;
    }>(),
);

export const initializeAppDoneEvent = defineMsg(
    featureDef,
    'initialize_app_done',
    withPayload<{
        appConfig: IAppConfig;
    }>(),
);

export const appReadyEvent = defineMsg(featureDef, 'app/core/app_ready', withPayload());
