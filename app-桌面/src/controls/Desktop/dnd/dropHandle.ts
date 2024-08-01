

import type { DndUpdater } from './manager'


export const BIND_DRAG_EVENT = Symbol('BIND_DRAG_EVENT');



const bindListener = (
    ref: HTMLElement | Document,
    eventName: keyof HTMLElementEventMap,
    listener: any
) => ref.addEventListener(eventName, listener);


const useDropHandle = (updater: DndUpdater) => {
    
    return (ref: HTMLElement | null) => {
        if (ref === null) return;
        if ((ref as any).BIND_DRAG_EVENT) return;

        (ref as any).BIND_DRAG_EVENT = BIND_DRAG_EVENT;

        const handleEnter = (e: MouseEvent) => {
            updater.transfer({
                isOver: true
            })
            if (!updater.getDragActive().id) return;

            updater.setDropActive(ref);
            updater.dispatch();
        }

        const handleDropLeave = () => {
            updater.transfer({
                isOver: false
            })

            if (!updater.getDragActive().id) return;

            updater.cancelDropActive();
            updater.dispatch();
        }
        bindListener(ref, 'mouseenter', handleEnter);
        bindListener(ref, 'mouseleave', handleDropLeave);
    }
}

export {
    useDropHandle,
}