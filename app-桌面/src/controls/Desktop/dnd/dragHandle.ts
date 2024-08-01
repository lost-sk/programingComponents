import {
    setDndRefStyle,
    createDndRef,
    cleanDndRefStyle
} from './control';

import type { DndUpdater } from './manager'

export const BIND_DND_EVENT = Symbol('BIND_DND_EVENT');
export const DND_DRAG_VIEW = Symbol('DND_DRAG_VIEW');

export interface DragTransfer {
    sEvent: MouseEvent
    isDragging: boolean,
    isPreDragging: boolean,
    dndRef: React.ReactNode
}

const dragStart = (e: MouseEvent, updater: DndUpdater) => {

    const state: DragTransfer = {
        sEvent: e,
        isPreDragging: true,
        isDragging: false,
        dndRef: null,
        // timestamp:Date.now()
    };

    const { ref, refView } = updater.transfer();

    const curRef = refView || ref;

    const dndRefData = createDndRef(curRef!);

    updater.transfer({
        ...state,
        ...dndRefData
    })

}

const dragMove = (e: MouseEvent, updater: DndUpdater) => {

    const {
        ref,
        refView,
        dndRef,
        isPreDragging,
        isDragging,
        sEvent,
        left,
        top,
        width,
        height,
        // timestamp
    } = updater.transfer();
    const { boundary } = updater.getOptions();

    if (!isPreDragging && !isDragging) return;

    const state = {
        cEvent: e,
        sEvent,
        dndRef,
        boundary,
        // timestamp,
        left,
        top,
        width,
        height
    }
    const curRef = refView || ref;

    setDndRefStyle(state, curRef);

    updater.transfer({
        isPreDragging: false,
        isDragging: true
    })

    if (!isDragging) {
        updater.setDragActive();
        updater.dispatch();
    }
}

const dragEnd = (e: MouseEvent, updater: DndUpdater): void => {

    const {
        ref,
        refView,
        dndRef,
        isPreDragging,
        isDragging,
    } = updater.transfer();

    if (!isPreDragging && !isDragging) return;

    const curRef = refView || ref;

    cleanDndRefStyle(dndRef, curRef);

    updater.transfer({
        isPreDragging: false,
        isDragging: false,
        sEvent: null,
        dndRef: null
    })
    updater.cancelDragActive();
    updater.dispatch();
}


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

const useDragHandle = (updater: DndUpdater) => {
    return (ref: HTMLElement | null) => {

        if (ref === null) return;
        if ((ref as any).BIND_DND_EVENT) return;

        (ref as any).BIND_DND_EVENT = BIND_DND_EVENT;

        updater.transfer({
            ref
        })

        const handleDragStart = (e: MouseEvent) => {

            // stop right button click
            if (e.button === 2) return;
            dragStart(e, updater);
            bindListener(document, 'mousemove', handleDragMove);
            bindListener(document, 'mouseup', handleDragEnd);
        }

        const handleDragMove = (e: MouseEvent) => {
            if (e.button === 2) return;
            dragMove(e, updater)
        }

        const handleDragEnd = (e: MouseEvent) => {

            if (e.button === 2) return;

            dragEnd(e, updater);
            removeListener(document, 'mousemove', handleDragMove)
            removeListener(document, 'mouseup', handleDragEnd)
        }

        bindListener(ref, 'mousedown', handleDragStart);
    }
}

const useDragViewHandle = (updater: DndUpdater) => {

    return (ref: HTMLElement | null) => {
        if (ref === null) return;
        if ((ref as any).DND_DRAG_VIEW) return;
        updater.transfer({
            refView: ref
        })
    }
}

export {
    useDragHandle,
    useDragViewHandle,
}