import { AnyRoute, defineFeature, withState } from '@app/store';

export interface IState {
    routes: AnyRoute[];
}

export const featureDef = defineFeature(
    {
        featureName: 'app/common/navigation',
    },
    withState<IState>(),
);
