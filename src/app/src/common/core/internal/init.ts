import { makeBonfire } from '@app/bonfire';

import { moduleDef } from './def';

const bonfire = makeBonfire({ features: [moduleDef] });

export { bonfire };
