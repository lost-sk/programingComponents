import React, { memo, useState, useLayoutEffect, useEffect } from 'react';

import S from './planList.module.scss';

interface PlanListProps {
    plan: any
    setPlan: (plan: any) => void
    clearLayout: () => void
}

import {
    planById,
    plansMap
} from '../config';

const PlanList: React.FC<PlanListProps> = props => {
    const {
        plan,
        setPlan,
        clearLayout
    } = props;

    return (
        <div className={S.designPlan}>
            {planById
                .map((id) => (plansMap as any)[id])
                .map((item) => (
                    <div
                        key={item.id}
                        className={`${S.planItemButton} ${plan === item.id ? S.active : ""}`}
                        onClick={() => setPlan(item.id)}
                    >
                        {item.text}
                    </div>
                ))}
            <div className={S.planItemButton} onClick={clearLayout}>
                清屏
            </div>
        </div>
    );
}

export default memo(PlanList);