import { AnyRoute, ExtractRouteParams } from '@app/store';
import type { History } from 'history';
import { generatePath as generatePathInternal } from 'react-router-dom';

export const runtimeHistory: {
    history: History;
} = {
    history: null,
};

export function generatePath<TRouteDef extends AnyRoute>(routeDef: TRouteDef, params: ExtractRouteParams<TRouteDef>): string {
    return generatePathInternal(routeDef.path, params);
}
