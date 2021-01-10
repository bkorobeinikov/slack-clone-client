import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { appStore } from '@app/core';

import { RootView } from '../components';

function* saga() {
    const Root = React.memo(() => {
        return (
            <Provider store={appStore.getReduxStore()}>
                <RootView />
            </Provider>
        );
    });

    const rootEl = document.createElement('div');
    document.body.append(rootEl);

    ReactDOM.render(<Root />, rootEl);
}

export { saga };
