import * as React from 'react';
import { defineModule } from '@app/store/utils';
import { put } from '@app/store/effects';

import { componentRegistry } from '@app/utils/component-registry';

import { registerRouteAction } from '@app/common/navigation/messages';

const AuthViewLazy = React.lazy(async () => {
    const { AuthView } = await import('@app/views/auth/internal/components');

    return { default: AuthView };
});

const authViewDef = defineModule({
    name: 'app.views.auth.lazy',
    saga: function* () {
        const viewName = 'app.view.auth.view';

        componentRegistry.addComponent(viewName, AuthViewLazy);

        yield put(
            registerRouteAction({
                routes: [
                    {
                        path: '/',
                        viewComponentName: viewName,
                    },
                ],
            }),
        );
    },
});

export { authViewDef };
