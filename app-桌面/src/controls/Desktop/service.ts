import request from "./request";
import {
  NAMESPACE,
  OBJECT_NAME,
  BASE_URL,
  ASSETS_UI_IMAGE_PATH,
  APP_ID,
  BasePath,
} from "./config";

import type { DesktopInfo, DesktopSimpleInfo } from "./type";

const FETCH_VERSION_URL = "/api/config/version";

export let fetchVersion = (): Promise<"v2" | "v3" | "v4"> =>
  request("GET", FETCH_VERSION_URL).then((res) => {
    const { majorVersion } = res;
    let version: "v2" | "v3" | "v4" = "v2";
    if (/4\./.test(majorVersion)) version = "v4";
    if (/3\.50/.test(majorVersion)) version = "v4";
    if (/3\.(2|0)0/.test(majorVersion)) version = "v3";
    fetchVersion = () => Promise.resolve().then(() => version);
    return version;
  });

export const fetchDeskTopInfo = (
  username: string,
  companyId: string
): Promise<DesktopSimpleInfo> =>
  fetchVersion().then((version) =>
    request("POST", `${BasePath.OODM_INNER_SERVER[version]}/querySQLExec`, {
      input: JSON.stringify({
        sql: `select * from ${NAMESPACE}_${OBJECT_NAME} where ${NAMESPACE}_username = '${username}' and ${NAMESPACE}_companyId = '${companyId}'`,
      }),
    }).then(
      (res) =>
        (_.get(res, ["data", "result", "data", "dataSource"]) || []).map(
          (desktopInfo: DesktopInfo) => ({
            background: desktopInfo[`${NAMESPACE}_background`],
            currentPlan: JSON.parse(desktopInfo[`${NAMESPACE}_currentplan`]),
            iconSize: Number(desktopInfo[`${NAMESPACE}_iconsize`]) || 1,
            layoutData: JSON.parse(desktopInfo[`${NAMESPACE}_layoutdata`]),
            ownAppList: JSON.parse(desktopInfo[`${NAMESPACE}_ownapplist`]),
            username: desktopInfo[`${NAMESPACE}_username`],
            layoutMode: Number(desktopInfo[`${NAMESPACE}_layoutmode`]) || 0,
          })
        )[0]
    )
  );

interface UsersInfoTable {
  (
    username: string,
    companyId: string
  ):Promise<DesktopSimpleInfo>
}
export const fetchDeskTopInfo2: UsersInfoTable = (username,companyId) =>
fetchVersion().then((version) =>
  request("POST", `${BasePath.OODM_SERVER[version]}/usersInfo`, {
    username,
    companyId
  }).then(
    (res) =>
      (_.get(res, ["data", "result"]) || []).map(
        (desktopInfo: DesktopInfo) => ({
          background: desktopInfo[`${NAMESPACE}_background`],
          currentPlan: JSON.parse(desktopInfo[`${NAMESPACE}_currentplan`]),
          iconSize: Number(desktopInfo[`${NAMESPACE}_iconsize`]) || 1,
          layoutData: JSON.parse(desktopInfo[`${NAMESPACE}_layoutdata`]),
          ownAppList: JSON.parse(desktopInfo[`${NAMESPACE}_ownapplist`]),
          username: desktopInfo[`${NAMESPACE}_username`],
          layoutMode: Number(desktopInfo[`${NAMESPACE}_layoutmode`]) || 0,
        })
      )[0]
  )
);

const TO_DO_LIST_URL = `/inter-api/flow-service/v1/tasks/pending?current=1&pageSize=20`;

