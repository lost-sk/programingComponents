import React, { memo, useState, useEffect, Fragment, useRef } from "react";

import { useDrag, useDrop } from "./dnd";

import { message } from "antd";
import closeIcon from "./images/close-icon.svg";
import S from "./style.module.scss";

import type { AuthorityAppInfo } from "./type";

import {sourceType } from "./config";

import { calcIconSize, calcCloseIconSize } from "./util";

import type { UserFolderItemProps } from "./interface";

const UserFolderItem: React.FC<UserFolderItemProps> = (props) => {
  const {
    folder,
    boundary,
    iconSize,
    setDragging,
    deleteAppById,
    updateUserApps,
    style,
    index,
    sortUserApps,
    setActiveFolder,
    customProps,
  } = props;

  //ht canvas stopPropagation, must bind event listener on origin HTMLElement;

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
  }, [folder, customProps]);

  const [{ isDragging }, drag, dragView] = useDrag({
    type: "USER_APP",
    item: {
      ...folder,
      index,
    },
    boundary,
  });

  const endDrop = (source: any) =>
    updateUserApps((userApps) => {
      let newUserApps = null;
      if (source.sourceType === sourceType.SHOW_APP) {
        newUserApps = userApps
          .filter((l) => l.id !== source.id)
          .map((l) =>
            l.id == folder.id
              ? {
                  ...l,
                  children: l.children.concat({
                    ...source,
                    targetType: null,
                    sourceType: sourceType.IN_FOLDER,
                  }),
                }
              : l
          );
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
        newUserApps = userApps.map((l) =>
          l.id == folder.id
            ? {
                ...l,
                children: l.children.concat({
                  id: source.id,
                  displayName: source.displayName,
                  name: source.name,
                  icon: source.icon,
                  targetType: null,
                  sourceType: sourceType.IN_FOLDER,
                } as AuthorityAppInfo),
              }
            : l
        );
      } else if (source.sourceType === sourceType.IN_FOLDER) {
        newUserApps = userApps
          .map((l) =>
            l.children
              ? { ...l, children: l.children.filter((l) => l.id !== source.id) }
              : l
          )
          .map((l) =>
            l.id == folder.id
              ? { ...l, children: l.children.concat({ ...source }) }
              : l
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
      key={folder.id}
      className={`${S.userAppItem} ${canDrop ? S.active : ""}`}
      ref={(ref) => {
        needContextMenuRef.current = ref;
        dragView(ref);
      }}
      style={style}
    >
      <div
        className={S.userAppsFolderItem}
        ref={(node) => {
          drag(node);
          drop(node);
        }}
        onClick={setActiveFolder(folder.id)}
        style={iconStyle}
      >
        {folder.children.slice(0, 9).map((it) => (
          <img
            draggable="false"
            className={S.userFolderTinyIcon}
            key={it.id}
            src={it.icon}
          />
        ))}
      </div>
      <div
        onClick={deleteAppById(folder, index)}
        className={S.closeImg}
        style={closeIconStyle}
      >
        {isShowDeleteIcon ? <img src={closeIcon} /> : null}
      </div>

      <div className={S.userAppName}>{folder.displayName}</div>
    </div>
  );
};

export default memo(UserFolderItem);
