import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';

import { runtimeHistory } from '../store/utils';

const NavRouter = React.memo(props => {
    return <ConnectedRouter history={runtimeHistory.history}>{props.children}</ConnectedRouter>;
});

export { NavRouter };
