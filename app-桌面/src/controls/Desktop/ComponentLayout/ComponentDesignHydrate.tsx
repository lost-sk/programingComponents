import React, { useState, useRef, useEffect } from "react";

import { useDrop } from "../dnd";

import closeIcon from "../images/close-icon.svg";

import S from "./designBoard.module.scss";

import type { ComponentDesignHydrateProps } from "../interface";

const ComponentDesignHydrate: React.FC<ComponentDesignHydrateProps> = (
  props
) => {
  const {
    id,
    userComponentsMap,
    layoutData,
    schema,
    setLayoutData,
    layout,
    plan,
    customProps,
  } = props;

  const hasInfoId = layoutData[id!];

  const info = hasInfoId ? userComponentsMap[hasInfoId] : null;

  const needContextMenuRef = useRef<HTMLDivElement | null>(null);

  const [isShowDeleteIcon, setShowDeleteIcon] = useState<boolean>(false);

  const endDrop = (source: any) => {
    setLayoutData((layoutData: any) => {
      layoutData[plan][layout][id!] = source.id;
      return _.cloneDeep(layoutData);
    });
  };

  const [, drop] = useDrop({
    type: "USER_COMPONENT",
    monitor: {
      endDrop,
    },
  });

  useEffect(() => {
    if (!needContextMenuRef.current) return () => {};
    const handle = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setShowDeleteIcon(true);
    };
    const handleOut = () => setShowDeleteIcon(false);

    if (!customProps.current?.isIconWithRightClickInteractive) {
      needContextMenuRef.current.addEventListener("mouseenter", handle);
    } else {
      needContextMenuRef.current?.addEventListener("contextmenu", handle);
    }

    needContextMenuRef.current.addEventListener("mouseleave", handleOut);

    return () => {
      if (!customProps.current?.isIconWithRightClickInteractive) {
        needContextMenuRef.current?.removeEventListener("mouseenter", handle);
      } else {
        needContextMenuRef.current?.removeEventListener("contextmenu", handle);
      }
    };
  }, [customProps]);

  const deleteLayoutComponent =
    (id: string): React.MouseEventHandler =>
    () => {
      setLayoutData((layoutData: any) => {
        delete layoutData[plan][layout][id];
        return _.cloneDeep(layoutData);
      });
    };

  return (
    <div
      className={S.containerBlockWithStyle}
      ref={(ref) => {
        needContextMenuRef.current = ref;
        drop(ref);
      }}
    >
      {info ? (
        <div
          className={S.designCoverImage}
          style={{
            backgroundImage: `url(${info.cover})`,
          }}
        />
      ) : (
        <span className={S.blockSizeType}>{schema.sizeType}</span>
      )}

      {info && isShowDeleteIcon && (
        <img
          src={closeIcon}
          className={S.deleteComponentIcon}
          onClick={deleteLayoutComponent(id!)}
        />
      )}
    </div>
  );
};

export default ComponentDesignHydrate;
