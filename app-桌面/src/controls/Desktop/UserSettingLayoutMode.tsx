import React, { memo, Fragment } from "react";
import { Upload, message } from "antd";

import S from "./userSetting.module.scss";

import type { UpdateDesktopFields } from "./Desktop";

interface UserSettingIconSizeProps {
  layoutMode: number;
  updateDesktopFields: UpdateDesktopFields;
  layoutModeChange: (mode: number) => void;
}

const LayoutModeSelect:React.FC<UserSettingIconSizeProps> = ({
  layoutMode,
  updateDesktopFields,
  layoutModeChange,
}) => {
  const options = [
    {
      value: 0,
      title: "个人配置",
    },
    {
      value: 1,
      title: "部门配置",
    },
    {
      value: 2,
      title: "公司配置",
    },
  ];

  const list = options.map((item) => (
    <div
      className={`${S.iconWrapper} ${S.iconWrapperLarge}`}
      key={item.value}
      onClick={() => {
        updateDesktopFields({ layoutMode: item.value });
        layoutModeChange(item.value);
      }}
    >
      <div className={S.iconRadio}>
        {item.title} &nbsp;&nbsp;
        <span
          className={`${S.iconSpanRadio} ${
            layoutMode === item.value ? S.active : ""
          }`}
        />
      </div>
    </div>
  ));
  return <div className={S.iconSizeContainer}>{list}</div>;
};

export default memo(LayoutModeSelect);
