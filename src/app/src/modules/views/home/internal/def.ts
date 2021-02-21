import { defineViewFeature, withState } from '@app/store';

export const featureDef = defineViewFeature(
    {
        featureName: 'app.views.home',
    },
    withState(),
);
