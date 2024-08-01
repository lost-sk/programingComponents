import React, { useState, useEffect } from "react";
import WebView from "WebView";

import { ComponentItem } from "../type";

import S from "./designBoard.module.scss";

interface ComponentRuntimeHydrateProps {
  id?: string;
  componentData: any;
  outerProps: any;
  userComponentsMap: { [key: string]: ComponentItem };
}

const ComponentRuntimeHydrate: React.FC<ComponentRuntimeHydrateProps> = (
  props: any
) => {
  const { id, componentData, userComponentsMap, outerProps } = props;

  const hasInfoId = componentData[id!];
  const info = hasInfoId ? userComponentsMap[hasInfoId] : null;
  const [component, setComponent] = useState<React.ReactElement>();

  useEffect(() => {
    if (info) {
      Promise.resolve()
        .then(() => (
          <WebView
            key={info.id}
            {...{
              ...outerProps,
              data: {
                ...outerProps.data,
                mark: "seems work (✿◠‿◠), check this in source code!!",
                getTag: () => info.id,
                getAttrObject: () => ({
                  configs: {
                    config: {
                      url: info.url?.split("#")[1],
                    },
                  },
                }),
              },
            }}
            isNoIframeMode
            widgetIndex="webview"
            url={info.url?.split("#")[1]}
          />
        ))
        .then((component) => setComponent(component))
        .catch(console.log);
    }
  }, [info]);
  return (
    <div className={S.containerBlockWithRuntimeStyle}>{info && component}</div>
  );
};

export default ComponentRuntimeHydrate;
