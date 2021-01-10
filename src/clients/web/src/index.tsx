import './shim';

import { defineModule } from '@app/bonfire/features';

import { bonfire } from '@app/common/core';
import { initializeAppAction } from '@app/common/core/messages';

import { authViewDef } from '@app/views/auth';
import { rootViewDef } from '@app/views/root';
import { put } from '@app/store/effects';

bonfire.addFeature(authViewDef);
bonfire.addFeature(rootViewDef);

bonfire.addFeature(
    defineModule({
        name: 'app.clients.web',
        saga: function* () {
            yield put(initializeAppAction({}));
        },
    }),
);
