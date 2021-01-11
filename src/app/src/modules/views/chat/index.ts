import * as React from 'react';

import { put } from '@app/store/effects';
import { defineModule } from '@app/store/utils';

import { componentRegistry } from '@app/ui';

import { registerRouteAction } from '@app/common/navigation/messages';

import { chatRouteDef } from './internal/routing';
import { LAZY_FEATURE_VIEWS_CHAT_NAME, ROUTING_INITIAL_COMPONENT_NAME } from './internal/constants';

const ChatViewLazy = React.lazy(async () => {
    const { ChatView } = await import('./internal/components');

    return { default: ChatView };
});

const chatViewDef = defineModule({
    name: LAZY_FEATURE_VIEWS_CHAT_NAME,
    saga: function* () {
        componentRegistry.addComponent(ROUTING_INITIAL_COMPONENT_NAME, ChatViewLazy);
        yield put(
            registerRouteAction({
                routes: [chatRouteDef],
            }),
        );
    },
});

export { chatViewDef };
