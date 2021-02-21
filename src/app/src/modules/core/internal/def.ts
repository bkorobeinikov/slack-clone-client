import { defineFeature, withState } from '@app/store';

import { IAppConfig } from './models';

interface IState {
    appConfig: IAppConfig;

    ready: boolean;
}

const featureDef = defineFeature(
    {
        featureName: 'app/core',
    },
    withState<IState>(),
);

export { featureDef, IState };
