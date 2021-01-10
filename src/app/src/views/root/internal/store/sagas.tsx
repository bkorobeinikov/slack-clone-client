import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { bonfire } from '@app/common/core';

import { RootView } from '../components';

function* saga() {
    const Root = React.memo(() => {
        return (
            <Provider store={bonfire.getStore()}>
                <RootView />
            </Provider>
        );
    });

    const rootEl = document.createElement('div');
    document.body.append(rootEl);

    ReactDOM.render(<Root />, rootEl);
}

export { saga };
