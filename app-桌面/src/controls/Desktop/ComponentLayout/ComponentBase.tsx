import React from "react";
import S from "./designBoard.module.scss";

import { BLOCK_TYPE } from "../config";

interface ComponentBaseProps {
  id: string;
  schema: any;
}

const ComponentBase: React.FC<React.PropsWithChildren<ComponentBaseProps>> = (
  props
) => {
  const { id, children, schema } = props;

  let style = {} as React.CSSProperties;
  let className = "";

  const { grow, direction } = schema;

  if (direction) {
    className = S.layoutBlock;
    style = {
      flexDirection: direction === BLOCK_TYPE.COLUMN ? "column" : "row",
      flex: grow,
    };
  } else {
    className = S.containerBlock;
    style = {
      flex: grow,
    };
  }

  return (
    <div id={id} className={className} style={style}>
      {children}
    </div>
  );
};

export default ComponentBase;
