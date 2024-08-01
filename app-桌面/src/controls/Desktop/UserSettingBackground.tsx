import React, { memo, useState } from "react";
import { Upload, Button, Icon, message } from "antd";
import { backgroundImages, APP_ID } from "./config";

import S from "./userSetting.module.scss";
import { getToken } from "./util";

import type { UpdateDesktopFields } from "./Desktop";

interface UserSettingBackgroundProps {
  updateDesktopFields: UpdateDesktopFields;
  setBackgroundImageSrc: (username: string, src: string) => void;
  userInfo: UserInfo;
}

const UserSettingBackground: React.FC<UserSettingBackgroundProps> = (props) => {
  const { updateDesktopFields, setBackgroundImageSrc, userInfo } = props;

  const [selected, setSelected] = useState("");
  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      const background = info.file.response.fullPath;
      updateDesktopFields({ background })!.then(() => {
        setBackgroundImageSrc(userInfo.staffCode, background);
      });
    }
  };

  const select = (key: string) => {
    setSelected(key);
    updateDesktopFields({ background: key });
    setBackgroundImageSrc(userInfo.staffCode, key);
  };
  return (
    <div className={S.userSettingBackgroundWrapper}>
      <div className={S.userSettingBackgroundList}>
        {backgroundImages.map((item) => (
          <div
            key={item}
            className={S.userSettingBackgroundItem}
            onClick={() => select(item)}
            style={{
              border: `solid ${selected == item ? 2 : 0}px #66ccff`,
              backgroundImage: `url(${item})`,
            }}
          ></div>
        ))}
      </div>

      <div className={S.uploadBtnWrapper}>
        <Upload
          name="file"
          action="/api/app/manager/uploadResource"
          data={{
            appId: APP_ID,
            path: "/assets/image/ui",
          }}
          showUploadList={false}
          headers={{
            Authorization: `Bearer ${getToken()}`,
          }}
          onChange={handleChange}
        >
          <Button>
            <Icon type="upload" />
            上传自定义背景
          </Button>
        </Upload>
      </div>
    </div>
  );
};

export default memo(UserSettingBackground);
