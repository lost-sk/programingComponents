import React, { memo, useEffect, useRef } from "react";
import { Menu } from "antd";
import S from "./header.module.scss";
import { BasePath } from "./config";

import { ModalType } from "./type";
import { fetchVersion } from "./service";

interface HeaderMenuProps {
  userInfo: UserInfo;
  setModalType: (type: ModalType) => void;
  layoutMode: number;
}

const HeaderMenu: React.FC<HeaderMenuProps> = (props) => {
  const { userInfo, setModalType, layoutMode } = props;
  const { userType } = userInfo;
  const designPath = useRef("");

  useEffect(() => {
    (async () => {
      designPath.current = BasePath.DESIGN[await fetchVersion()];
    })();
  }, []);

  return (
    <Menu className={S.headerMenu}>
      <Menu.Item
        key="views"
        className={S.headerMenuItem}
        onClick={() => (window.location.href = "/#/hellow")}
      >
        普通视图
      </Menu.Item>
      {userType && (
        <Menu.Item
          key="configuration"
          className={S.headerMenuItem}
          onClick={() => window.open(`${window.origin}${designPath.current}`)}
        >
          组态管理
        </Menu.Item>
      )}
      {
        userType == 1 &&
        <Menu.Divider style={{ marginBottom: '0', marginTop: '0', background: 'rgba(255, 255, 255, 0.15)' }} />
      }
      { userType == 1 && <Menu.Item
          key="application"
          className={S.headerMenuItem}
          onClick={() => window.open(`${window.origin}/#/runtime-fullscreen/runtime-fullscreen/Page_316b331f76444a328ec0b9ed797ae358`)}
        >
          服务脚本文档
        </Menu.Item>
      }
      <Menu.Divider
        style={{ marginBottom: "0", background: "rgba(255, 255, 255, 0.15)" }}
      />
      <Menu.Item
        key="application"
        className={S.headerMenuItem}
        onClick={(e) => setModalType(ModalType.AUTHORITY_APPS)}
      >
        应用
      </Menu.Item>

      {!layoutMode && (
        <Menu.Item
          key="layout"
          className={S.headerMenuItem}
          onClick={(e) => setModalType(ModalType.LAYOUT)}
        >
          布局
        </Menu.Item>
      )}


      <Menu.Item
        key="setting"
        className={S.headerMenuItem}
        onClick={(e) => setModalType(ModalType.USER_INFO)}
      >
        个人设置
      </Menu.Item>
      <Menu.Item
        key="password"
        className={S.headerMenuItem}
        onClick={(e) => setModalType(ModalType.PASSWORD)}
      >
        密码
      </Menu.Item>
      <Menu.Item
        key="exit"
        className={S.headerMenuItem}
        onClick={(e) => setModalType(ModalType.LOGOUT)}
      >
        退出
      </Menu.Item>
    </Menu>
  );
};

export default memo(HeaderMenu);
