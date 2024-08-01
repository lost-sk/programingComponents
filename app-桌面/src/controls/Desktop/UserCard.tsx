import React, { memo, useState, useEffect } from 'react';
import S from './style.module.scss'

interface UserCardProps {
    userInfo: UserInfo
}

const UserCard: React.FC<UserCardProps> = props => {
    let {
        userInfo
    } = props;
    userInfo = (userInfo as unknown as  UserInfo);

    return (
        <div className={S.userInfoCard}>
            <img
                src={userInfo.uploadUrl} className={S.userCardAvatar} />
            <div className={S.cardContent}>
                <div className={`${S.cardItem} ${S.userNameItem}`}>{userInfo.staffName}</div>
                <div className={`${S.cardItem} ${S.userTypeItem}`}>ID: {userInfo.staffCode}</div>
                <div className={`${S.cardItem} ${S.userCopItem}`}>{_.get(userInfo, ['companies', '0', 'name'])}</div>
            </div>
        </div>
    )
}

export default memo(UserCard);