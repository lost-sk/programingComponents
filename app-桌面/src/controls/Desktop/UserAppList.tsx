import React, { memo, useState, useRef, useEffect } from "react";
import { Modal, message } from "antd";
import { useDrop } from "./dnd";

import UserAppItem from "./UserAppItem";
import UserFolderItem from "./UserFolderItem";
import AppItemWithStyle from "./AppItemWithStyle";

import S from "./style.module.scss";

import { sourceType, targetType } from "./config";

import type { AuthorityAppInfo } from "./type";

import type { AppListProps } from "./interface";

const UserAppList: React.FC<AppListProps> = (props) => {
  const {
    userApps,
    setUserApps,
    updateDesktopFields,
    appIconSize,
    openApp,
    setActiveFolder,
    customProps,
  } = props;

  const boundaryRef = useRef<HTMLDivElement | null>(null);

  const [delIndex, setDelIndex] = useState(-1);
  const [isChildDragging, setChildDragging] = useState(false);
  const [sortPos, setSortPos] = useState<[number, number]>([0, 0]);

  const endDrop = (source: any) =>
    updateUserApps((userApps) => {
      let newUserApps = null;
      if (source.sourceType === sourceType.AUTHORITY_APP) {
        //查重
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
        //放到列表中
        newUserApps = userApps.concat({
          id: source.id,
          displayName: source.displayName,
          name: source.name,
          icon: source.icon,
          sourceType: sourceType.SHOW_APP,
          targetType: targetType.SHOW_APP,
        } as AuthorityAppInfo);
      } else if (source.sourceType === sourceType.IN_FOLDER) {
        newUserApps = userApps
          .map((l) =>
            l.children
              ? {
                  ...l,
                  children: l.children.filter((cl) => cl.id !== source.id),
                }
              : l
          )
          .concat({
            ...source,
            sourceType: sourceType.SHOW_APP,
            targetType: targetType.SHOW_APP,
          })
          .filter((l) => !l.children || l.children.length);
      } else {
        return null;
      }
      return newUserApps;
    });

  const [{ canDrop }, drop] = useDrop({
    type: "USER_APP",
    monitor: {
      endDrop,
    },
  });

  const updateUserApps = (
    handle: (
      userApps: Array<AuthorityAppInfo>
    ) => Array<AuthorityAppInfo> | null
  ) => {
    const newUserApps = handle(userApps);
    if (newUserApps === null) return;
    setUserApps(newUserApps);
    updateDesktopFields({ ownAppList: newUserApps });
  };

  const deleteAppById =
    (app: AuthorityAppInfo, index: number): React.MouseEventHandler =>
    (e) => {
      e.stopPropagation();
      const handleDelete = () => {
        setDelIndex(index);
        setSortPos([0, 0]);
        updateUserApps((userApps) =>
          userApps.filter((appItem) => appItem.id !== app.id)
        );
      };
      if (!app.children) return handleDelete();

      Modal.confirm({
        title: "确定删除文件夹？",
        cancelText: "取消",
        okText: "确定",
        onOk: handleDelete,
      });
    };

  const sortUserApps = (s1: number, s2: number) => {
    setSortPos([s1, s2]);
    const newUserApps = userApps.map((app, index) => {
      if (!userApps[s1] || !userApps[s2]) return app;
      return index === s1 ? userApps[s2] : index === s2 ? userApps[s1] : app;
    });
    setUserApps(newUserApps);
    updateUserApps(() => newUserApps);
  };

  return (
    <div
      className={`${S.authorityAppListArea} ${
        isChildDragging || canDrop ? S.active : ""
      }`}
      ref={(node) => {
        boundaryRef.current = node;
        drop(node);
      }}
    >
      <div className={S.authorityAppListScrollWrapper}>
        {userApps.map((app, index) => {
          return (
            <AppItemWithStyle
              key={app.id}
              index={index}
              sortPos={sortPos}
              count={3}
              padding={4}
            >
              {app.children && app.children.length ? (
                <UserFolderItem
                  folder={app}
                  index={index}
                  iconSize={appIconSize}
                  boundary={boundaryRef}
                  setDragging={setChildDragging}
                  deleteAppById={deleteAppById}
                  updateUserApps={updateUserApps}
                  sortUserApps={sortUserApps}
                  setActiveFolder={setActiveFolder}
                  customProps={customProps}
                />
              ) : (
                <UserAppItem
                  app={app}
                  index={index}
                  iconSize={appIconSize}
                  boundary={boundaryRef}
                  setDragging={setChildDragging}
                  updateUserApps={updateUserApps}
                  deleteAppById={deleteAppById}
                  sortUserApps={sortUserApps}
                  openApp={openApp}
                  customProps={customProps}
                />
              )}
            </AppItemWithStyle>
          );
        })}
      </div>
    </div>
  );
};

export default memo(UserAppList);
