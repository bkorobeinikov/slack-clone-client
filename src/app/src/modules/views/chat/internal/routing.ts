import { defineRoute, withParams } from '@app/store';

import { featureDef } from './def';

export const chatRouteDef = defineRoute(featureDef, { path: '/chat' }, withParams());
