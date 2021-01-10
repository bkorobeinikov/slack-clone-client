import * as React from 'react';

import { defineMsg, msgPayload } from '@app/store';

import '../styles';

const created = defineMsg('CREATED1', msgPayload<{}>());

const View1 = React.memo(() => {
    console.log(created);
    return <div className="view1">View 1</div>;
});

export { View1 };
