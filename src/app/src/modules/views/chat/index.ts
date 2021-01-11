import * as React from 'react';

import { defineModule } from '@app/store/utils';

import { componentRegistry } from '@app/ui';
import { put } from '@app/store/effects';
import { registerRouteAction } from '@app/common/navigation/messages';

const ChatViewLazy = React.lazy(async () => {
    const { ChatView } = await import('./internal/components');

    return { default: ChatView };
});

const chatViewDef = defineModule({
    name: 'app.views.chat.lazy',
    saga: function* () {
        componentRegistry.addComponent('app.views.chat.lazy', ChatViewLazy);
        yield put(
            registerRouteAction({
                routes: [
                    {
                        path: '/chat',
                        viewComponentName: 'app.views.chat.lazy',
                    },
                ],
            }),
        );
    },
});

export { chatViewDef };
