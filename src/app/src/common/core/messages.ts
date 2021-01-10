import './internal/init';

import { asReadOnly } from '@app/store';

import { initializeAppAction, appReadyEvent, initializeAppDoneEvent } from './internal/store/messages';

const appReadyEventReadOnly = asReadOnly(appReadyEvent);
const initializeAppDoneEventReadOnly = asReadOnly(initializeAppDoneEvent);

export { initializeAppAction, appReadyEventReadOnly as appReadyEvent, initializeAppDoneEventReadOnly as initializeAppDoneEvent };
