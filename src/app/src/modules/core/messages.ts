import './internal/init';

import { asReadOnly } from '@app/store';

import { initializeAppAction, appReadyEvent, initializeAppDoneEvent } from './internal/store/messages';

const initializeAppDoneEventReadOnly = asReadOnly(initializeAppDoneEvent);
const appReadyEventReadOnly = asReadOnly(appReadyEvent);

export { initializeAppAction, initializeAppDoneEventReadOnly as initializeAppDoneEvent, appReadyEventReadOnly as appReadyEvent };
