import { defineMsg, msgPayload } from '@app/store';

export const initializeAppAction = defineMsg('app/common/core/initialize_app', msgPayload<{}>());
export const initializeAppDoneEvent = defineMsg('app/common/core/initialize_app_done', msgPayload<{}>());

export const appReadyEvent = defineMsg('app/common/core/app_ready', msgPayload<{}>());
