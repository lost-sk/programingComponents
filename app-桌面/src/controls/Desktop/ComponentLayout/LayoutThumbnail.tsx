import React, { memo, useState, useRef, useEffect } from 'react';
import ComponentThumbnailHydrate from './ComponentThumbnailHydrate';
import ComponentWithSchema from './ComponentWithSchema';
import S from './layoutThumbnail.module.scss';
import DesignBoard from './DesignBoard';


interface LayoutThumbnailProps {
    setLayout: (layout: any) => void
    layout: any
    backgroundImageSrc: string
    item: any
}

const LayoutThumbnail: React.FC<LayoutThumbnailProps> = props => {
    const {
        item,
        setLayout,
        layout,
        backgroundImageSrc,
    } = props;

    // const getLayoutData = useCallback(
    //     (layoutId) => {
    //         return _.get(layoutData, [activePlanType, layoutId]);
    //     },
    //     [activePlanType, layoutData]
    // );

    return (

        <div
            className={S.layoutPlanListItem}
            onClick={(e) => setLayout(item.id)}
        >
            <div className={S.designBoardThumbnailWrapper}>
                <div
                    className={S.designBoardThumbnail}
                >
                    <DesignBoard
                        backgroundImageSrc={backgroundImageSrc}
                    >
                        <ComponentWithSchema schema={item.schema}>
                            <ComponentThumbnailHydrate />
                        </ComponentWithSchema>
                    </DesignBoard>
                </div>
            </div>
            <div className={`${S.layoutInfo} ${S.iconSizeContainer}`}>
                <div className={S.iconRadio}>
                    {item.name}{" "}
                    <span
                        className={`${S.iconSpanRadio} ${item.id === layout ? S.active : ""}`}
                    />
                </div>
            </div>
        </div>
    )

}


export default memo(LayoutThumbnail);