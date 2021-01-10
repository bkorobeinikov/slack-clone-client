import * as React from 'react';

import { defineMsg, msgPayload } from '@app/store';

import '../styles';

const created = defineMsg('CREATED2', msgPayload<{}>());

const View2 = React.memo(() => {
    console.log(created);
    return <div className="view2">View 2</div>;
});

export { View2 };
