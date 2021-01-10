import { defineReducer, onMsg } from '@app/store';
import { registerRouteAction } from './messages';

import keyBy from 'lodash/keyBy';

import { IRoute } from './models/route';

interface IState {
    routes: IRoute[];
}

const initialState: IState = {
    routes: [],
};

const reducer = defineReducer(initialState, [
    onMsg(registerRouteAction, (state, msg) => {
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
