import React from 'react';

import type { ManagerInterface } from './manager';

export interface ContextProps {
    manager: ManagerInterface
}

const Context = React.createContext<ContextProps>({
    manager: {} as ManagerInterface
});

export default Context;
