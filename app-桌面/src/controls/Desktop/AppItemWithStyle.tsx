import React, { useMemo, useState, useRef, useEffect } from 'react';

interface AppItemWithStyleProps {
    index: number
    sortPos: [number, number]
    padding?: number
    count?: number
}

const AppItemWithStyle: React.FC<AppItemWithStyleProps> = (props) => {
    const {
        children,
        index,
        sortPos,
        count = 3,
        padding = 0
    } = props;
    const [innerPos, setInnerPos] = useState(sortPos);

    const [s1, s2] = innerPos;

    useEffect(() => {
        setInnerPos(sortPos);
    }, [sortPos]);

    let style = {} as React.CSSProperties;
    if (s1 === s2) {
        const row = index / count | 0;
        const col = index % count;
        // const duration = Math.log2(index - delIndex + 1) * 0.2;
        const left = col * 102 + padding + 'px';
        const top = row * 144 + padding + 'px';
        // const transition = `left 0.2s ease-in-out ${duration}s, top 0.2s ease-in-out ${duration}s`;
        const transition = 'left 0.2s ease-in-out,top 0.2s ease-in-out,visibility 0.2s ease-in-out';
        const position = 'absolute';
        style = { position, left, top, transition }
    } else if (s1 !== s2) {
        const trueIndex = index === s1 ? s2 : index === s2 ? s1 : index;
        const row = trueIndex / count | 0;
        const col = trueIndex % count;
        const left = col * 102 + padding + 'px';
        const top = row * 144 + padding + 'px';
        const transition = 'left 0.2s ease-in-out,top 0.2s ease-in-out,visibility 0.2s ease-in-out';
        const position = 'absolute';
        style = { position, left, top, transition }
    }

    useEffect(() => {
        if (s1 !== 0 || s2 !== 0) {
            setInnerPos([0, 0])
        }
    })
    return React.cloneElement(children as React.ReactElement, { style })
}

export default AppItemWithStyle;