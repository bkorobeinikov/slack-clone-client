export interface IRouteDefOptions {
    path: string;
    componentName?: string;
}

export type RouteParams = Record<string, string | number | boolean>;

export interface IRouteDef<_TParams extends RouteParams = Record<string, never>> {
    path: string;
    componentName: string;
}

export type ExtractRouteParams<TRouteDef> = TRouteDef extends IRouteDef<infer TParams> ? TParams : never;
