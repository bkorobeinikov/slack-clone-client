import * as React from 'react';

import { msgDef, payloadDef } from '@app/store';

import '../styles';

const created = msgDef('CREATED1', payloadDef<{}>());

const View1 = React.memo(() => {
    console.log(created);
    return <div className="view1">View 1</div>;
});

export { View1 };
