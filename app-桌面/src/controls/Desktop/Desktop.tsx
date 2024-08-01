import React, {
  useState,
  useEffect,
  useRef,
  memo,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";

import { Spin } from "antd";
import Header from "./Header";
import UserCard from "./UserCard";
import UserAppList from "./UserAppList";
import AuthorityApps from "./AuthorityApps";
import UserAppFolderModal from "./UserAppFolderModal";
import Logout from "./Logout";
import Password from "./Password";
import UserSetting from "./UserSetting";
import TaskBar from "./TaskBar";
import AppViewStage from "./AppViewStage";
import ComponentStage from "./ComponentStage";
import ComponentLayout from "./ComponentLayout";

import Loading from "./Loading";
import S from "./style.module.scss";

import {
  useSetBackgroundImage,
  useWindowResize,
  useAppIconSize,
  useActiveTaskApp,
} from "./utilHooks";

import {
  calcInteractiveAreaHeight,
  isSSOApp,
  analysisSSOAppHref,
  initLayoutData,
  componentToMap,
  objKey2Str,
  filerUserApps,
  getLoginMsg,
} from "./util";

import {
  fetchDeskTopInfo2,
  fetchUserSessionInfo,
  fetchCurrentUserInfo,
  fetchAllApps,
  fetchAuthorityApps,
  fetchUpdateFields,
  fetchCreateFields,
  fetchComponentList,
  fetchInstallAppList,
  fetchDepartmentByStaffCode,
  fetchAdminToken,
  searchDeskConfig,
  fetchLogoutByTicket,
} from "./service";

import {
  AllAppsMap,
  AuthorityAppsMap,
  AuthorityAppInfo,
  ModalType,
  ComponentItem,
  DesktopSimpleInfo,
} from "./type";

import {
  BACKGROUND_IMAGE_DEFAULT,
  APP_COVER_DEFAULT,
  APP_ID,
  APP_ICON_SIZE,
  sourceType,
  planById,
  layoutById,
  ASSETS_COMPONENT_IMAGE_PATH,
  RUN_TIME_PAGE_BASE_URL,
  SYSTEM_PAGE_BASE_URL,
  targetType,
  LayoutMode,
} from "./config";

import type { CustomProps } from "./interface";
import type { InstallAppItem } from "./service";

export interface UpdateDesktopFields {
  (data: any): Promise<any> | undefined;
}
export interface CreateDesktopFields {
  (data: any): Promise<any>;
}

interface DesktopProps {
  outerProps: any;
}

const initLayoutData$1 = initLayoutData([planById, layoutById]);

const Desktop: React.FC<DesktopProps> = ({ outerProps = {} }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(
    JSON.parse((window.localStorage.getItem("loginMsg") as string) || "{}")
  );

  const [backgroundImageSrc, setBackgroundImageSrc] =
    useSetBackgroundImage(userInfo);
  const [authorityAppIDs, setAuthorityAppIDs] = useState<Array<number>>([]);
  const [authorityAppsMap, setAuthorityAppsMap] = useState<AuthorityAppsMap>(
    {}
  );
  const [userApps, setUserApps] = useState<Array<AuthorityAppInfo>>([]);
  const [userComponentsId, setUserComponentsId] = useState<Array<string>>([]);
  const [userComponentsMap, setUserComponentsMap] = useState({});
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [appIconSize, setAppIconSize] = useAppIconSize();
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null);
  const [layoutData, setLayoutData] = useState(initLayoutData$1);
  const [currentPlan, setCurrentPlan] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [layoutMode, setLayoutMode] = useState(0);

  const [, , scaleX] = useWindowResize();
  const customProps = useRef<CustomProps>({
    showSupOSLogo: false,
    isSSO: false,
    isIconWithRightClickInteractive: false,
    isDeskAdminMode: false,
    showWeather: false,
    autoHideTask: false,
  });

  const [compInfo, setCompInfo] = useState(() => {
    const { currentCompany, companies } = getLoginMsg();
    currentCompany.id = String(currentCompany.id);

    return { currentCompany, companies };
  });

  useEffect(() => {
    try {
      const customAttr = outerProps.data.getAttrObject();
      customProps.current.showSupOSLogo = customAttr.showSupOSLogo ?? false;
      customProps.current.isSSO = customAttr.isSSO ?? false;
      customProps.current.isIconWithRightClickInteractive =
        customAttr.isIconWithRightClickInteractive ?? false;
      customProps.current.isDeskAdminMode = customAttr.isDeskAdminMode ?? false;
      customProps.current.showWeather = customAttr.showWeather ?? false;
      customProps.current.autoHideTask = customAttr.autoHideTask ?? false;
    } catch (err) {}
  }, [outerProps]);

  const [
    activeTaskAppId,
    taskAppList,
    setActiveTaskApp,
    updateTaskApp,
    deleteTaskApp,
  ] = useActiveTaskApp(authorityAppsMap);

  const deskTopWrapperRef = useRef<HTMLDivElement>(null);

  const updateDesktopFields: UpdateDesktopFields = useCallback(
    (data) => {
      const where = {
        username: data.username || userInfo.staffCode,
        companyId: compInfo.currentCompany.id,
      };
      const update = _.mapValues(data, (v: any) =>
        typeof v == "object" ? JSON.stringify(v) : v
      );
      return fetchUpdateFields(where, update);
    },
    [userInfo, compInfo]
  );

  const createDesktopFields: CreateDesktopFields = useCallback(
    (data) => fetchCreateFields(data),
    []
  );

  // 获取桌面配置后根据模式查找布局配置
  // 布局模式切换之后重新查找布局配置
  const layoutModeCheck = useCallback(
    ({
      userInfo,
      mode,
      ticket,
    }: {
      userInfo: UserInfo;
      mode: number;
      ticket: string;
    }) => {
      const cb = (deskData: DesktopSimpleInfo | null) => {
        if (deskData) {
          setLayoutData(deskData.layoutData);
        } else {
          setLayoutData(initLayoutData([planById, layoutById]));
        }
      };

      return (async () => {
        if (mode === LayoutMode.DEPARTMENT) {
          if (userInfo.departments && userInfo.departments.length) {
            const deskInfo = await searchDeskConfig({
              stack: [...userInfo.departments],
              ticket,
            });
            cb(deskInfo);
          } else {
            setLayoutData(initLayoutData([planById, layoutById]));
          }
        } else if (mode === LayoutMode.COMPANY) {
          const deskInfo = await fetchDeskTopInfo2(
            "COMPANY",
            compInfo.currentCompany.id
          );
          cb(deskInfo);
        }
      })();
    },
    []
  );

  // 缓存同时有管理员和个人的配置信息
  const multipleConfig = useRef<{ [key: string]: DesktopSimpleInfo }>({});
  const timer = useRef<number>(0);
  const ticketRef = useRef("");

  useEffect(() => {
    setLoading(true);
    multipleConfig.current = {};

    (async () => {
      try {
        const [allApps, authorityAppsOrigin, componentList, installApps] =
          await Promise.all([
            fetchAllApps(),
            fetchAuthorityApps(),
            fetchComponentList(),
            fetchInstallAppList(),
          ]);

        const allAppsMap = allApps.reduce(
          (map, app) => ((map[app.appId] = app), map),
          {} as AllAppsMap
        );

        // apps in app manager
        const installAppsMap = installApps.reduce(
          (map, app) => ((map[app.appId] = app), map),
          {} as { [K: string]: InstallAppItem }
        );

        let authorityApps = authorityAppsOrigin
          // exclude desktop app
          .filter((app) => app.children && app.children.length)
          .map((app) => {
            return {
              ...app,
              icon: encodeURI(
                _.get(allAppsMap, [app.code, "coverUrl"]) ||
                  _.get(installAppsMap, [app.code, "icon"]) ||
                  APP_COVER_DEFAULT
              ),
              sourceType: sourceType.AUTHORITY_APP,
              targetType: null,
              vendorDescription: _.get(
                allAppsMap,
                [app.code, "vendorDescription"],
                ""
              ),
            };
          });

        const desktopApp = authorityApps.find((l) => l.code === APP_ID);
        authorityApps = authorityApps.filter((l) => l.code !== APP_ID);

        const authorityAppIDs = authorityApps.map((app) => app.id);
        const authorityAppsMap = authorityApps.reduce(
          (map, app) => ((map[app.id] = app), map),
          {} as AuthorityAppsMap
        );
        setAuthorityAppsMap(authorityAppsMap);
        setAuthorityAppIDs(authorityAppIDs);

        const authorityComponentMap = componentToMap(
          _.get(desktopApp, "children", []),
          "code"
        );
        const compReg = /\s*[\(\（]\s*([A-Z])\s*[\)\）]\s*$/;
        const filterAuthorityComponents = (
          children: Array<ComponentItem> = []
        ) =>
          children
            .filter((l) => authorityComponentMap[l.id])
            .map((l) => ({
              ...l,
              visible: false,
              sizeType: l.name.match(compReg)
                ? l.name.match(compReg)?.[1]
                : null,
              cover: `${ASSETS_COMPONENT_IMAGE_PATH}${l.id}.png`,
              url: /Page_/.test(l.id)
                ? RUN_TIME_PAGE_BASE_URL + l.id
                : SYSTEM_PAGE_BASE_URL + l.url,
            }));

        const userComponents = componentList
          .filter((l) => authorityComponentMap[l.id])
          .map((l) => ({
            ...l,
            children: filterAuthorityComponents(l.children),
          }))
          .concat({
            id: "ALL",
            name: "全部组件",
            children: [],
          } as any);

        const userComponentsMap = componentToMap(userComponents);
        setUserComponentsMap(userComponentsMap);

        const userComponentsId = userComponents.map(
          (component) => component.id
        );
        setUserComponentsId(userComponentsId);

        const userInfo = await fetchCurrentUserInfo();

        setUserInfo(userInfo);

        const desktopInfo = await fetchDeskTopInfo2(
          userInfo.staffCode,
          compInfo.currentCompany.id
        );
        const configs = multipleConfig.current;

        if (desktopInfo)
          configs.own = filerUserApps(desktopInfo, authorityAppsMap);

        if (customProps.current.isDeskAdminMode) {
          ticketRef.current = await fetchAdminToken();
          const departments = await fetchDepartmentByStaffCode({
            username: userInfo.staffCode,
            ticket: ticketRef.current,
          });

          // 过滤掉不是本公司的部门
          userInfo.departments = departments.filter(
            (d) =>
              (d.companyId = String(d.companyId)) === compInfo.currentCompany.id
          );

          // 即是个人也是管理员,个人配置没有管理员配置也一定没有,它们两个是同时创建的,所以不存在个人从自己的管理员配置中继承布局的情况
          // 管理员配置不能继承,只可能走初始化的逻辑
          // 管理员配置只需要查同级部门或全长配置
          // 个人配置可能存在从高层级继承的可能,需要添加继承的标记用于区分

          if (userInfo.userRoleList && userInfo.userRoleList.length) {
            const roles = userInfo.userRoleList.filter(
              (role) =>
                /^DESK/.test(role.code) ||
                (role.name === "部门桌面管理员" &&
                  !!(role.code = "DESK_DEPARTMENT")) ||
                (role.name === "全厂桌面管理员" &&
                  !!(role.code = "DESK_COMPANY"))
            );
            userInfo.deskRoles = roles;

            // 如果没部门是虚拟用户,不是真实的人员
            if (roles && roles.length && departments && departments.length) {
              await Promise.all(
                roles.map(async (role) => {
                  // 查找当前用户所在部门的配置,可以有多个部门,查找其中一个即可,因为所有部门状态配置同步
                  const deskInfo = await fetchDeskTopInfo2(
                    role.code === "DESK_DEPARTMENT"
                      ? departments[0].code
                      : "COMPANY",
                    compInfo.currentCompany.id
                  );
                  deskInfo &&
                    (configs[role.code] = filerUserApps(
                      deskInfo,
                      authorityAppsMap
                    ));
                })
              );
            }
          }
          if (!desktopInfo && departments && departments.length) {
            // 个人配置没有 配置可能是同部门其他管理员配置的
            if (configs.DESK_DEPARTMENT) {
              configs.own = {
                ...configs.DESK_DEPARTMENT,
                isExtends: true,
              };
            } else {
              // 也可能是上级部门或全厂继承过来的配置
              const deskInfo = await searchDeskConfig({
                stack: [
                  {
                    code: "COMPANY",
                    parentId: null,
                    companyId: compInfo.currentCompany.id,
                  },
                  ...departments,
                ],
                ticket: ticketRef.current,
              });
              deskInfo &&
                (deskInfo.isExtends = true) &&
                (configs.own = filerUserApps(deskInfo, authorityAppsMap));
            }
          }
        }
        const data = (staffCode: string): DesktopSimpleInfo => ({
          username: staffCode,
          ownAppList: [],
          background: BACKGROUND_IMAGE_DEFAULT,
          layoutData: initLayoutData([planById, layoutById]),
          iconSize:
            (localStorage.getItem(
              "DESKTOP_ICON_SIZE"
            ) as unknown as APP_ICON_SIZE) || APP_ICON_SIZE.NORMAL,
          currentPlan: [planById[0], layoutById[0]],
          layoutMode: LayoutMode.OWN,
          companyId: compInfo.currentCompany.id,
        });
        if (configs.own) {
          setUserApps(configs.own.ownAppList);
          setAppIconSize(configs.own.iconSize);
          setCurrentPlan(configs.own.currentPlan);
          setLayoutData(configs.own.layoutData);
          setBackgroundImageSrc(userInfo.staffCode, configs.own.background);
          setLayoutMode(configs.own.layoutMode);
          if (configs.own.isExtends) {
            delete configs.own.isExtends;
            createDesktopFields({
              ...configs.own,
              username: userInfo.staffCode,
              companyId: compInfo.currentCompany.id,
            });
          }
        } else {
          let deskInfo = data(userInfo.staffCode);
          createDesktopFields(deskInfo);
          configs.own = deskInfo;
          setUserApps(deskInfo.ownAppList);
          setAppIconSize(deskInfo.iconSize);
          setCurrentPlan(deskInfo.currentPlan);
          setLayoutData(deskInfo.layoutData);
          setBackgroundImageSrc(userInfo.staffCode, deskInfo.background);
          setLayoutMode(deskInfo.layoutMode);
        }
        setLoading(false);
        if (customProps.current.isDeskAdminMode) {
          if (
            userInfo.departments &&
            userInfo.departments.length &&
            userInfo.deskRoles &&
            userInfo.deskRoles.length
          ) {
            userInfo.deskRoles.forEach(({ code }) => {
              if (code === "DESK_DEPARTMENT" && !configs[code]) {
                userInfo.departments.forEach((dep) => {
                  createDesktopFields(objKey2Str(data(dep.code)));
                });
                configs[code] = data(code);
              } else if (code === "DESK_COMPANY" && !configs[code]) {
                createDesktopFields(objKey2Str(data("COMPANY")));
                configs[code] = data(code);
              }
            });
          }
          await layoutModeCheck({
            userInfo,
            mode: configs.own.layoutMode,
            ticket: ticketRef.current,
          });
          // 结束查询退出管理员帐号
          await fetchLogoutByTicket(ticketRef.current);
        }
        ticketRef.current = "";
      } catch (err) {
        console.log(err);
      }
    })();
  }, [
    customProps,
    customProps,
    setUserInfo,
    setUserApps,
    setAppIconSize,
    setCurrentPlan,
    setBackgroundImageSrc,
    setLayoutMode,
    createDesktopFields,
    layoutModeCheck,
    ticketRef,
    compInfo,
  ]);

  useEffect(() => {
    if (loading) {
      timer.current = window.setTimeout(() => {
        setLoading(false);
      }, 5 * 1000);
    }
    return () => window.clearTimeout(timer.current);
  }, [loading, timer]);

  const layoutModeChange = async (mode: number) => {
    setLoading(true);

    if (mode === 0) {
      const { layoutData } = await fetchDeskTopInfo2(
        userInfo.staffCode,
        compInfo.currentCompany.id
      );
      setLayoutData(layoutData);
    } else {
      const ticket = await fetchAdminToken();
      await layoutModeCheck({ mode, userInfo, ticket });
      await fetchLogoutByTicket(ticket);
    }

    setLoading(false);
    setLayoutMode(mode);
  };

  useEffect(() => {
    const handle = (e: MouseEvent) => e.stopPropagation();
    deskTopWrapperRef.current?.addEventListener("wheel", handle);
    return () =>
      deskTopWrapperRef.current?.removeEventListener("wheel", handle);
  }, [deskTopWrapperRef]);

  const clearModalType = () => {
    setModalType(ModalType.NONE);
  };

  const openApp = useCallback(
    (id: number): React.MouseEventHandler =>
      (e) => {
        console.table({ 打开的AppID: id });
        e.stopPropagation();
        const app = authorityAppsMap[id];

        if (isSSOApp(app)) {
          const href = analysisSSOAppHref(app, userInfo);
          window.open(href);
          return false;
        }

        if (app.code === "personalInfo") {
          window.open(window.location.origin + "/#/personal/personal-msg");
          return false;
        }

        setModalType(ModalType.APP_VIEW_STAGE);
        setActiveTaskApp(id);
        return;
      },
    [userInfo, authorityAppsMap, setActiveTaskApp]
  );
  if (!(window as any).__OPEN_SUPOS_APP__) {
    (window as any).__OPEN_SUPOS_APP__ = openApp;
  }
  const closeOpenApp = useCallback(
    (id: number) => deleteTaskApp(id),
    [deleteTaskApp]
  );

  const taskAppListMemo = useMemo(
    () =>
      authorityAppIDs.length
        ? taskAppList.map((taskApp) => ({
            ...authorityAppsMap[taskApp.id],
            ...taskApp,
          }))
        : [],
    [taskAppList, authorityAppIDs, authorityAppsMap]
  );

  const selectAppPageNode = (props: any) => updateTaskApp(props);

  const setActiveFolder = useCallback(
    (id: number | null) => (e?: React.MouseEvent) => {
      e && e.stopPropagation();
      setActiveFolderId(id);
    },
    []
  );

  return (
    <Spin
      {...{
        spinning: loading,
        indicator: <Loading />,
        wrapperClassName: S.loadingWrapper,
      }}
    >
      <div
        className={S.desktopWrapper}
        ref={deskTopWrapperRef}
        // add min-width: max-content in style ,avoid add with in inline style
        style={{
          backgroundImage: `url('${backgroundImageSrc}')`,
        }}
      >
        <Header
          {...{
            userInfo,
            setModalType,
            customProps,
            layoutMode,
            compInfo,
            setCompInfo,
          }}
        />
        <section
          className={S.desktopInteractiveArea}
          style={{
            height: calcInteractiveAreaHeight(scaleX),
            transform: `scale(${scaleX})`,
          }}
        >
          <UserCard
            {...{
              userInfo,
            }}
          />
          <UserAppList
            {...{
              appIconSize,
              setUserApps,
              updateDesktopFields,
              userApps,
              openApp,
              setActiveFolder,
              customProps,
            }}
          />
          <ComponentStage
            currentPlan={currentPlan}
            userComponentsMap={userComponentsMap}
            outerProps={outerProps}
            layoutData={layoutData}
          />
        </section>
        {
          // modalType === ModalType.APP_VIEW_STAGE
          <AppViewStage
            taskAppList={taskAppListMemo}
            activeTaskAppId={activeTaskAppId}
            selectAppPageNode={selectAppPageNode}
          />
        }
        {modalType === ModalType.LAYOUT && (
          <ComponentLayout
            scaleX={scaleX}
            layoutData={layoutData}
            userComponentsMap={userComponentsMap}
            userComponentsId={userComponentsId}
            currentPlan={currentPlan}
            setCurrentPlan={setCurrentPlan}
            backgroundImageSrc={backgroundImageSrc}
            setLayoutData={setLayoutData}
            clearModalType={clearModalType}
            updateDesktopFields={updateDesktopFields}
            multipleConfig={multipleConfig}
            userInfo={userInfo}
            customProps={customProps}
          />
        )}
      </div>

      {modalType === ModalType.AUTHORITY_APPS && (
        <AuthorityApps
          authorityApps={authorityAppIDs.map((id) => authorityAppsMap[id])}
          clearModalType={clearModalType}
          openApp={openApp}
        />
      )}
      {modalType === ModalType.LOGOUT && (
        <Logout clearModalType={clearModalType} customProps={customProps} />
      )}
      {modalType === ModalType.PASSWORD && (
        <Password clearModalType={clearModalType} userInfo={userInfo} />
      )}
      {modalType === ModalType.USER_INFO && (
        <UserSetting
          clearModalType={clearModalType}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          updateDesktopFields={updateDesktopFields}
          setBackgroundImageSrc={setBackgroundImageSrc}
          appIconSize={appIconSize}
          setAppIconSize={setAppIconSize}
          layoutMode={layoutMode}
          layoutModeChange={layoutModeChange}
          customProps={customProps}
        />
      )}

      {activeFolderId && (
        <UserAppFolderModal
          setActiveFolder={setActiveFolder}
          userApps={userApps}
          activeFolderId={activeFolderId}
          backgroundImageSrc={backgroundImageSrc}
          updateDesktopFields={updateDesktopFields}
          setUserApps={setUserApps}
          appIconSize={appIconSize}
          openApp={openApp}
          customProps={customProps}
        />
      )}
      <TaskBar
        activeTaskAppId={activeTaskAppId}
        taskAppList={taskAppListMemo}
        setActiveTaskApp={setActiveTaskApp}
        closeOpenApp={closeOpenApp}
        customProps={customProps}
      />
    </Spin>
  );
};

export default memo(Desktop);
