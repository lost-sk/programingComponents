
import type { DndUpdater } from './manager';

export interface DragMonitor {
    isDragging: boolean
}

const useDragMonitor = (updater: DndUpdater) => {
    const { isDragging } = updater.transfer();
    return {
        isDragging
    }
}

export interface DropMonitor {
    canDrop: boolean
    item?:any
}

const useDropMonitor = (updater: DndUpdater): DropMonitor => {
    const { isOver } = updater.transfer();
    const drop = updater.getDropActive();
    const drag = updater.getDragActive();
    const canDrop = Boolean(isOver && drop.type && drag.type && drag.type === drag.type);
    const dragObject = updater.findDndState(drag.id);
    const monitor = {
        canDrop
    }
    if(dragObject?.options?.item) Object.assign(monitor,{
        item:dragObject.options.item
    })
    return monitor;
}


export {
    useDragMonitor,
    useDropMonitor
}

