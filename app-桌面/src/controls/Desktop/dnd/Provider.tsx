import React, { memo, useMemo } from "react";
import Context from "./context";

import { Manager } from "./manager";

interface DndProviderProps {
  children: React.ReactNode;
}

const DndProvider: React.FC<DndProviderProps> = (props) => {
  const { children } = props;

  const manager = useMemo(() => {
    return new Manager();
  }, [Manager]);
  return (
    <Context.Provider
      value={{
        manager,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default memo(DndProvider);
