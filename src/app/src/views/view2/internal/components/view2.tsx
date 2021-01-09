import * as React from 'react';

import { msgDef, payloadDef } from '@app/store';

import '../styles';

const created = msgDef('CREATED2', payloadDef<{}>());

const View2 = React.memo(() => {
    console.log(created);
    return <div className="view2">View 2</div>;
});

export { View2 };
