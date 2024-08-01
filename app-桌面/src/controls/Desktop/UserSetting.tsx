import React, { memo, useState, useMemo } from "react";
import { Icon } from "antd";
import UserSettingInfo from "./UserSettingInfo";
import UserSettingBackground from "./UserSettingBackground";
import UserSettingIconSize from "./UserSettingIconSize";
import UserSettingLayoutMode from "./UserSettingLayoutMode";
import UserSettingAppListLayout from './UserSettingAppListLayout';
import { useMove } from "./dnd";

import S from "./userSetting.module.scss";
import S1 from "./style.module.scss";

import type { UserSettingProps } from "./interface";

const UserSetting: React.FC<UserSettingProps> = (props) => {
  const {
    clearModalType,
    userInfo,
    setUserInfo,
    updateDesktopFields,
    setBackgroundImageSrc,
    appIconSize,
    setAppIconSize,
    layoutMode,
    layoutModeChange,
    customProps,
  } = props;

  const [activeTab, setActiveTab] = useState("USER_INFO");

  const [move, moveView] = useMove();

  const menuItem = [
    {
      type: "USER_INFO",
      text: "个人信息",
      component: (
        <UserSettingInfo
          {...{
            userInfo,
            setUserInfo,
          }}
        />
      ),
    },
    {
      type: "BACKGROUND",
      text: "背景设置",
      component: (
        <UserSettingBackground
          {...{
            updateDesktopFields,
            setBackgroundImageSrc,
            userInfo,
          }}
        />
      ),
    },
    {
      type: "ICON_SIZE",
      text: "图标大小",
      component: (
        <UserSettingIconSize
          {...{
            appIconSize,
            setAppIconSize,
            updateDesktopFields,
          }}
        />
      ),
    },
    // {
    //   type: "APP_LIST_LAYOUT",
    //   text: "列表位置",
    //   component: (
    //     <UserSettingAppListLayout
    //       {...{
    //         appIconSize,
    //         setAppIconSize,
    //         updateDesktopFields,
    //       }}
    //     />
    //   ),
    // },
  ];

  if (customProps.current?.isDeskAdminMode) {
    menuItem.push({
      type: "LAYOUT",
      text: "桌面布局设置",
      component: (
        <UserSettingLayoutMode
          {...{
            layoutMode,
            updateDesktopFields,
            layoutModeChange,
          }}
        />
      ),
    });
  }

  const menuList = useMemo(
    () =>
      menuItem.map((item) => (
        <li
          className={`${S.settingItem} ${
            item.type === activeTab ? S.active : ""
          }`}
          key={item.type}
          onClick={() => setActiveTab(item.type)}
        >
          {item.text}
        </li>
      )),
    [menuItem, activeTab]
  );

  return (
    <div className={S.settingModal} ref={moveView}>
      <div className={S1.modalHeader} ref={move}>
        <div className={S1.modalHeaderTitle}>个人设置</div>
        <div className={S1.modalHeaderClose} onClick={clearModalType}>
          <Icon type="close" />
        </div>
      </div>
      <div className={S.modalContainer}>
        <div className={S.containerLeft}>
          <ul className={S.settingMenu}>{menuList}</ul>
        </div>
        <div className={S.containerRight}>
          {menuItem.find((item) => item.type === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default memo(UserSetting);
