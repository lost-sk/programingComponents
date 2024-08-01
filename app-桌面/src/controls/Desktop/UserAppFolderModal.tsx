import React, { memo, useState, useEffect, Fragment, useRef } from "react";

import { useDrag, useDrop } from "./dnd";
import { Input } from "antd";
import AppItemWithStyle from "./AppItemWithStyle";

import S from "./userAppFolder.module.scss";
import S1 from "./style.module.scss";

import closeIcon from "./images/close-icon.svg";

import { AuthorityAppInfo } from "./type";

import { sourceType } from "./config";

import { calcIconSize, calcCloseIconSize } from "./util";

import type { AppInFolderItemProps, FolderLayerProps } from "./interface";

const AppInFolderItem: React.FC<AppInFolderItemProps> = (props) => {
  const {
    app,
    appIconSize,
    index,
    style,
    setIsDragging,
    openApp,
    deleteAppById,
    sortUserApps,
    customProps,
  } = props;

  const [{ isDragging }, drag, dragView] = useDrag({
    type: "FOLDER_APP",
    item: {
      ...app,
      index,
    },
  });

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

  useEffect(() => {
    setIsDragging(isDragging);
  }, [isDragging]);

  const [{ canDrop, item: sourceItem }, drop] = useDrop({
    type: "FOLDER_APP",
  });

  useEffect(() => {
    if (!canDrop || !sourceItem) return () => {};
    if (sourceItem.sourceType !== sourceType.IN_FOLDER) return () => {};
    if (index === sourceItem.index) return () => {};
    const timer = setTimeout(() => {
      sortUserApps(index, sourceItem.index);
    }, 600);
    return () => clearTimeout(timer);
  }, [canDrop, sourceItem, index]);

  const iconStyle = calcIconSize(appIconSize);
  const closeIconStyle = calcCloseIconSize(appIconSize);

  return (
    <div
      className={`${S.appItem} ${canDrop ? S.active : ""}`}
      ref={(node) => {
        needContextMenuRef.current = node;
        dragView(node);
      }}
      style={style}
    >
      <img
        className={S.userAppItemCover}
        src={app.icon}
        draggable={false}
        ref={(node) => {
          drag(node);
          drop(node);
        }}
        onClick={openApp(app.id)}
        style={iconStyle}
      />
      {isShowDeleteIcon && (
        <div
          onClick={deleteAppById(app)}
          className={S1.closeImg}
          style={closeIconStyle}
        >
          <img src={closeIcon} />
        </div>
      )}

      <div className={S.appItemDisplayName}>{app.displayName}</div>
    </div>
  );
};

const FolderLayer: React.FC<FolderLayerProps> = (props) => {
  const {
    userApps,
    setActiveFolder,
    activeFolderId,
    backgroundImageSrc,
    updateDesktopFields,
    setUserApps,
    appIconSize,
    openApp,
    customProps
  } = props;

  const folder = userApps.find(({ id }) => id === activeFolderId);
  const [isDragging, setIsDragging] = useState(false);

  if (!folder) return null;

  const boundaryRef = useRef<HTMLDivElement | null>(null);

  const [isEdit, setEdit] = useState(false);

  const [isHidden, setHidden] = useState(false);

  const [displayName, setDisplayName] = useState(folder.displayName);

  const [sortPos, setSortPos] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    setDisplayName(folder.displayName);
  }, [folder.id]);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const updateDisplayName = () => {
    const newUserApps = userApps.map((app) =>
      app.id === folder.id
        ? {
            ...app,
            displayName,
          }
        : app
    );
    updateDesktopFields({ ownAppList: newUserApps });
    setUserApps(newUserApps);
  };

  const handleFolderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEdit) {
      setEdit(false);
    } else {
      updateDisplayName();
      setActiveFolder(null)(e);
    }
  };

  const dragToDesktop = () => {
    isDragging && setHidden(true);
  };

  useEffect(() => {
    !isDragging && isHidden && setActiveFolder(null)();
  }, [isDragging, isHidden]);

  const deleteAppById =
    (app: AuthorityAppInfo): React.MouseEventHandler =>
    (e) => {
      e.stopPropagation();
      const newUserApps = userApps
        .map((l) =>
          l.id == activeFolderId
            ? { ...l, children: l.children.filter((cl) => cl.id != app.id) }
            : l
        )
        .filter((l) => !l.children || l.children.length);

      updateDesktopFields({ ownAppList: newUserApps });
      setUserApps(newUserApps);
      if (newUserApps.length !== userApps.length) setActiveFolder(null)();
    };

  const sortUserApps = (s1: number, s2: number) => {
    setSortPos([s1, s2]);
    const children = folder.children.map((app, index) => {
      if (!folder.children[s1] || !folder.children[s2]) return app;
      return index === s1
        ? folder.children[s2]
        : index === s2
        ? folder.children[s1]
        : app;
    });
    const newUserApps = userApps.map((app) =>
      app.id === activeFolderId ? { ...app, children } : app
    );
    setUserApps(newUserApps);
    updateDesktopFields({ ownAppList: newUserApps });
  };

  return (
    <div
      className={S.folderLayer}
      style={{
        backgroundImage: `url(${backgroundImageSrc})`,
        visibility: isHidden ? "hidden" : "visible",
      }}
      onClick={handleFolderClick}
    >
      <div className={S.displayName}>
        {isEdit ? (
          <Input
            id="folder-name-input"
            size="large"
            className={S.displayNameInput}
            value={displayName}
            onChange={(e) => changeName(e)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setEdit(true);
            }}
          >
            {displayName || "输入文件夹"}
          </span>
        )}
      </div>
      <div className={S.folderLayerContentGust} onMouseLeave={dragToDesktop} />
      <div
        className={S.folderLayerContent}
        onClick={(e) => e.stopPropagation()}
        ref={boundaryRef}
      >
        {folder.children.map((app, index) => (
          <AppItemWithStyle
            key={app.id}
            index={index}
            sortPos={sortPos}
            padding={10}
            count={7}
          >
            <AppInFolderItem
              app={app}
              key={app.id}
              appIconSize={appIconSize}
              index={index}
              setIsDragging={setIsDragging}
              openApp={openApp}
              deleteAppById={deleteAppById}
              sortUserApps={sortUserApps}
              customProps={customProps}
            />
          </AppItemWithStyle>
        ))}
      </div>
    </div>
  );
};

export default memo(FolderLayer);
