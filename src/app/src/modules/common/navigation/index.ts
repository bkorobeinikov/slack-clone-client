import { appStore } from '@app/core';

import { feature } from './internal/init';
appStore.addFeature(feature);

export { NavRouter } from './internal/components';
export { registerRouteAction, navigateToAction } from './internal/store/messages';
export { generatePath } from './internal/store/utils';
export { getRoutes } from './internal/store/selectors';
