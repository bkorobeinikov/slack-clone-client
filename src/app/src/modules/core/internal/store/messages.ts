import { defineMsg, msgPayload } from '@app/store';

import { IAppConfig, IAppInitializeOptions } from './models';

export const initializeAppAction = defineMsg(
    'app/core/initialize_app',
    msgPayload<{
        options: IAppInitializeOptions;
    }>(),
);
export const initializeAppDoneEvent = defineMsg(
    'app/core/initialize_app_done',
    msgPayload<{
        appConfig: IAppConfig;
    }>(),
);

export const appReadyEvent = defineMsg('app/core/app_ready', msgPayload());
