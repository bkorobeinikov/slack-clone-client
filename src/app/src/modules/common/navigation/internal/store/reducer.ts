import { createReducer, mutate } from '@app/store';

import keyBy from 'lodash/keyBy';

import { featureDef } from '../def';
import { registerRouteAction } from './messages';

const reducer = createReducer(
    featureDef,
    {
        routes: [],
    },
    [
        mutate(registerRouteAction, (state, msg) => {
            const { routes: routesToAdd } = msg.payload;

            const routes = [...state.routes];
            const routesByPath = keyBy(routes, r => r.path);

            for (const routeToAdd of routesToAdd) {
                if (!routesByPath[routeToAdd.path]) {
                    routes.push(routeToAdd);
                }
            }

            return {
                ...state,
                routes,
            };
        }),
    ],
);

export { reducer };
