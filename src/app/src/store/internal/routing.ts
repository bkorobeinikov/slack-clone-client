/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFeatureDef, IFeatureDefWithView } from './feature';

export interface IRouteDefOptions<TPath extends string> {
    path: TPath;
}

export type RouteParams = Record<string, string | number | boolean>;
export interface NoParams extends Record<string, never> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IRouteDef<_TFeatureDef extends IFeatureDef<any, any>, TPath, _TParams extends RouteParams = Record<string, never>> {
    path: TPath;
}

export type ExtractRouteParams<TRouteDef> = TRouteDef extends IRouteDef<infer _TPath, infer TParams> ? TParams : never;

export type AnyRoute = IRouteDef<any, any, any>;

export const withParams = <TParams extends RouteParams = NoParams>(_params?: TParams): TParams => null;

export function defineRoute<
    TFeatureDef extends IFeatureDefWithView<any, any>,
    TPath extends string,
    TParams extends RouteParams = Record<string, never>
>(_featureDef: TFeatureDef, options: IRouteDefOptions<TPath>, _params: TParams): IRouteDef<TFeatureDef, `${TPath}`, TParams> {
    return {
        path: options.path as `${TPath}`,
    };
}
