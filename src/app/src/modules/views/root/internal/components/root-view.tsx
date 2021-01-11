import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { defineMsg, msgPayload } from '@app/store';

import '@app/ui/styles';
import { componentRegistry } from '@app/ui';

import { getIsAppReady } from '@app/core/selectors';
import { getRoutes } from '@app/common/navigation/selectors';
import { getAppConfig } from '@app/core/internal/store/selectors';

const View1Lazy = React.lazy(async () => {
    const { View1 } = await import('@app/views/view1/internal/components/view1');

    return { default: View1 };
});

const View2Lazy = React.lazy(async () => {
    const { View2 } = await import('@app/views/view2/internal/components/view2');

    return { default: View2 };
});

const created = defineMsg('CREATEDRoot', msgPayload());

const RootView = React.memo(() => {
    const [showView1, setShowView1] = React.useState(false);
    const [showView2, setShowView2] = React.useState(false);

    console.log(created);

    const appConfig = useSelector(getAppConfig);
    const ready = useSelector(getIsAppReady);
    const routes = useSelector(getRoutes);

    if (!ready) {
        return null;
    }

    return (
        <div>
            <Router basename={appConfig.basename}>
                <Switch>
                    {routes.map(r => {
                        const View = componentRegistry.getComponent(r.viewComponentName) as React.ComponentClass;
                        return (
                            <Route key={r.path} path={r.path}>
                                <React.Suspense fallback={null}>
                                    <View />
                                </React.Suspense>
                            </Route>
                        );
                    })}
                </Switch>
            </Router>

            <button onClick={() => setShowView1(true)}>Show View 1</button>
            <button onClick={() => setShowView2(true)}>Show View 2</button>
            {showView1 && (
                <React.Suspense fallback={null}>
                    <View1Lazy />
                </React.Suspense>
            )}
            {showView2 && (
                <React.Suspense fallback={null}>
                    <View2Lazy />
                </React.Suspense>
            )}
        </div>
    );
});

export { RootView };
