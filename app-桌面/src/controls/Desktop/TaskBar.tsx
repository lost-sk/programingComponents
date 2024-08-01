import React, { memo, useRef, useState, useEffect } from 'react';
import { Tooltip, Divider } from 'antd';
import screenFull from './screenfull';
import S from './taskBar.module.scss';
import S1 from './style.module.scss';
import fullScreenSrc from './images/fullscreen.png';
import closeIcon from './images/close-icon.svg';

import type { TaskBarProps, TaskAppProps } from './interface';

const TaskApp: React.FC<TaskAppProps> = (props) => {
  const { app, activeTaskAppId, setActiveTaskApp, closeOpenApp, customProps } =
    props;

  //ht canvas stop propagation, must bind event listener on origin HTMLElement;

  const needContextMenuRef = useRef<HTMLDivElement>(null);

  const [isShowDeleteIcon, setShowDeleteIcon] = useState<boolean>(false);

  useEffect(() => {
    if (!needContextMenuRef.current) return () => {};
    const handle = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setShowDeleteIcon(true);
    };
    const handleOut = () => setShowDeleteIcon(false);

    if (!customProps.current?.isIconWithRightClickInteractive) {
      needContextMenuRef.current?.addEventListener('mouseenter', handle);
    } else {
      needContextMenuRef.current?.addEventListener('contextmenu', handle);
    }

    needContextMenuRef.current.addEventListener('mouseleave', handleOut);

    return () => {
      if (!customProps.current?.isIconWithRightClickInteractive) {
        needContextMenuRef.current?.removeEventListener('mouseenter', handle);
      } else {
        needContextMenuRef.current?.removeEventListener('contextmenu', handle);
      }
    };
  }, [customProps]);

  return (
    <div key={app.id} className={S.taskBarAppItem} ref={needContextMenuRef}>
      <Tooltip placement="top" title={app.displayName}>
        <img
          onClick={() => setActiveTaskApp(app.id)}
          src={app.icon}
          draggable={false}
          className={S.taskBarAppItemIcon}
        />
      </Tooltip>
      {isShowDeleteIcon ? (
        <div
          className={`${S1.closeImg} ${S1.taskBarCloseImg}`}
          onClick={() => closeOpenApp(app.id)}
        >
          <img src={closeIcon} />
        </div>
      ) : null}
      <div
        className={`${S.taskActiveBorder} ${
          activeTaskAppId == app.id ? S.active : ''
        }`}
      />
    </div>
  );
};

const TaskBar: React.FC<TaskBarProps> = (props) => {
  const {
    taskAppList,
    activeTaskAppId,
    setActiveTaskApp,
    closeOpenApp,
    customProps,
  } = props;

  const [visible, setVisible] = useState(false);
  const isChoose = useRef<boolean>(false);
  const timer = useRef<number>();

  const enterBand = () => {
    setVisible(true);
    clearTimeout(timer.current);
  };
  const leaveBand = () => {
    timer.current = window.setTimeout(() => {
      if (!isChoose.current) setVisible(false);
    }, 1200);
  };
  const enterBar = () => {
    isChoose.current = true;
  };
  const leaveBar = () => {
    isChoose.current = false;
    leaveBand();
  };

  const toggleFullScreen = () => {
    if ((screenFull as any).isEnabled) {
      (screenFull as any).toggle(document.documentElement);
    }
    setTimeout(() => {
      const e = new Event('resize');
      window.dispatchEvent(e);
    }, 300);
  };

  const autoHideTask = customProps.current?.autoHideTask;

  return (
    <>
      {/* <div
        className={S.taskBar}
        // onClick={e => hiddenShowApp(e)}
      > */}
      <div
        className={`${S.taskBar} ${S.taskBarContent} ${
          autoHideTask ? S.autoHide : ''
        } ${visible ? S.visible : ''}`}
        onMouseEnter={autoHideTask ? enterBar : () => {}}
        onMouseLeave={autoHideTask ? leaveBar : () => {}}
      >
        <div className={S.filterBg}></div>
        <div className={S.contentLeft}>
          <Tooltip placement="top" title="全屏">
            <img
              src={fullScreenSrc}
              draggable="false"
              className={S.taskBarAppItemIcon}
              onClick={toggleFullScreen}
            />
          </Tooltip>
          <Divider type="vertical" className={S.taskBarDivider} />
        </div>
        <div className={S.taskBarRight}>
          {taskAppList.map((app) => (
            <TaskApp
              app={app}
              key={app.id}
              activeTaskAppId={activeTaskAppId}
              setActiveTaskApp={setActiveTaskApp}
              closeOpenApp={closeOpenApp}
              customProps={customProps}
            />
          ))}
        </div>
      </div>
      {/* </div> */}
      <div
        className={S.taskBarHoverArea}
        style={{ display: visible ? 'none' : 'block' }}
        onMouseEnter={autoHideTask ? enterBand : () => {}}
        onMouseLeave={autoHideTask ? leaveBand : () => {}}
      />
    </>
  );
};
export default memo(TaskBar);
