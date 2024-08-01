import React, { memo, Fragment } from 'react';
import { Upload, message } from 'antd';

import S from './userSetting.module.scss';

import { getToken } from './util';

import { fetchUpdateAvatar } from './service';

interface UserSettingInfo {
    userInfo: UserInfo
    setUserInfo: (userInfo: UserInfo) => void
}

const UserSettingInfo: React.FC<UserSettingInfo> = ({
    userInfo,
    setUserInfo
}) => {
    userInfo = userInfo as unknown as UserInfo;

    const handleChange = (info: any) => {
        if (info.file.status === 'done') {
            const { fileDownloadUrl: url } = info.file.response;
            fetchUpdateAvatar({
                uploadUrl: url
            }).then(res => {
                if (res.data) {
                    setUserInfo({
                        ...userInfo,
                        uploadUrl: url
                    } as UserInfo)
                }
            })

        }
    }
    const beforeUpload = (file: any) => {
        const isJpgOrPngOrGif = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/webp';
        if (!isJpgOrPngOrGif) {
            message.error('图片格式只能为 JPG/PNG/GIF/WEBP 类型!');
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('请上传小于5M的JPG、GIF、PNG 或 WEBP 文件!');
        }
        return isJpgOrPngOrGif && isLt5M;
    }

    const props = {
        name: 'file',
        action: '/api/image/upload/uploadImage',
        listType: 'picture-card' as never,
        accept: '.jpg,.png,.gif,.webp',
        showUploadList: false,
        headers: {
            "Authorization": `Bearer ${getToken()}`
        },
        beforeUpload,
        onChange: handleChange
    };

    return (
        <Fragment>
            <div className={S.userInfo}>
                <Upload
                    {...props}
                >
                    <img
                        src={userInfo.uploadUrl}
                        className={S.userAvatar}
                    />
                </Upload>

                <div className={S.userInfoContainer}>
                    <div className={S.userInfoNameItem}>{userInfo.staffName}</div>
                    <div className={S.userTypeItem}>手机</div>
                    <div className={S.userInfoItem}>{userInfo.phone}</div>
                    <div className={S.userTypeItem}>Email</div>
                    <div className={S.userInfoItem}></div>
                    <div className={S.userTypeItem}>时区</div>
                    <div className={S.userInfoItem}>{userInfo.timeZone}</div>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(UserSettingInfo);
