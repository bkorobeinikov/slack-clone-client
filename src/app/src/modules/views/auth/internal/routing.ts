import { defineRoute, withParams } from '@app/store';

import { featureDef } from './def';

export const authRouteDef = defineRoute(featureDef, { path: '/auth' }, withParams());
