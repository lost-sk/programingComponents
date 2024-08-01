import React from "react";

import type {
  AuthorityAppInfo,
  AuthorityAppInfoWithProps,
  ComponentItem,
  AuthorityAppsMap,
  DesktopSimpleInfo,
} from "./type";

import {
  SYSTEM_PAGE_BASE_URL,
  RUN_TIME_PAGE_BASE_URL,
  APP_ICON_SIZE,
  BLOCK_TYPE,
  planById,
  targetType,
} from "./config";

const getToken = (): string => localStorage.getItem("ticket")!;

const getLoginMsg = (): any => {
  const msg = JSON.parse(localStorage.getItem("loginMsg")!);
  msg.currentCompany.id = String(msg.currentCompany.id);
  msg.companies = msg.companies.map((c: any) => ({ ...c, id: String(c.id) }));
  return msg;
};

const calcInteractiveAreaHeight = (scale: number): number =>
  ((document.body.clientHeight || document.documentElement.clientHeight) - 90) /
  scale;

const calcIconSize = (iconSize: APP_ICON_SIZE): React.CSSProperties => {
  if (iconSize === APP_ICON_SIZE.LARGE)
    return { width: "72px", height: "72px" };
  if (iconSize === APP_ICON_SIZE.NORMAL)
    return { width: "64px", height: "64px" };
  if (iconSize === APP_ICON_SIZE.SMALL)
    return { width: "52px", height: "52px" };
  return {};
};
const calcCloseIconSize = (iconSize: APP_ICON_SIZE): React.CSSProperties => {
  if (iconSize === APP_ICON_SIZE.LARGE)
    return { right: "4px", top: "4px", width: "26px", height: "26px" };
  if (iconSize === APP_ICON_SIZE.NORMAL)
    return { right: "6px", top: "6px", width: "24px", height: "24px" };
  if (iconSize === APP_ICON_SIZE.SMALL)
    return { right: "12px", top: "4px", width: "22px", height: "22px" };
  return {};
};

const analysisSSOAppHref = (app: AuthorityAppInfo, userInfo: UserInfo) => {
  let href = "";
  const ticket = getToken();
  const { username } = userInfo;
  const urlMatch = app.vendorDescription.match(/<URL=(.+?)>/);
  if (!urlMatch) return;
  href = urlMatch[1];
  const queryMatch = app.vendorDescription.match(/<SEARCH=(.+?)>/);
  if (queryMatch) {
    href = href + "?";
    const query = queryMatch[1];
    query.split("&").forEach((item: string) => {
      let queryItem;
      if ((queryItem = item.match(/([0-9a-zA-Z-]+)=([0-9a-zA-Z-]+)/))) {
        href += `${queryItem[1]}=${queryItem[2]}&`;
      } else if ((queryItem = item.match(/([0-9a-zA-Z-]+?)={(\w+)}/))) {
        switch (queryItem[2]) {
          case "ticket":
            href += `${queryItem[1]}=${ticket}&`;
            break;
          case "username":
            href += `${queryItem[1]}=${username}&`;
            break;
          default:
            break;
        }
      } else {
      }
    });
    href = href.slice(0, -1);
  }
  return href;
};

const isSSOApp = (app: AuthorityAppInfo) =>
  /<SSO>/gi.test(app.vendorDescription);

const analysisActiveUrl = (code: string, url: string) =>
  /^http/.test(url)
    ? url
    : /^\/lcdp-runtime/.test(url)
    ? `/main/#${url}`
    : /Page/.test(code)
    ? RUN_TIME_PAGE_BASE_URL + code
    : SYSTEM_PAGE_BASE_URL + url;

const analysisTaskAppProps = (
  item: AuthorityAppInfo
): AuthorityAppInfoWithProps => {
  let copy = item;
  let openKeys: string[] = [];
  while (copy.children.length) {
    copy = copy.children[0];
    if (copy.children.length) openKeys.push(String(copy.id));
  }
  return {
    ...item,
    selectedKeys: [String(copy.id)],
    openKeys,
    activeUrl: urlHash(analysisActiveUrl(copy.code, copy.url)),
  };
};

const renderSchema =
  (data: any) =>
  (hydrateFn: any, id = "sof") => {
    if (data.type === BLOCK_TYPE.CONTAINER)
      return hydrateFn(
        <div id={`${id}:eof`} key={`${id}:eof`} data-set={data}></div>
      );
    if (data.type === BLOCK_TYPE.LAYOUT) {
      return hydrateFn(
        <div id={`${id}:b$`} key={`${id}:b$`} data-set={data}>
          {data.children.map((item: any, index: number) =>
            renderSchema(item)(hydrateFn, `${id}:b${index}`)
          )}
        </div>
      );
    }
  };

const initLayoutData = (
  iteratorArr: Array<any>
): {
  [key: string]: object;
} => {
  const generateEmptySchema = (schema: any, iterator: Array<any>) => {
    if (!iterator.length) return schema;
    const iteratorItem = iterator[0];
    iteratorItem.forEach((key: string) => {
      schema[key] = generateEmptySchema({}, iterator.slice(1, Infinity));
    });
    return schema;
  };
  return generateEmptySchema({}, iteratorArr);
};

