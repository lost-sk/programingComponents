import React, { memo, Fragment } from 'react';
import { Upload, message } from 'antd';

import S from './userSetting.module.scss';

import DesignBoard from './ComponentLayout/DesignBoard';
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
        <div className={S.appListLayoutContainer}>
          fwefwe
        </div>
    )
}

export default memo(UserSettingIconSize);
