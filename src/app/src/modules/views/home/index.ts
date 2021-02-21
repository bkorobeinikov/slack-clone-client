import { featureDef } from './internal/def';
import { homeRouteDef } from './internal/routing';

export const homeView = featureDef.createLazy({
    load: async () => (await import('./internal/init')).feature,
    fallback: null,
    routes: [homeRouteDef],
});
