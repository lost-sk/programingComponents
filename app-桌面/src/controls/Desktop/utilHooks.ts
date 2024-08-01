import { useState, useCallback, useEffect } from "react";
import { APP_ICON_SIZE } from "./config";
import { analysisTaskAppProps, analysisActiveUrl, urlHash } from "./util";

import { AuthorityAppInfo, AuthorityAppsMap } from "./type";

interface SetBackgroundImage {
  (userInfo:UserInfo): [string, (newBackgroundSrc: string, username: string) => void];
}

const useSetBackgroundImage: SetBackgroundImage = (userInfo) => {
  const backgroundStorage = JSON.parse(
    localStorage.getItem("DESKTOP_BACKGROUND_SET") || "{}"
  );
  const [backgroundImage, setBackgroundImage] = useState(backgroundStorage[userInfo.staffCode]||'');

  const set = useCallback((username:string,src:string) => {
    const backgroundStorage = JSON.parse(
      localStorage.getItem("DESKTOP_BACKGROUND_SET") || "{}"
    );

    if (username) {
      const backgroundSet = {
        ...backgroundStorage,
        [username]: src,
      };
      localStorage.setItem(
        "DESKTOP_BACKGROUND_SET",
        JSON.stringify(backgroundSet)
      );
    }
    setBackgroundImage(src);
  }, []);
  return [backgroundImage, set];
};

const useWindowResize = () => {
  const [scale, setScale] = useState([
    Math.max(document.documentElement.clientWidth, 1366),
    (Math.max(document.documentElement.clientWidth, 1366) / 1920) * 1080,
    Math.max(document.documentElement.clientWidth, 1366) / 1920,
    Math.max(document.documentElement.clientHeight, 768) / 1080,
  ]);

  const handle = useCallback(() => {
    setScale([
      Math.max(document.documentElement.clientWidth, 1366),
      (Math.max(document.documentElement.clientWidth, 1366) / 1920) * 1080,
      Math.max(document.documentElement.clientWidth, 1366) / 1920,
      Math.max(document.documentElement.clientHeight, 768) / 1080,
    ]);
  }, [setScale]);
  useEffect(() => {
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("resize", handle);
    };
  }, []);
  return scale;
};

const useAppIconSize = (): [APP_ICON_SIZE, (size: APP_ICON_SIZE) => void] => {
  const storageSize = window.localStorage.getItem(
    "DESKTOP_APP_ICON_SIZE"
  ) as unknown;
  const storageSize2Number = Number(storageSize);
  const [iconSize, setIconSize] = useState(
    storageSize2Number
      ? (storageSize2Number as APP_ICON_SIZE)
      : APP_ICON_SIZE.NORMAL
  );

  if (storageSize2Number !== iconSize) {
    window.localStorage.setItem("DESKTOP_APP_ICON_SIZE", String(iconSize));
  }

  const set = useCallback((iconSize: APP_ICON_SIZE) => {
    window.localStorage.setItem("DESKTOP_APP_ICON_SIZE", String(iconSize));
    setIconSize(iconSize);
  }, []);

  return [iconSize, set];
};

interface SessionTaskAppInfo {
  id: number;
  activeUrl: string;
  openKeys: Array<string>;
  selectedKeys: Array<string>;
}

