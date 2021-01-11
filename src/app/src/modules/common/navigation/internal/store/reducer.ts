import { defineReducer, mutate } from '@app/store';

import keyBy from 'lodash/keyBy';

import { registerRouteAction } from './messages';
import { IRoute } from './models/route';

interface IState {
    routes: IRoute[];
}

const initialState: IState = {
    routes: [],
};

const reducer = defineReducer(initialState, [
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
]);

export { reducer, IState };
