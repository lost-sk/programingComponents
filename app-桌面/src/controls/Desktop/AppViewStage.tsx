import React, {
  memo,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { Menu } from "antd";
import S from "./AppViewStage.module.scss";

import {flattenAppFolder} from './util';

const { SubMenu } = Menu;

import type { AuthorityAppInfoWithProps, AuthorityAppInfo } from "./type";
import type {SelectParam} from 'antd/lib/menu';

interface AppViewStageProps {
  activeTaskAppId: number | null;
  taskAppList: Array<AuthorityAppInfoWithProps>;
  selectAppPageNode: (props: any) => void;
}

interface AppViewItemProps {
  app: AuthorityAppInfoWithProps;
  renderSubmenu: (
    menu: Array<AuthorityAppInfo>,
    appId: number
  ) => JSX.Element[];
  activeTaskAppId: number | null;
  taskAppList: Array<AuthorityAppInfoWithProps>
  selectNode:(nodeItem: any,selectedKeys:string[],openKeys:string[],id:number) => void;
}
const AppViewItem: React.FC<AppViewItemProps> = (props) => {
  const { app, taskAppList, activeTaskAppId, renderSubmenu,selectNode } = props;

  const [isCollapse, setCollapse] = useState<boolean>(false);

  const iframeWrapper = useRef<HTMLDivElement>(null);

  const toggleCollapse = () => setCollapse((collapse) => !collapse);

  useLayoutEffect(() => {
    if (app && flattenAppFolder(app).length <= 1) {
      setCollapse(true);
    }
  }, [app]);

  const [openKeys,setOpenKeys] = useState(app.openKeys)
  const [selectedKeys,setSelectedKeys] = useState(app.selectedKeys)

  const onOpenChange = (openKeys:string[]) => {
    setOpenKeys(openKeys);
  }

  const onSelect = ({item,selectedKeys}:SelectParam) => {
    setSelectedKeys(selectedKeys);
    selectNode(item,selectedKeys,openKeys,app.id)
  }

  return (
    <div
      key={app.id}
      className={S.appStageWrapper}
      style={{
        visibility: activeTaskAppId === app.id ? "visible" : "hidden",
      }}
    >
      <div
        className={isCollapse ? S.collapseIconExt : S.collapseIcon}
        onClick={toggleCollapse}
      ></div>
      <div className={S.menuListWrapper}>
        {app.children && (
          <div className={S.menuList} style={{ width: isCollapse ? 0 : 240 }}>
            <div className={S.menuListTitle}>
              <img style={{ width: 30, margin: 10 }} src={app.icon} />
              <span>{app.displayName}</span>
            </div>
            <Menu
              {...{
                mode: "inline",
                theme: "dark",
                selectedKeys,
                openKeys,
                onOpenChange,
                onSelect
              }}
            >
              {renderSubmenu(app.children, app.id)}
            </Menu>
          </div>
        )}
        <div className={S.iframeWindow} ref={iframeWrapper}>
          <iframe
            src={app.activeUrl}
            frameBorder="0"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

const AppViewStage: React.FC<AppViewStageProps> = (props) => {
  const { taskAppList, activeTaskAppId, selectAppPageNode } = props;

  const selectNode = (nodeItem: any,selectedKeys:string[],openKeys:string[],id: number)=> {
    const obj = {
      id,
      url: nodeItem.props.item.url,
      code: nodeItem.props.item.code,
      openKeys,
      selectedKeys
    };
    selectAppPageNode(obj);
  };
  const renderSubmenu = (menu: Array<AuthorityAppInfo>, appId: number) => {
    return menu.map((item) => {
      if (item.children && item.children.length) {
        return (
          <SubMenu {...{key:item.id,title:item.displayName}}>
            {renderSubmenu(item.children, appId)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item
          key={item.id}
          title={item.displayName}
          {...{item}}
        >
          <span>{item.displayName} </span>
        </Menu.Item>
      );
    });
  };

  return (
    <>
      {taskAppList.map((app) => (
        <AppViewItem
          key={app.id}
          app={app}
          renderSubmenu={renderSubmenu}
          selectNode={selectNode}
          taskAppList={taskAppList}
          activeTaskAppId={activeTaskAppId}
        />
      ))}
    </>
  );
};

export default memo(AppViewStage);
