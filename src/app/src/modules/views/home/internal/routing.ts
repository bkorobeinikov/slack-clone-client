import { defineRoute, withParams } from '@app/store';

import { featureDef } from './def';

export const homeRouteDef = defineRoute(featureDef, { path: '/' }, withParams());
