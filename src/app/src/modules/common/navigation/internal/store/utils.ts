import type { History } from 'history';
import { generatePath as generatePathInternal } from 'react-router-dom';

import { ExtractRouteParams, IRouteDef, IRouteDefOptions, RouteParams } from './models';

export const runtimeHistory: {
    history: History;
} = {
    history: null,
};

export const routeParams = <TParams extends RouteParams = Record<string, never>>(_params?: TParams): TParams => null;

export function defineRoute<TParams extends RouteParams = Record<string, never>>(options: IRouteDefOptions, _params: TParams): IRouteDef<TParams> {
    return {
        path: options.path,
        componentName: options.componentName,
    };
}

export function generatePath<TRouteDef extends IRouteDef>(routeDef: TRouteDef, params: ExtractRouteParams<TRouteDef>): string {
    return generatePathInternal(routeDef.path, params);
}
