import React, { memo, useState, useLayoutEffect } from 'react';
import {
    ComponentRuntimeHydrate,
    ComponentWithSchema
} from './ComponentLayout';

import S from './componentStage.module.scss'
import {
    layoutDescMap,
    BLOCK_TYPE,
    planById,
    layoutById
} from './config'

import {
    ComponentItem
} from './type'

interface ComponentStageProps {
    currentPlan: any
    userComponentsMap: { [key: string]: ComponentItem }
    outerProps: any,
    layoutData: any
}

const ComponentStage: React.FC<ComponentStageProps> = props => {
    const {
        currentPlan,
        layoutData,
        outerProps,
        userComponentsMap
    } = props;

    const [plan = planById[0], layout = layoutById[0]] = currentPlan;

    const { schema } = (layoutDescMap as any)[layout];

    const componentData = layoutData[plan][layout];

    return (
        <div className={S.componentMainWrapper}>

            <ComponentWithSchema schema={schema}>
                <ComponentRuntimeHydrate
                    userComponentsMap={userComponentsMap}
                    componentData={componentData}
                    outerProps={outerProps}
                />
            </ComponentWithSchema>
        </div>
    );
}

export default memo(ComponentStage);