import React, { memo, Fragment } from 'react';
import { Upload, message } from 'antd';

import S from './userSetting.module.scss';

import { iconSizeConfig, APP_ICON_SIZE } from './config';
import type { IconSizeConfig } from './config';

import type {
    UpdateDesktopFields
} from './Desktop';

interface UserSettingIconSizeProps {
    appIconSize: APP_ICON_SIZE
    setAppIconSize: (size: APP_ICON_SIZE) => void
    updateDesktopFields: UpdateDesktopFields
}

const UserSettingIconSize: React.FC<UserSettingIconSizeProps> = (props) => {
    const {
        appIconSize,
        setAppIconSize,
        updateDesktopFields
    } = props;

    const handleSizeChange = (item: IconSizeConfig) => {
        updateDesktopFields({ iconSize: item.type });
        setAppIconSize(item.type);
    }
    return (
        <div className={S.iconSizeContainer}>
            {iconSizeConfig.map(item => (
                <div
                    className={S.iconWrapper}
                    key={item.type}
                    onClick={() => handleSizeChange(item)}
                >
                    <div className={S.iconSizeItem}>
                        <i className={`${S.iconPic} ${S[item.style]}`}></i>
                    </div>
                    <div className={S.iconRadio}>
                        {item.text} <span className={`${S.iconSpanRadio} ${appIconSize === item.type ? S.active : ''}`} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default memo(UserSettingIconSize);