const componentToMap = (
  components: Array<any>,
  mainKey?: "code"
): { [key: string]: any } =>
  components.reduce((o, item: any) => {
    Object.assign(o, {
      [mainKey ? item[mainKey] : item.id]: item,
    });
    if (item.children && item.children.length)
      return { ...o, ...componentToMap(item.children, mainKey) };
    return o;
  }, {});

const hydrateReduce = (...args: Array<any>) =>
  args.reduce((a, b) => (e: any) => b(a(e)));

const hydrateDepsData =
  (userComponentsMap: { [key: string]: ComponentItem } = {}) =>
  (layoutData: any = {}) =>
  (element: React.ReactElement) => {
    const { ["data-set"]: data, id } = element.props;
    const { type } = data;
    if (type === BLOCK_TYPE.CONTAINER) {
      const relevance = layoutData[id]
        ? userComponentsMap[layoutData[id]]
        : null;
      element = (
        <element.type {...element.props} relevance={relevance}></element.type>
      );
    }
    return element;
  };

const hydrateDesignStyle = () => (element: React.ReactElement) => {
  const { ["data-set"]: data, id } = element.props;
  const { type, direction, grow } = data;
  if (type === BLOCK_TYPE.CONTAINER)
    return (
      <div style={{ flex: grow, position: "relative" }} key={id}>
        <element.type
          {...element.props}
          style={{
            position: "absolute",
            left: "8px",
            top: "8px",
            right: "8px",
            bottom: "8px",
            background: "rgba(255,255,255,.4)",
            margin: "auto",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        />
      </div>
    );
  if (type === BLOCK_TYPE.LAYOUT)
    return (
      <element.type
        {...element.props}
        key={id}
        style={{
          display: "flex",
          flexDirection: direction === BLOCK_TYPE.COLUMN ? "column" : "row",
          height: "100%",
          width: "100%",
          flex: grow,
        }}
      ></element.type>
    );
  return element;
};

const urlHash = (href: string) =>
  href.replace(
    /(\/)(#\/)/,
    () =>
      `${RegExp.$1}?random=${Math.random().toString().substring(2, 8)}${
        RegExp.$2
      }`
  );

const objKey2Str = (obj: Record<any, any>): Record<any, string> => {
  const nObj: Record<any, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v !== "string") {
      nObj[k] = JSON.stringify(v);
    }
    nObj[k] = v;
  }
  return nObj;
};

const filterUserAppsByAuthorityAppsMap = (
  ownAppList: AuthorityAppInfo[],
  authorityAppsMap: AuthorityAppsMap
) =>
  ownAppList
    .map(
      (l) =>
        (l.targetType === targetType.SHOW_FOLDER
          ? {
              ...l,
              targetType: targetType.SHOW_FOLDER,
              sourceType: targetType.SHOW_FOLDER,
              children: l.children
                .filter((cl) => authorityAppsMap[cl.id] !== undefined)
                .map((cl) => ({
                  ...cl,
                  displayName: authorityAppsMap[cl.id].displayName,
                  name: authorityAppsMap[cl.id].name,
                  icon: authorityAppsMap[cl.id].icon,
                })),
            }
          : authorityAppsMap[l.id]
          ? {
              ...l,
              targetType: targetType.SHOW_APP,
              sourceType: targetType.SHOW_APP,
              displayName: authorityAppsMap[l.id].displayName,
              name: authorityAppsMap[l.id].name,
              icon: authorityAppsMap[l.id].icon,
            }
          : null) as AuthorityAppInfo
    )
    .filter((l) => l && (!l.children || l.children.length));

const filerUserApps = (
  deskInfo: DesktopSimpleInfo,
  authorityAppsMap: AuthorityAppsMap
) => ({
  ...deskInfo,
  ownAppList: filterUserAppsByAuthorityAppsMap(
    deskInfo.ownAppList,
    authorityAppsMap
  ),
});

const flattenAppFolder = (
  appFolder: AuthorityAppInfo,
  arr: AuthorityAppInfo[] = []
): AuthorityAppInfo[] => {
  if (!appFolder.children.length) return appFolder.children;
  appFolder.children.forEach((child) => {
    arr = arr.concat(child).concat(flattenAppFolder(child));
  });
  return arr;
};

export {
  getToken,
  getLoginMsg,
  calcInteractiveAreaHeight,
  analysisSSOAppHref,
  isSSOApp,
  analysisTaskAppProps,
  analysisActiveUrl,
  calcIconSize,
  calcCloseIconSize,
  renderSchema,
  initLayoutData,
  componentToMap,
  hydrateReduce,
  hydrateDepsData,
  hydrateDesignStyle,
  urlHash,
  objKey2Str,
  filerUserApps,
  flattenAppFolder,
};
