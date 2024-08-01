import React, { memo } from 'react';
import S from './designBoard.module.scss';

interface DesignBoardProps {
    backgroundImageSrc: string
    children:React.ReactElement
}

const DesignBoard: React.FC<DesignBoardProps> = (props) => {
    const {
        children,
        backgroundImageSrc
    } = props;
    return (
        <div
            className={S.designBoard}
            style={{ background: `url(${backgroundImageSrc})` }}
        >
            <div className={S.userCardTemplate}>
                <div className={S.avatar}></div>
                <div className={S.userInfo}>
                    <div className={S.userName}>用户姓名</div>
                    <div className={S.infoItem}>职位</div>
                    <div className={S.infoItem}>某某公司</div>
                </div>
            </div>
            <div className={S.appListTemplate}>
                {new Array(16).fill(0).map((item, index) => (
                    <div className={S.appItem} key={index}>
                        <div className={S.itemIcon} />
                        <div className={S.itemDesc}>应用名称</div>
                    </div>
                ))}
            </div>
            <div className={S.componentDesignStage}>
                {children}
            </div>
            {/* <div className='designAppBar'>
          <div className='appBarEmptyItem'></div>
          <Divider type="vertical" className='appBarDivider' />
          {new Array(6).fill(0).map(()=> <div className='appBarEmptyItem'></div>)}
        </div> */}
        </div>
    );
};


export default memo(DesignBoard)