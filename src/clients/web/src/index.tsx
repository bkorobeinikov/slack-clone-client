import './shim';

import { defineModule } from '@app/store/utils';
import { put } from '@app/store/effects';

import { appStore } from '@app/core';
import { initializeAppAction } from '@app/core/messages';

import { chatViewDef } from '@app/views/chat';
import { authViewDef } from '@app/views/auth';
import { rootViewDef } from '@app/views/root';

appStore.addFeature(chatViewDef);
appStore.addFeature(authViewDef);
appStore.addFeature(rootViewDef);

appStore.addFeature(
    defineModule({
        name: 'app.clients.web',
        saga: function* () {
            yield put(initializeAppAction({ options: { basename: 'dist/web' } }));
        },
    }),
);
