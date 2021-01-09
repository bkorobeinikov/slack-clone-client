import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { RootView } from '@app/views/root';

const Root = React.memo(() => {
    return (
        <div>
            <RootView />
        </div>
    );
});

const rootEl = document.createElement('div');
document.body.append(rootEl);

ReactDOM.render(<Root />, rootEl);
