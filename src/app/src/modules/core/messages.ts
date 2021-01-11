import './internal/init';

import { asReadOnly } from '@app/store';

import {
    initializeAppAction,
    initializeAppDoneEvent,
    featureBootstrapBeganEvent,
    featureBootstrapDoneEvent,
    appReadyEvent,
} from './internal/store/messages';

const initializeAppDoneEventReadOnly = asReadOnly(initializeAppDoneEvent);
const appReadyEventReadOnly = asReadOnly(appReadyEvent);

export {
    initializeAppAction,
    initializeAppDoneEventReadOnly as initializeAppDoneEvent,
    featureBootstrapBeganEvent,
    featureBootstrapDoneEvent,
    appReadyEventReadOnly as appReadyEvent,
};
