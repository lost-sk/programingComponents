import { useDndManager, useDragUpdater } from './manager';
import { useDragMonitor } from './monitor';

import {
    useDragHandle,
    useDragViewHandle,
} from './dragHandle'

import type {
    DragOptions
} from './type';



interface UseDrag{
    (options:DragOptions):[
        any,
        (ref:HTMLElement | null)=>void,
        (ref:HTMLElement | null)=>void
    ]
}

const useDrag:UseDrag = (options) => {
    const { manager } = useDndManager();
    const state = useDragUpdater(options);
    const updater = manager.connect(state);

    return [
        useDragMonitor(updater),
        useDragHandle(updater),
        useDragViewHandle(updater)
    ];
}

export default useDrag;