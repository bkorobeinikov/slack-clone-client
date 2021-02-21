import './shim';

import { put } from '@app/store/effects';

import { appStore, initializeAppAction } from '@app/core';

import { chatView } from '@app/views/chat';
import { authView } from '@app/views/auth';
import { homeView } from '@app/views/home';
import { rootView } from '@app/views/root';
import { defineFeature, withState } from '@app/store';

appStore.addFeature(chatView);
appStore.addFeature(authView);
appStore.addFeature(homeView);
appStore.addFeature(rootView);

const featureDef = defineFeature({ featureName: 'app.clients.web' }, withState());
const feature = featureDef.create({
    saga: function* () {
        yield put(initializeAppAction({ options: {} }));
    },
});

appStore.addFeature(feature);
