import { APP_ICON_SIZE } from "./config";

import type {
  AuthorityAppInfo,
  ComponentItem,
  DesktopSimpleInfo,
  AuthorityAppInfoWithProps,
} from "./type";

import type { UpdateDesktopFields } from "./Desktop";

export interface CustomProps {
  showSupOSLogo: boolean;
  isSSO: boolean;
  isIconWithRightClickInteractive: boolean;
  isDeskAdminMode: boolean;
  showWeather: boolean;
  autoHideTask: boolean;
}

export interface AppListProps {
  appIconSize: APP_ICON_SIZE;
  userApps: Array<AuthorityAppInfo>;
  setUserApps: React.Dispatch<React.SetStateAction<Array<AuthorityAppInfo>>>;
  updateDesktopFields: UpdateDesktopFields;
  openApp: (id: number) => React.MouseEventHandler;
  setActiveFolder: (id: number | null) => React.MouseEventHandler;
  customProps: React.RefObject<CustomProps>;
}

export interface UserFolderItemProps {
  folder: AuthorityAppInfo;
  index: number;
  iconSize: APP_ICON_SIZE;
  setDragging: (isDragging: boolean) => void;
  boundary?: React.RefObject<HTMLElement>;
  deleteAppById: (
    folder: AuthorityAppInfo,
    index: number
  ) => React.MouseEventHandler;
  updateUserApps: (
    handle: (
      userApps: Array<AuthorityAppInfo>
    ) => Array<AuthorityAppInfo> | null
  ) => void;
  style?: React.CSSProperties;
  sortUserApps: (s1: number, s2: number) => void;
  setActiveFolder: (id: number | null) => React.MouseEventHandler;
  customProps: React.RefObject<CustomProps>;
}

export interface UserAppItemProps {
  app: AuthorityAppInfo;
  index: number;
  iconSize: APP_ICON_SIZE;
  setDragging: (isDragging: boolean) => void;
  boundary?: React.RefObject<HTMLElement>;
  updateUserApps: (
    handle: (
      userApps: Array<AuthorityAppInfo>
    ) => Array<AuthorityAppInfo> | null
  ) => void;
  deleteAppById: (
    app: AuthorityAppInfo,
    index: number
  ) => React.MouseEventHandler;
  style?: React.CSSProperties;
  sortUserApps: (s1: number, s2: number) => void;
  openApp: (id: number) => React.MouseEventHandler;
  customProps: React.RefObject<CustomProps>;
}

export interface AppInFolderItemProps {
  app: AuthorityAppInfo;
  appIconSize: APP_ICON_SIZE;
  index: number;
  setIsDragging: (isDragging: boolean) => void;
  style?: React.CSSProperties;
  openApp: (id: number) => React.MouseEventHandler;
  deleteAppById: (folder: AuthorityAppInfo) => React.MouseEventHandler;
  sortUserApps: (s1: number, s2: number) => void;
  customProps: React.RefObject<CustomProps>;
}

export interface FolderLayerProps {
  userApps: Array<AuthorityAppInfo>;
  setActiveFolder: (id: number | null) => (e?: React.MouseEvent) => void;
  activeFolderId: number;
  backgroundImageSrc: string;
  updateDesktopFields: UpdateDesktopFields;
  setUserApps: React.Dispatch<React.SetStateAction<Array<AuthorityAppInfo>>>;
  appIconSize: APP_ICON_SIZE;
  openApp: (id: number) => React.MouseEventHandler;
  customProps: React.RefObject<CustomProps>;
}

export interface ComponentLayoutProps {
  scaleX: number;
  userComponentsMap: { [key: string]: ComponentItem };
  userComponentsId: Array<string>;
  layoutData: any;
  currentPlan: any;
  setCurrentPlan: (plan: any) => void;
  backgroundImageSrc: string;
  setLayoutData: (layout: any) => void;
  clearModalType: () => void;
  updateDesktopFields: UpdateDesktopFields;
  multipleConfig: React.RefObject<{ [key: string]: DesktopSimpleInfo }>;
  userInfo: UserInfo;
  customProps: React.RefObject<CustomProps>;
}

export interface ComponentDesignHydrateProps {
  id?: string;
  userComponentsMap: { [key: string]: ComponentItem };
  setLayoutData: (layout: any) => void;
  layoutData: any;
  schema?: any;
  layout: string;
  plan: string;
  customProps: any;
}

export interface UserSettingProps {
  clearModalType: () => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  updateDesktopFields: UpdateDesktopFields;
  setBackgroundImageSrc: (src: string, username: string) => void;
  appIconSize: APP_ICON_SIZE;
  setAppIconSize: (size: APP_ICON_SIZE) => void;
  layoutMode: number;
  layoutModeChange: (mode: number) => void;
  customProps: React.RefObject<CustomProps>;
}

export interface TaskAppProps {
  app: AuthorityAppInfoWithProps;
  activeTaskAppId: number | null;
  setActiveTaskApp: (id: number) => void;
  closeOpenApp: (id: number) => void;
  customProps: React.RefObject<CustomProps>;
}

export interface TaskBarProps {
  taskAppList: Array<AuthorityAppInfoWithProps>;
  activeTaskAppId: number | null;
  closeOpenApp: (id: number) => void;
  setActiveTaskApp: (id: number) => void;
  customProps: React.RefObject<CustomProps>;
}
