import { defineViewFeature, withState } from '@app/store';

export const rootViewDef = defineViewFeature(
    {
        featureName: 'app.views.root',
    },
    withState(),
);
