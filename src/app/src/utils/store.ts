import { IBonfireModuleDef } from '@app/bonfire/features';
import { ExtractReducerState } from '@app/store/reducer';

export function createModuleStateSelector<TState = void>(
    moduleDef: IBonfireModuleDef<TState>,
): (store: any) => ExtractReducerState<IBonfireModuleDef<TState>['reducer']> {
    return (state: any) => state[moduleDef.name] as ExtractReducerState<IBonfireModuleDef<TState>['reducer']>;
}
