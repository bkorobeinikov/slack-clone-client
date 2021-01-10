import { IReducer } from '@app/store/reducer';
import { SagaResult } from '@app/store/effects';

export enum BonfireFeatureType {
    Module,
    LazyModule,
}

export interface IBonfireFeatureDef {
    readonly type: BonfireFeatureType;
    readonly name: string;
}

export interface IBonfireModuleDefOptions<TState> {
    name: string;
    reducer?: IReducer<TState>;
    saga?: () => SagaResult<void>;
}

export interface IBonfireModuleDef<TState> extends IBonfireFeatureDef {
    type: BonfireFeatureType.Module;
    reducer?: IReducer<TState>;
    saga?: () => SagaResult<void>;
}

export function defineModule<TState = void>(options: IBonfireModuleDefOptions<TState>): IBonfireModuleDef<TState> {
    return {
        type: BonfireFeatureType.Module,
        name: options.name,
        reducer: options.reducer,
        saga: options.saga,
    };
}

export interface IBonfireLazyModuleDefOptions {
    name: string;
    saga: () => SagaResult<void>;
}

export interface IBonfireLazyModuleDef extends IBonfireFeatureDef {
    type: BonfireFeatureType.LazyModule;
    saga: () => SagaResult<void>;
}

export function defineLazyModule(options: IBonfireLazyModuleDefOptions): IBonfireLazyModuleDef {
    return {
        type: BonfireFeatureType.LazyModule,
        name: options.name,
        saga: options.saga,
    };
}
