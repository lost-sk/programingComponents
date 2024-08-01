import React, { memo, useState, useEffect, useRef } from "react";
import { message } from "antd";
import { useDrag, useDrop } from "./dnd";

import closeIcon from "./images/close-icon.svg";
import S from "./style.module.scss";

import type { AuthorityAppInfo } from "./type";

import { APP_ICON_SIZE, sourceType, targetType } from "./config";

import { calcIconSize, calcCloseIconSize } from "./util";

import type { UserAppItemProps } from "./interface";

const UserAppItem: React.FC<UserAppItemProps> = (props) => {
  const {
    app,
    boundary,
    iconSize,
    setDragging,
    updateUserApps,
    deleteAppById,
    sortUserApps,
    openApp,
    style,
    index,
    customProps,
  } = props;

  //ht canvas stop propagation, must bind event listener on origin HTMLElement;
  const needContextMenuRef = useRef<HTMLDivElement | null>(null);

  const [isShowDeleteIcon, setShowDeleteIcon] = useState<boolean>(false);

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

  const [{ isDragging }, drag, dragView] = useDrag({
    type: "USER_APP",
    item: {
      ...app,
      index,
    },
    boundary,
  });

  const endDrop = (source: any) =>
    updateUserApps((userApps) => {
      let newUserApps = null;
      if (source.sourceType === sourceType.SHOW_APP) {
        if (app.id === source.id) return null;
        newUserApps = userApps
          .map(
            (l) =>
              (l.id == app.id
                ? {
                    id: Date.now(),
                    displayName: l.displayName + "文件夹",
                    targetType: targetType.SHOW_FOLDER,
                    sourceType: targetType.SHOW_FOLDER,
                    children: [
                      {
                        ...source,
                        targetType: null,
                        sourceType: sourceType.IN_FOLDER,
                      },
                      {
                        ...l,
                        targetType: null,
                        sourceType: sourceType.IN_FOLDER,
                      },
                    ],
                  }
                : l) as AuthorityAppInfo
          )
          .filter((l) => l.id !== source.id);
      } else if (source.sourceType === sourceType.AUTHORITY_APP) {
        if (
          userApps.some((l) =>
            l.children
              ? l.children.some((cl) => cl.id == source.id)
              : l.id == source.id
          )
        ) {
          message.info("app已存在列表中");
          return null;
        }
        newUserApps = userApps.map(
          (l) =>
            (l.id == app.id
              ? {
                  id: Date.now(),
                  displayName: l.displayName + "文件夹",
                  targetType: targetType.SHOW_FOLDER,
                  sourceType: targetType.SHOW_FOLDER,
                  children: [
                    {
                      id: source.id,
                      displayName: source.displayName,
                      name: source.name,
                      icon: source.icon,
                      targetType: null,
                      sourceType: sourceType.IN_FOLDER,
                    },
                    {
                      ...l,
                      targetType: null,
                      sourceType: sourceType.IN_FOLDER,
                    },
                  ],
                }
              : l) as AuthorityAppInfo
        );
      } else if (source.sourceType === sourceType.IN_FOLDER) {
        newUserApps = userApps
          .map((l) =>
            l.children
              ? { ...l, children: l.children.filter((l) => l.id !== source.id) }
              : l
          )
          .map(
            (l) =>
              (l.id == app.id
                ? {
                    id: Date.now(),
                    displayName: l.displayName + "文件夹",
                    targetType: targetType.SHOW_FOLDER,
                    sourceType: null,
                    children: [
                      {
                        ...source,
                        targetType: null,
                        sourceType: sourceType.IN_FOLDER,
                      },
                      {
                        ...l,
                        targetType: null,
                        sourceType: sourceType.IN_FOLDER,
                      },
                    ],
                  }
                : l) as AuthorityAppInfo
          )
          .filter((l) => !l.children || l.children.length);
      } else {
        return null;
      }
      return newUserApps;
    });

  const [{ canDrop, item: sourceItem }, drop] = useDrop({
    type: "USER_APP",
    monitor: {
      endDrop,
    },
  });

  // order item
  useEffect(() => {
    if (!canDrop || !sourceItem) return () => {};
    if (
      sourceItem.sourceType !== sourceType.SHOW_APP &&
      sourceItem.sourceType !== sourceType.SHOW_FOLDER
    )
      return () => {};
    if (index === sourceItem.index) return () => {};
    const timer = setTimeout(() => {
      sortUserApps(index, sourceItem.index);
    }, 600);
    return () => clearTimeout(timer);
  }, [canDrop, sourceItem, index]);

  useEffect(() => {
    setDragging(isDragging);
  }, [isDragging]);

  const iconStyle = calcIconSize(iconSize);
  const closeIconStyle = calcCloseIconSize(iconSize);
  return (
    <div
      key={app.id}
      className={`${S.userAppItem} ${canDrop ? S.active : ""}`}
      ref={(ref) => {
        needContextMenuRef.current = ref;
        dragView(ref);
      }}
      style={style}
    >
      <img
        ref={(node) => {
          drag(node);
          drop(node);
        }}
        src={app.icon}
        draggable="false"
        className={S.userAppItemCover}
        onClick={openApp(app.id)}
        style={iconStyle}
      />
      {isShowDeleteIcon && (
        <div
          onClick={deleteAppById(app, index)}
          className={S.closeImg}
          style={closeIconStyle}
        >
          <img src={closeIcon} />
        </div>
      )}

      <div className={S.userAppName}>{app.displayName}</div>
    </div>
  );
};

export default memo(UserAppItem);
