import React, { memo, useState, useEffect, useRef } from "react";
import S from "./header.module.scss";
import { Dropdown, Menu } from "antd";

import DateTime from "./DateTime";
import HeaderMenu from "./HeaderMenu";

import logo from "./images/logo.png";

import {
  fetchTodoList,
  fetchNotifications,
  fetchCurrentUserDepartment,
  fetchCompanyChange,
} from "./service";

import { ModalType } from "./type";

import { ASSETS_UI_IMAGE_PATH } from "./config";

import type { CustomProps } from "./interface";
import { getLoginMsg } from "./util";

interface HeaderProps {
  userInfo: UserInfo;
  setModalType: (type: ModalType) => void;
  customProps: React.RefObject<CustomProps>;
  layoutMode: number;
  compInfo: any;
  setCompInfo: (info: any) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const {
    userInfo,
    setModalType,
    customProps,
    layoutMode,
    compInfo,
    setCompInfo,
  } = props;

  const [todoList, setTodoList] = useState({});
  const [notification, setNotification] = useState({});
  const [showNormalView, setNormalView] = useState(true);

  const { current: customPropsRef } = customProps;

  useEffect(() => {
    fetchTodoList().then((res) => setTodoList(res));
    fetchNotifications().then((res) => setNotification(res));
    let timer = setInterval(() => {
      fetchTodoList()
        .then((res) => setTodoList(res))
        .catch((err) => {});
      fetchNotifications()
        .then((res) => setNotification(res))
        .catch((err) => {});
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const handleCompanyChange = async (item: any) => {
    if (compInfo.currentCompany.id === item.id) return;

    let { currentCompany, companies } = await fetchCompanyChange(
      String(item.id)
    );

    const loginMsg = getLoginMsg();

    window.localStorage.setItem(
      "loginMsg",
      JSON.stringify({
        ...loginMsg,
        currentCompany,
      })
    );
    currentCompany.id = String(currentCompany.id);
    companies = companies.map((c: any) => ({ ...c, id: String(c.id) }));

    setCompInfo({
      currentCompany,
      companies,
    });
  };

  return (
    <div className={S.header}>
      <div className={S.headerLeft}>
        <Dropdown
          overlay={
            <HeaderMenu
              userInfo={userInfo}
              setModalType={setModalType}
              layoutMode={layoutMode}
            />
          }
          placement="bottomLeft"
          overlayClassName="dropDownMenu"
        >
          <div className={S.logoWrapper}>
            <img
              src={`${ASSETS_UI_IMAGE_PATH}logo.png`}
              className={S.customLogo}
            />
            {customPropsRef && customPropsRef.showSupOSLogo && (
              <img src={logo} className={S.logoBase} alt="logo" />
            )}
            <i className={S.downIcon} />
          </div>
        </Dropdown>

        <Dropdown
          overlay={
            <Menu className={S.headerMenu}>
              {compInfo.companies.map((item: any) => (
                <Menu.Item
                  key={item.code}
                  className={S.headerMenuItem}
                  onClick={(e) => handleCompanyChange(item)}
                >
                  {item.name}
                </Menu.Item>
              ))}
            </Menu>
          }
          placement="bottomLeft"
          overlayClassName="dropDownMenu"
        >
          <div className={S.companySelect}>
            <div className={S.showCompany}>
              {compInfo.currentCompany.name}
              <i className={S.downIcon} />
            </div>
          </div>
        </Dropdown>
      </div>
      <div className={S.headerRight}>
        {customPropsRef && customPropsRef.showWeather ? (
          <div className={S.weather}>
            <iframe
              style={{ width: "240px",height:'28px' }}
              scrolling="no"
              src="https://i.tianqi.com/?c=code&a=getcode&id=34&icon=1&color=%23fff"
            ></iframe>
          </div>
        ) : null}
        <div
          className={S.message}
          onClick={() => (window.location.href = "/#/link/selfstationletter")}
        >
          <i className={S.messageIcon}></i>
          <span className={S.messageText}>
            {_.get(notification, ["pagination", "total"], 0)}
          </span>
        </div>
        <div
          className={S.notice}
          onClick={() => (window.location.href = "/#/todo-center")}
        >
          <i className={S.noticeIcon} />
          <span>{_.get(todoList, ["pagination", "total"], 0)}待办</span>
        </div>
        <DateTime />
      </div>
    </div>
  );
};

export default memo(Header);
