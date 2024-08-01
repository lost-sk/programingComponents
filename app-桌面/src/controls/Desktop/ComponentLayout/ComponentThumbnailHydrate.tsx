import React, { memo, useState, useRef, useEffect } from 'react';
import {
    ComponentItem
} from '../type';

import S from './designBoard.module.scss';


interface ComponentThumbnailHydrateProps {
    id?: string
    schema?: any
}

const ComponentThumbnailHydrate: React.FC<ComponentThumbnailHydrateProps> = (props) => {
    const {
        schema,
    } = props;
    return (
        <div
            className={S.containerBlockWithStyle}
           
        >
            <span className={S.blockSizeType}>{schema.sizeType}</span>
        </div>
    )


}

export default ComponentThumbnailHydrate;
