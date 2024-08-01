import type { APP_ICON_SIZE, planById, layoutById } from "./config";

import type { AppInfo, AuthorityAppInfo, ComponentItem } from "./service";

export interface DesktopInfo {
  supos_desktoplts_background: string;
  supos_desktoplts_currentplan: string;
  supos_desktoplts_iconsize: APP_ICON_SIZE;
  supos_desktoplts_layoutdata: string;
  supos_desktoplts_ownapplist: string;
  supos_desktoplts_username: string;
  supos_desktoplts_layoutmode: number;
}

export interface DesktopSimpleInfo {
  background: string;
  currentPlan: [typeof planById[number], typeof layoutById[number]];
  iconSize: APP_ICON_SIZE;
  layoutData: Record<any, any>;
  ownAppList: AuthorityAppInfo[];
  username: string;
  layoutMode: number;
  isExtends?: boolean;
  companyId: string;
}

export interface AllAppsMap {
  [key: string]: AppInfo;
}

export interface AuthorityAppsMap {
  [key: string]: AuthorityAppInfo;
}

export interface AuthorityAppInfoWithProps extends AuthorityAppInfo {
  selectedKeys: Array<string>;
  openKeys: Array<string>;
  activeUrl: string;
}

export enum ModalType {
  NONE,
  AUTHORITY_APPS,
  LOGOUT,
  PASSWORD,
  USER_INFO,
  APP_VIEW_STAGE,
  LAYOUT,
}
// export type ModalType = 'AUTHORITY_APPS' | null;

export type { AppInfo, AuthorityAppInfo, ComponentItem };
