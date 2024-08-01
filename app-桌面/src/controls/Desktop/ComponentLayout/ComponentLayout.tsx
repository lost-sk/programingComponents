import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { message } from "antd";
import S from "./componentLayout.module.scss";
import LayoutThumbnail from "./LayoutThumbnail";
import PlanList from "./PlanList";
import DesignBoard from "./DesignBoard";
import ComponentGallery from "./ComponentGallery";
import ComponentWithSchema from "./ComponentWithSchema";
import ComponentDesignHydrate from "./ComponentDesignHydrate";

import { layoutById, planById, layoutDescMap } from "../config";

import type { ComponentLayoutProps } from "../interface";

const ComponentLayout: React.FC<ComponentLayoutProps> = (props) => {
  const {
    scaleX,
    layoutData: providerLayoutData,
    userComponentsMap,
    currentPlan,
    backgroundImageSrc,
    setLayoutData: setProviderLayoutData,
    userComponentsId,
    clearModalType,
    updateDesktopFields,
    setCurrentPlan,
    multipleConfig,
    userInfo,
    customProps,
  } = props;

  const [plan, setPlan] = useState<typeof planById[number]>(planById[0]);
  const [layout, setLayout] = useState<typeof layoutById[number]>(
    layoutById[0]
  );
  const [layoutData, setLayoutData] = useState(providerLayoutData);
  const [layoutConfigMode, setLayoutConfigMode] = useState("own");
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setLayoutData(providerLayoutData);
  }, [providerLayoutData]);

  useLayoutEffect(() => {
    if (currentPlan && currentPlan.length) {
      setPlan(currentPlan[0]);
      setLayout(currentPlan[1]);
    }
  }, [currentPlan]);

  const clearLayout = () => {
    setLayoutData((layoutData: any) => {
      layoutData[plan][layout] = {};
      return { ...layoutData };
    });
  };

  const handleCancel = clearModalType;

  const handleOk = async () => {
    const updateConfig = () => {
      multipleConfig.current![layoutConfigMode] = {
        ...multipleConfig.current![layoutConfigMode],
        layoutData,
        currentPlan: [plan, layout],
      };
    };

    if (layoutConfigMode === "DESK_DEPARTMENT") {
      const res = await Promise.all(
        userInfo.departments.map((department) =>
          updateDesktopFields({
            layoutData,
            currentPlan: [plan, layout],
            username: department.code,
          })
        )
      );
      if (res.every((item) => item.code == 200)) {
        message.success("部门配置成功");
        updateConfig();
      }
    } else if (layoutConfigMode === "DESK_COMPANY") {
      const res = await updateDesktopFields({
        layoutData,
        currentPlan: [plan, layout],
        username: "COMPANY",
      });
      if (res.code == 200) {
        message.success("全厂设置成功");
        updateConfig();
      }
    } else {
      await updateDesktopFields({
        layoutData,
        currentPlan: [plan, layout],
      });
      setProviderLayoutData(layoutData);
      setCurrentPlan([plan, layout]);
      handleCancel();
    }
  };

  const handleModeChange = (key: string) => {
    const { currentPlan, layoutData } = multipleConfig.current![key];
    setLayoutConfigMode(key);
    setLayout(currentPlan[1]);
    setPlan(currentPlan[0]);
    setLayoutData(_.cloneDeep(layoutData));
  };

  useEffect(() => {
    const handle = (e: MouseEvent) => e.stopPropagation();
    scrollRef.current?.addEventListener("wheel", handle);
    return () => scrollRef.current?.removeEventListener("wheel", handle);
  }, [scrollRef]);

  const { schema } = layoutDescMap[layout];
  return (
    <div
      className={`${S.layoutModalWrapper} ${
        layoutConfigMode !== "own" ? S.active : ""
      }`}
      ref={scrollRef}
    >
      <div
        className={S.layoutModalScale}
        style={{
          transform: `scale(${scaleX})`,
        }}
      >
        <div className={S.layoutModalContainer}>
          <header className={S.layoutModalHeader}>
            <h3 className={S.headerTitle}>布局</h3>
            {layoutConfigMode === "own" ? (
              Object.keys(multipleConfig.current!).map((key) => {
                if (key === "DESK_DEPARTMENT")
                  return (
                    <div
                      className={S.deskAdminMode}
                      onClick={() => handleModeChange("DESK_DEPARTMENT")}
                    >
                      部门管理员配置
                    </div>
                  );
                if (key === "DESK_COMPANY")
                  return (
                    <div
                      className={S.deskAdminMode}
                      onClick={() => handleModeChange("DESK_COMPANY")}
                    >
                      全厂管理员配置
                    </div>
                  );

                return null;
              })
            ) : (
              <div
                className={`${S.deskAdminMode} ${S.active}`}
                onClick={() => handleModeChange("own")}
              >
                返回个人配置
              </div>
            )}
          </header>
          <div className={S.layoutStage}>
            <div className={`${S.layoutPlanList} ${S.left}`}>
              {layoutById
                .slice(0, 3)
                .map((id) => layoutDescMap[id])
                .map((item) => (
                  <LayoutThumbnail
                    key={item.id}
                    {...{
                      item,
                      backgroundImageSrc,
                      setLayout,
                      layout,
                    }}
                  />
                ))}
            </div>
            <div className={S.centerLayout}>
              <div className={S.centerLayoutContainer}>
                <DesignBoard backgroundImageSrc={backgroundImageSrc}>
                  <ComponentWithSchema schema={schema}>
                    <ComponentDesignHydrate
                      userComponentsMap={userComponentsMap}
                      layoutData={layoutData[plan][layout]}
                      setLayoutData={setLayoutData}
                      plan={plan}
                      layout={layout}
                      customProps={customProps}
                    />
                  </ComponentWithSchema>
                </DesignBoard>
              </div>
              <PlanList
                {...{
                  plan,
                  setPlan,
                  clearLayout,
                }}
              />
            </div>
            <div className={`${S.layoutPlanList} ${S.right}`}>
              {layoutById
                .slice(3, Infinity)
                .map((id) => layoutDescMap[id])
                .map((item) => (
                  <LayoutThumbnail
                    key={item.id}
                    {...{
                      item,
                      backgroundImageSrc,
                      setLayout,
                      layout,
                    }}
                  />
                ))}
            </div>
          </div>

          <ComponentGallery
            {...{
              userComponentsMap,
              userComponentsId,
            }}
          />

          <div className={S.buttonGroup}>
            <button
              type="button"
              className={`${S.buttonItem} ${S.confirm}`}
              onClick={handleOk}
            >
              确认
            </button>
            <button
              type="button"
              className={`${S.buttonItem} ${S.cancel}`}
              onClick={handleCancel}
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentLayout;
