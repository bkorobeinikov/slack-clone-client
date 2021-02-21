import { createJobGroup } from '@app/store';

import { featureDef } from '../def';

export const initializationJobs = createJobGroup(featureDef, { name: 'initialization' });