const useActiveTaskApp = (
  appsMap: AuthorityAppsMap
): [
  number | null,
  Array<SessionTaskAppInfo>,
  (id: number,openKeys?:string[],selectedKeys?:string[],firstTime?:boolean)=> void,
  (props: any) => void,
  (id: number) => void
] => {


  const sessionTaskAppList = window.sessionStorage.getItem("sessionTaskAppList")
    ? JSON.parse(window.sessionStorage.getItem("sessionTaskAppList")!)
    : [];

  const sessionActiveTaskAppId = Number(window.sessionStorage.getItem("activeAppId")) || null;

  const [taskAppList, setTaskAppList] = useState<Array<SessionTaskAppInfo>>(sessionTaskAppList);
  const [activeTaskAppId, setActiveTaskAppId] = useState<number | null>(sessionActiveTaskAppId);

  const setActiveTaskApp = useCallback(
    (id: number,openKeys?:string[],selectedKeys?:string[],firstTime?:boolean) => {
      const app = appsMap[id];
      const appWithProps = analysisTaskAppProps(app);
      const newUrl = new URL(location.href);
      setTaskAppList(l => {
        const taskList = l.some(({ id: appId }) => appId === id)
        ? [...l]
        : [...l].concat({
            id: appWithProps.id,
            activeUrl: appWithProps.activeUrl,
            openKeys: openKeys && firstTime ? openKeys : appWithProps.openKeys,
            selectedKeys: selectedKeys && firstTime ? selectedKeys:appWithProps.selectedKeys,
          });
          window.sessionStorage.setItem(
            "sessionTaskAppList",
            JSON.stringify(taskList)
          );
          let item;
          if(item= l.find(({ id: appId }) => appId === id)){
            openKeys = item.openKeys;
            selectedKeys = item.selectedKeys;
          }else{
            openKeys = appWithProps.openKeys;
            selectedKeys = appWithProps.selectedKeys;
          }
          newUrl.searchParams.set('oKey',openKeys.join('-'));
          newUrl.searchParams.set('sKey',selectedKeys.join('-'));
        return taskList;
      });


      setActiveTaskAppId(activeTaskAppId =>{
        const activeId = activeTaskAppId === id && !firstTime ? null : id;

        if(!activeId){
          newUrl.searchParams.delete('appid');
          newUrl.searchParams.delete('oKey');
          newUrl.searchParams.delete('sKey');
        }else{
          newUrl.searchParams.set('appid',String(id));
        }
        window.sessionStorage.setItem("activeAppId", String(activeId));
        history.pushState(null,'',newUrl.href);

        return activeId;
      });
    },
    [setTaskAppList,setActiveTaskAppId, appsMap]
  );

  useEffect(() => {
    // searchQueryActiveTaskAppId 有最高优先级，如果有值，尝试appsMap中是否有对应的app，如果有，添加到taskAppList中，并设置sessionStorage
    const urlParam = new URL(location.href);
    const searchQueryActiveTaskAppId = urlParam.searchParams.get('appid');
    let searchQueryOpenKeys = urlParam.searchParams.get('oKey');
    let searchQuerySelectedKeys = urlParam.searchParams.get('sKey');


    if(Object.keys(appsMap).length && searchQueryActiveTaskAppId){
      if(appsMap[Number(searchQueryActiveTaskAppId)]){
        setActiveTaskApp(
          Number(searchQueryActiveTaskAppId),
          searchQueryOpenKeys? searchQueryOpenKeys.split('-') : [],
          searchQuerySelectedKeys? searchQuerySelectedKeys.split('-') : [],
          true
        )
      }
    }
  },[appsMap,setActiveTaskApp])

  const updateTaskApp = useCallback(
    (props:any) => {
      const { id, url, code, ...rest } = props;
      const newTaskAppList = taskAppList.map((app) =>
        app.id === id
          ? {
              ...app,
              activeUrl: urlHash(analysisActiveUrl(code, url)),
              ...rest,
            }
          : app
      );
      setTaskAppList(newTaskAppList);

      const newUrl = new URL(location.href);
      newUrl.searchParams.set('oKey',rest.openKeys.join('-'));
      newUrl.searchParams.set('sKey',rest.selectedKeys.join('-'));
      history.pushState(null,'',newUrl.href);

      window.sessionStorage.setItem(
        "sessionTaskAppList",
        JSON.stringify(newTaskAppList)
      );

    },
    [taskAppList]
  );

  const deleteTaskApp = useCallback(
    (id: number) => {
      const newTaskAppList = taskAppList.filter((app) => app.id !== id);
      setTaskAppList(newTaskAppList);

      const activeId = activeTaskAppId === id ? null : id;

      setActiveTaskAppId(activeId);

      const newUrl = new URL(location.href);

      newUrl.searchParams.delete('appid');
      newUrl.searchParams.delete('oKey');
      newUrl.searchParams.delete('sKey');

      history.pushState(null,'',newUrl.href);
      window.sessionStorage.setItem("activeAppId", String(activeId));
      window.sessionStorage.setItem(
        "sessionTaskAppList",
        JSON.stringify(newTaskAppList)
      );
    },
    [taskAppList, activeTaskAppId]
  );

  return [
    activeTaskAppId,
    taskAppList,
    setActiveTaskApp,
    updateTaskApp,
    deleteTaskApp,
  ];
};

export {
  useSetBackgroundImage,
  useWindowResize,
  useAppIconSize,
  useActiveTaskApp,
};
