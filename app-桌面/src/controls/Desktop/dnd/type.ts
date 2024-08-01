
export interface DndStore {
    manager: any
}


export interface DndManager {
    new(): ManagerClass
}


export interface DragCollectionByType {
    count?: number
    ref?: HTMLElement
    startEvent?: MouseEvent
    currentEvent?: MouseEvent,
    isDragging?: Boolean,
    monitor?: Monitor
}

export interface Monitor {
    dx: number,
    dy: number
}

export interface outMonitor {
    item: any
}

// export interface DndOptions extends DragOptions{
//     hooksId:string
//     originRef?:HTMLElement
//     refView?:HTMLElement,
//     dndRef?:HTMLElement,
//     item?:any
//     outMonitor?:outMonitor
// }
export interface DragOptions {
    type: any
    boundary?: { current: any }
    item?: any
}
export interface DropOptions {
    type: any
    item?: any,
    monitor?: {
        endDrop?: (source: any) => void
    }
}


export interface ManagerClass {
    // connect:(options:DndOptions)=> DndOptions
    dndNodeMap: Map<HTMLElement, any>
    dndHooksIdMap: Map<string, any>
}
