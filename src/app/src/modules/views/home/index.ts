import * as React from 'react';

import { defineModule } from '@app/store/utils';
import { put } from '@app/store/effects';

import { componentRegistry } from '@app/ui';

import { registerRouteAction } from '@app/common/navigation/messages';

import { homeRouteDef } from './internal/routing';
import { LAZY_FEATURE_VIEWS_HOME_NAME, ROUTING_INITIAL_COMPONENT_NAME } from './internal/constants';

const HomeViewLazy = React.lazy(async () => {
    const { HomeView } = await import('./internal/components');

    return { default: HomeView };
});

const homeViewDef = defineModule({
    name: LAZY_FEATURE_VIEWS_HOME_NAME,
    saga: function* () {
        componentRegistry.addComponent(ROUTING_INITIAL_COMPONENT_NAME, HomeViewLazy);

        yield put(
            registerRouteAction({
                routes: [homeRouteDef],
            }),
        );
    },
});

export { homeViewDef };
