import * as React from 'react';

import { defineModule } from '@app/store/utils';
import { put } from '@app/store/effects';

import { componentRegistry } from '@app/ui';

import { registerRouteAction } from '@app/common/navigation/messages';

import { LAZY_FEATURE_VIEWS_AUTH_NAME } from './internal/constants';
import { authRouteDef } from './internal/routing';

const AuthViewLazy = React.lazy(async () => {
    const { AuthView } = await import('./internal/components');

    return { default: AuthView };
});

const authViewDef = defineModule({
    name: LAZY_FEATURE_VIEWS_AUTH_NAME,
    saga: function* () {
        componentRegistry.addComponent(LAZY_FEATURE_VIEWS_AUTH_NAME, AuthViewLazy);

        yield put(
            registerRouteAction({
                routes: [authRouteDef],
            }),
        );
    },
});

export { authViewDef };
