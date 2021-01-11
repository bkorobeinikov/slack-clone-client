import { createSelector } from 'reselect';

import { ExtractReducerState } from './reducer';
import { IStoreModuleDef } from './store';

export { createSelector };
export function createSelectorEx<TState = void>(
    moduleDef: IStoreModuleDef<TState>,
): (store: Record<string, unknown>) => ExtractReducerState<IStoreModuleDef<TState>['reducer']> {
    return state => state[moduleDef.name] as ExtractReducerState<IStoreModuleDef<TState>['reducer']>;
}