interface ToDoListItem {
  list: Array<any>;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

export const fetchTodoList = (): Promise<ToDoListItem> =>
  request("GET", TO_DO_LIST_URL);

const NOTIFICATION_URL = (date: Date) => {
  const startTime = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  const endTime = new Date(date.getFullYear(), date.getMonth(), 0).getTime();
  return `/inter-api/notification-admin/v1/notice/message/record/stattionletter?startTime=${startTime}&endTime=${endTime}&pageNo=1&pageSize=20`;
};

interface NotificationListItem extends ToDoListItem {}

export const fetchNotifications = (): Promise<Array<NotificationListItem>> =>
  request("GET", NOTIFICATION_URL(new Date()));

const DEPARTMENT_URL = "/inter-api/organization/v1/department/current/user";

interface CurrentUserDepartment {
  code: string;
  companyId: number;
}

export const fetchCurrentUserDepartment = (): Promise<CurrentUserDepartment> =>
  request("GET", DEPARTMENT_URL).then((res) => res.data);

const USER_SESSION_URL = `/inter-api/auth/v1/user/userSessionInfo`;
const CURRENT_USER_URL = `/inter-api/auth/v1/currentuser`;

export const fetchUserSessionInfo = (): Promise<{
  companyId: string;
  companyName: string;
  username: string;
}> => request("GET", USER_SESSION_URL).then((res) => res.userSessionInfo);

export const fetchCurrentUserInfo = (): Promise<UserInfo> =>
  request("GET", CURRENT_USER_URL).then((res) => ({
    ...res.userInfo,
    uploadUrl: res.userInfo.uploadUrl
      ? `${BASE_URL}${res.userInfo.uploadUrl}`
      : `${ASSETS_UI_IMAGE_PATH}avatar.png`,
  }));

const APP_LIST_URL = "/api/app/manager?sortType=2&sortFiled=createTime";

export interface AppInfo {
  appId: string;
}
export const fetchAllApps = (): Promise<Array<AppInfo>> =>
  request("GET", APP_LIST_URL).then(res=>{debugger;return res;}).then((res) => _.get(res, ["list"], []));

const AUTHORITY_APP_URL = "/inter-api/rbac/v1/menus/currentUser/supos?status=1";

export interface AuthorityAppInfo {
  id: number;
  name: string;
  displayName: string;
  code: string;
  vendorDescription: string;
  icon: string;
  url: string;
  folderName: string;
  children: Array<AuthorityAppInfo>;
  sourceType: string | null;
  targetType: string | null;
}
export const fetchAuthorityApps = (): Promise<Array<AuthorityAppInfo>> =>
  request("GET", AUTHORITY_APP_URL).then((res) => _.get(res, ["list"], []));

interface FetchUpdateFields {
  (where: any, update: any): Promise<unknown>;
}

export const fetchUpdateFields: FetchUpdateFields = (where, update) =>
  fetchVersion().then((version) =>
    request(
      "POST",
      `${BasePath.OODM_INNER_SERVER[version]}/UpdateDataTableEntry`,
      { where, update }
    )
  );
interface FetchCreateFields {
  (params: any): Promise<unknown>;
}

export const fetchCreateFields: FetchCreateFields = (params) =>
  fetchVersion().then((version) =>
    request(
      "POST",
      `${BasePath.OODM_INNER_SERVER[version]}/AddDataTableEntry`,
      { params: JSON.stringify(params) }
    )
  );

const LOGOUT_URL = "/inter-api/auth/logout";

export const fetchLogout = (): Promise<unknown> => request("PUT", LOGOUT_URL);

export const fetchLogoutByTicket = (ticket: string): Promise<unknown> => {
  request.setHeader({ Authorization: `Bearer ${ticket}` });
  return fetchLogout();
};

const LOGOUT_REDIRECT_URL = "/inter-api/auth/v1/identityProviders/current";

export const fetchLogoutRedirect = (): Promise<{ data: any }> =>
  request("GET", LOGOUT_REDIRECT_URL);

interface FetchChangePassword {
  (options: unknown): Promise<unknown>;
}
const CHANGE_PASSWORD_URL = "/inter-api/auth/v1/currentuser/password";

export const fetchChangePassword: FetchChangePassword = (options) =>
  request("PUT", CHANGE_PASSWORD_URL, options);

interface FetchUpdateAvatar {
  (options: { uploadUrl: string }): Promise<{ data: boolean }>;
}
const UPDATE_AVATAR_URL = "/inter-api/auth/v1/currentuser";

export const fetchUpdateAvatar: FetchUpdateAvatar = (options) =>
  fetchCurrentUserInfo().then((res) =>
    request("PUT", UPDATE_AVATAR_URL, { ...res, ...options })
  );

export interface ComponentItem {
  appId?: string;
  id: string;
  name: string;
  parentId?: string;
  url?: string;
  sizeType?: string;
  cover?: string;
  children: Array<ComponentItem>;
}
interface FetchComponentsList {
  (): Promise<Array<ComponentItem>>;
}
const COMPONENT_LIST_URL = `/api/compose/manage/folders?parentId=${APP_ID}`;

export const fetchComponentList: FetchComponentsList = () =>
  request("GET", COMPONENT_LIST_URL).then((res) =>
    _.get(res, ["children", "0", "children"], [])
  );

export interface InstallAppItem {
  id: string;
  appId: string;
  icon: string;
}

interface FetchInstallAppList {
  (): Promise<InstallAppItem[]>;
}

const INSTALL_APP_LIST_URL = `/inter-api/installer/v2/apps?pageNo=1&pageSize=2000&order=name`;

export const fetchInstallAppList: FetchInstallAppList = () =>
  request("GET", INSTALL_APP_LIST_URL).then((res) => _.get(res, "list", []));

export interface UserDepartment {
  code: string;
  parentId: number | null;
  companyId: string;
}

interface FetchDepartmentByUsername {
  (payload: { username: string; ticket: string }): Promise<UserDepartment[]>;
}

const FETCH_DEPARTMENT_URL = `/inter-api/organization/v1/department/person?companyId=1000&current=1&pageSize=20&keyword=`;

export const fetchDepartmentByStaffCode: FetchDepartmentByUsername = ({
  username,
  ticket,
}) => {
  request.setHeader({ Authorization: `Bearer ${ticket}` });
  return request("GET", `${FETCH_DEPARTMENT_URL}${username}`).then((res) =>
    _.get(res, ["list", "0", "department"], [])
  );
};

interface FetchAdminToken {
  (): Promise<string>;
}

export const fetchAdminToken: FetchAdminToken = () =>
  fetchVersion().then((version) =>
    request("POST", `${BasePath.OODM_SERVER[version]}/loginReturnAdminToken`, {
      origin: window.origin,
    }).then((res) => res.data.result)
  );


interface FetchDepartmentById {
  ({ id, ticket }: { id: number; ticket: string }): Promise<UserDepartment>;
}

const DEPARTMENT_BY_ID_URL = `/inter-api/organization/v1/department?id=`;

export const fetchDepartmentById: FetchDepartmentById = ({ id, ticket }) => {
  request.setHeader({ Authorization: `Bearer ${ticket}` });
  return request("GET", `${DEPARTMENT_BY_ID_URL}${id}`).then((res) => res.data);
};

export const searchDeskConfig = async ({
  stack,
  ticket,
}: {
  stack: UserDepartment[];
  ticket: string;
}): Promise<DesktopSimpleInfo | null> => {
  // 当对队列处理,如果查不到当前部门配置,把上级部门信息放回队列继续查询
  if (stack.length) {
    const department = stack.pop()!;

    const deskInfo = await fetchDeskTopInfo(
      department.code,
      department.companyId
    );

    // 如果在部门配置中查到直接返回
    // 如果是个人,这是可继承的配置 [person]
    // 如果是管理员,是管理员配置 [person,admin]
    // 也有可能是管理员没有默认配置,这是继承来的上级管理员配置
    // 不存在管理员没有个人配置,但是有管理员配置
    if (deskInfo) return deskInfo;

    if (department?.parentId) {
      const parentDepartment = await fetchDepartmentById({
        ticket,
        id: department?.parentId,
      });
      if (parentDepartment) stack.push(parentDepartment);
    }

    return await searchDeskConfig({
      stack,
      ticket,
    });
  }
  return null;
};

const COMPANY_CHANGE_URL = "/inter-api/auth/company/change";

interface FetchCompanyChange {
  (companyId: string): Promise<any>;
}

export const fetchCompanyChange: FetchCompanyChange = (companyId) => {
  return request("PUT", COMPANY_CHANGE_URL, {
    clientId: "ms-content-sample",
    companyId,
  }).then((res) => res);
};
