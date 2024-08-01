import React, { memo } from 'react';

import { useDrag, useDrop } from './dnd';

import S from './style.module.scss';

import type {
    AuthorityAppInfo
} from './type';

interface AuthorityAppItemProps {
    app: AuthorityAppInfo
    openApp: (id: number) => React.MouseEventHandler

}

const AuthorityAppItem: React.FC<AuthorityAppItemProps> = (props) => {
    const {
        app,
        openApp
    } = props;

    const [{ isDragging }, drag, dragView] = useDrag({
        type: 'USER_APP',
        item: {
            ...app
        },
    })

    return (
        <div
            className={S.authorityAppItem}
            ref={dragView}
        >
            <img
                ref={drag}
                src={app.icon}
                draggable={false}
                className={S.authorityAppImage}
                onClick={openApp(app.id)}
            />
            <div className={S.authorityAppDisplayName}>
                {app.displayName}
            </div>
        </div>
    )
}

export default memo(AuthorityAppItem);
