import { featureDef } from './internal/def';
import { authRouteDef } from './internal/routing';

export const authView = featureDef.createLazy({
    load: async () => {
        const { feature } = await import('./internal/init');

        return feature;
    },
    fallback: null,
    routes: [authRouteDef],
});
