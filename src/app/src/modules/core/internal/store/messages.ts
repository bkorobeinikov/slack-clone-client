import { defineMsg, msgPayload } from '@app/store';

export const initializeAppAction = defineMsg('app/core/initialize_app', msgPayload<{}>());
export const initializeAppDoneEvent = defineMsg('app/core/initialize_app_done', msgPayload<{}>());

export const appReadyEvent = defineMsg('app/core/app_ready', msgPayload<{}>());
