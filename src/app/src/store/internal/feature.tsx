/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import * as React from 'react';

import { SagaResult } from './effects';
import { IReducer } from './reducer';
import { AnyRoute } from './routing';

export interface IFeature<TFeatureName, TState> {
    readonly featureName: TFeatureName;
    reducer: IReducer<TState> | null;
    saga: () => SagaResult<void> | null;
}

export interface IFeatureOptions<_TFeatureName, TState> {
    reducer?: IReducer<TState>;
    saga?: () => SagaResult<void>;
}

export interface IFeatureDefOptions<TFeatureName extends string, _TState> {
    featureName: TFeatureName;
}

export interface IFeatureDef<TFeatureName extends `[${string}]`, TState> {
    featureName: TFeatureName;
    create(options: IFeatureOptions<TFeatureName, TState>): IFeature<TFeatureName, TState>;
}

export function defineFeature<TFeatureName extends string, TState>(
    defOptions: IFeatureDefOptions<TFeatureName, TState>,
    _state: TState,
): IFeatureDef<`[${TFeatureName}]`, TState> {
    return {
        featureName: `[${defOptions.featureName}]` as `[${TFeatureName}]`,
        create: options => {
            return {
                featureName: `[${defOptions.featureName}]` as `[${TFeatureName}]`,
                reducer: options.reducer,
                saga: options.saga,
            };
        },
    };
}

export interface IFeatureWithView<TFeatureName, TState> extends IFeature<TFeatureName, TState> {
    viewComponent: React.ComponentType;
}

export interface IFeatureOptionsWithView<TFeatureName, TState> extends IFeatureOptions<TFeatureName, TState> {
    viewComponent: React.ComponentType;
}

export interface IFeatureWithViewAsLazy<TFeatureName, TState> extends IFeature<TFeatureName, TState> {
    viewComponent: React.ComponentType;
}

export interface IFeatureOptionsWithViewAsLazy<TFeatureWithView extends IFeatureWithView<any, any>> {
    load(): Promise<TFeatureWithView>;
    fallback: React.ComponentType;
    routes: AnyRoute[];
}

export interface IFeatureDefWithView<TFeatureName extends `[${string}]`, TState> extends IFeatureDef<TFeatureName, TState> {
    create(options: IFeatureOptionsWithView<TFeatureName, TState>): IFeatureWithView<TFeatureName, TState>;
    createLazy(options: IFeatureOptionsWithViewAsLazy<IFeatureWithView<TFeatureName, TState>>): IFeatureWithView<`[lazy:${TFeatureName}]`, TState>;
}

export function defineViewFeature<TFeatureName extends string, TState>(
    defOptions: IFeatureDefOptions<TFeatureName, TState>,
    _state: TState,
): IFeatureDefWithView<`[${TFeatureName}]`, TState> {
    return {
        featureName: `[${defOptions.featureName}]` as `[${TFeatureName}]`,
        create: options => {
            return {
                featureName: `[${defOptions.featureName}]` as `[${TFeatureName}]`,
                reducer: options.reducer,
                saga: options.saga,
                viewComponent: options.viewComponent,
            };
        },
        createLazy: options => {
            // define a lazy feature
            // define saga

            const LazyView = React.lazy(async () => {
                const feature = await options.load();
                return { default: feature.viewComponent };
            });

            const lazyFeatureDef = defineViewFeature(
                { featureName: `lazy:[${defOptions.featureName}]` as `lazy:[${TFeatureName}]` },
                withState<TState>(),
            );
            const lazyFeature = lazyFeatureDef.create({
                saga: function* () {
                    /// register routes
                    /// yield put(registerRoutes())
                },
                viewComponent: LazyView,
            });

            return lazyFeature;
        },
    };
}

export interface NoState extends Record<string, never> {}

export function withState<TState = NoState>(_payload?: TState): TState {
    return null;
}
