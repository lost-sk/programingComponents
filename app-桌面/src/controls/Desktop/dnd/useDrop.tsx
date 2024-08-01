import { useDndManager, useDropUpdater } from './manager';
import { useDropMonitor, DropMonitor } from './monitor';

import {
    useDropHandle,
} from './dropHandle'

import type {
    DropOptions
} from './type';



interface UseDrop {
    (options: DropOptions): [
        DropMonitor,
        (ref: HTMLElement | null) => void,
    ]
}

const useDrop: UseDrop = (options) => {
    const { manager } = useDndManager();
    const state = useDropUpdater(options);
    const updater = manager.connect(state);
    return [
        useDropMonitor(updater),
        useDropHandle(updater),
    ];
}

export default useDrop;