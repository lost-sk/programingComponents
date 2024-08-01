

import type { DndUpdater } from './manager'
import { setMoveRefStyle } from './control';

export const BIND_MOVE_EVENT = Symbol('BIND_MOVE_EVENT');

export const DND_MOVE_VIEW = Symbol('DND_MOVE_VIEW');


const bindListener = (
    ref: HTMLElement | Document,
    eventName: keyof HTMLElementEventMap,
    listener: any
) => ref.addEventListener(eventName, listener);

const removeListener = (
    ref: HTMLElement | Document,
    eventName: keyof HTMLElementEventMap,
    listener: any
) => ref.removeEventListener(eventName, listener);

const useMoveHandle = (updater: DndUpdater) => {

    return (ref: HTMLElement | null) => {

        if (ref === null) return;
        if ((ref as any).BIND_MOVE_EVENT) return;

        (ref as any).BIND_MOVE_EVENT = BIND_MOVE_EVENT;

        updater.transfer({
            ref,
        })

        const handleDragStart = (e: MouseEvent) => {

            updater.transfer({
                pageX: e.pageX,
                pageY: e.pageY,
            })

            bindListener(document, 'mousemove', handleDragMove);
            bindListener(document, 'mouseup', handleDragEnd);
        }

        const handleDragMove = (e: MouseEvent) => {
            const {
                ref,
                refView,
                ...rest
            } = updater.transfer();

            const curRef = refView || ref;

            const translate = setMoveRefStyle({
                ...rest,
                cEvent: e
            }, curRef)

            updater.transfer({ translate })
        }

        const handleDragEnd = (e: MouseEvent) => {
            const { translate } = updater.transfer();
            updater.transfer({
                lastTranslate: translate
            })
            removeListener(document, 'mousemove', handleDragMove)
            removeListener(document, 'mouseup', handleDragEnd)
        }

        bindListener(ref, 'mousedown', handleDragStart);
    }
}

const useMoveViewHandle = (updater: DndUpdater) => {

    return (ref: HTMLElement | null) => {
        if (ref === null) return;
        if ((ref as any).DND_MOVE_VIEW) return;
        (ref as any).DND_MOVE_VIEW = DND_MOVE_VIEW;

        updater.transfer({
            refView: ref
        })
    }
}
export {
    useMoveHandle,
    useMoveViewHandle
}