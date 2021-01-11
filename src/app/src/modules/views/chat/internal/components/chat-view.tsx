import { WorkspaceShell } from '@app/ui/layouts/workspace/shell';
import * as React from 'react';

const ChatView = React.memo(() => {
    return <WorkspaceShell sidebar={null} primary={null} secondary={null}></WorkspaceShell>;
});

export { ChatView };
