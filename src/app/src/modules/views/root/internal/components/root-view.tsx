import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { defineMsg, withPayload } from '@app/store';

import '@app/ui/styles';
import { componentRegistry } from '@app/ui';

import { getIsAppReady } from '@app/core/selectors';

import { getRoutes } from '@app/common/navigation/selectors';
import { NavRouter } from '@app/common/navigation/components';

const created = defineMsg('CREATEDRoot', withPayload());

const RootView = React.memo(() => {
    console.log(created);

    const ready = useSelector(getIsAppReady);
    const routes = useSelector(getRoutes);

    if (!ready) {
        return null;
    }

    return (
        <div>
            <NavRouter>
                <Switch>
                    {routes.map(r => {
                        const View = componentRegistry.getComponent(r.componentName) as React.ComponentClass;
                        return (
                            <Route key={r.path} path={r.path}>
                                <React.Suspense fallback={null}>
                                    <View />
                                </React.Suspense>
                            </Route>
                        );
                    })}
                </Switch>
            </NavRouter>
        </div>
    );
});

export { RootView };
