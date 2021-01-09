import * as React from 'react';

import { msgDef, payloadDef } from '@app/store';

import '@app/ui/styles';

const View1Lazy = React.lazy(async () => {
    const { View1 } = await import('@app/views/view1/internal/components/view1');

    return { default: View1 };
});

const View2Lazy = React.lazy(async () => {
    const { View2 } = await import('@app/views/view2/internal/components/view2');

    return { default: View2 };
});

const created = msgDef('CREATEDRoot', payloadDef<{}>());

const RootView = React.memo(() => {
    const [showView1, setShowView1] = React.useState(false);
    const [showView2, setShowView2] = React.useState(false);

    console.log(created);
    return (
        <div>
            {'Root View'}
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
