import React, {
  memo,
  useState,
  useEffect,
  Fragment,
  useRef,
  useMemo,
} from "react";
import { Icon, Button } from "antd";
import S from "./logout.module.scss";

import { useMove } from "./dnd";

import { fetchLogout, fetchLogoutRedirect } from "./service";

import { CustomProps } from "./interface";

interface LogoutProps {
  clearModalType: () => void;
  customProps: React.RefObject<CustomProps>;
}

const Logout: React.FC<LogoutProps> = (props) => {
  const { clearModalType, customProps } = props;
  const { current: customPropsRef } = customProps;
  const [move, moveView] = useMove();

  const logout = async () => {
    let url = "/#/user/login";
    if (customPropsRef && customPropsRef.isSSO) {
      try {
        const res = await fetchLogoutRedirect();
        ({ logoutUrl: url } = res.data.external[0]);
      } catch (err) {
        console.warn("无法获取单点登陆退出地址,请检查是否配置单点登录");
      }
    }
    await fetchLogout();
    window.location.href = url;
  };

  return (
    <div className={S.quitBox} ref={moveView}>
      <div className={S.quitHeader} ref={move}>
        <div className={S.quitHeaderTitle}>提示</div>
        <div onClick={clearModalType} className={S.quitHeaderClose}>
          <Icon type="close" />
        </div>
      </div>
      <div className={S.quitContent}>
        <div style={{ color: "rgb(255, 255, 255)", padding: "16px 28px 12px" }}>
          是否确认退出？
        </div>
      </div>
      <div className={S.quitFooter}>
        <Button type="primary" onClick={logout}>
          确认
        </Button>
        <Button onClick={clearModalType}>取消</Button>
      </div>
    </div>
  );
};

export default memo(Logout);
