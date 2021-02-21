import { featureDef } from './internal/def';
import { chatRouteDef } from './internal/routing';

export const chatView = featureDef.createLazy({
    load: async () => (await import('./internal/init')).feature,
    fallback: null,
    routes: [chatRouteDef],
});
