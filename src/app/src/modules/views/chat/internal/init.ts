import { ChatView } from './components';

import { featureDef } from './def';

const feature = featureDef.create({
    viewComponent: ChatView,
});

export { feature };
