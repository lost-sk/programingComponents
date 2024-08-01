
import { useContext, useState } from 'react';
import type { DragOptions, DropOptions } from './type';
import Context from './context';


export interface DndUpdater {
    id: string
    findDndState: (id: string) => any
    dispatch: () => void
    getDragActive: () => any
    getDropActive: () => any
    getOptions: () => any
    transfer: (data?: Object) => any
    setDropActive: (ref:HTMLElement) => void
    setDragActive: () => void
    cancelDropActive: () => void
    cancelDragActive: () => void
}

export interface ManagerInterface {
    setDropActive: (id: string, ref: HTMLElement) => void
    setDragActive: (id: string) => void
    cancelDropActive: () => void
    cancelDragActive: () => void
    dropActive: Array<{ id?: string, type?: string, target?: any }>
    dragActive: { id?: string, type?: string, target?: any }
    connect: (state: DropState) => DndUpdater;
}

export class Manager implements ManagerInterface {
    dropActive: Array<{ id?: string, type?: string, target?: any, ref: HTMLElement }>
    dragActive: { id?: string, type?: string, target?: any }

    dndStatMap: {
        [id: string]: any
    }
    constructor() {
        this.dropActive = [];
        this.dragActive = {};
        this.dndStatMap = {};
    }

    setDropActive = (id: string, ref: HTMLElement) => {
        const {
            options
        } = this.dndStatMap[id];
        this.dropActive.push({
            id,
            type: options.type,
            ref
        })
    }
    cancelDropActive = () => {
        this.dropActive.pop();
    }

    setDragActive = (id: string) => {
        const {
            options
        } = this.dndStatMap[id];

        const target = this.dropActive[this.dropActive.length - 1];

        this.dragActive = {
            id,
            type: options.type,
            target: target ? this.dndStatMap[target.id!].options.item : {}
        }
    }

    cancelDragActive = () => {
        const { id: sourceId } = this.dragActive;

        this.dragActive = {};
        let isFirstDropEffect = true;
        while (this.dropActive.length) {
            const { id: targetId, ref } = this.dropActive.pop()!;
            const target = this.dndStatMap[targetId!];
            const source = this.dndStatMap[sourceId!];
            if (isFirstDropEffect && target.options.monitor) {
                setTimeout(() => target.options.monitor.endDrop(
                    source.options.item,
                    { ...target?.options?.item, ref }
                ), 0);
                isFirstDropEffect = false;
            }
            target.dndUpdater.dispatch();
        }
    }

    connect(state: DropState) {
        const {
            handleId,
            dispatch,
            options,
            count
        } = state;
        if (this.dndStatMap[handleId]) {
            Object.assign(this.dndStatMap[handleId], {
                count,
                options
            })
            return this.dndStatMap[handleId].dndUpdater;
        }

        const transfer = {};

        const dnd = this.dndStatMap[handleId] = {
            count,
            options,
            dndUpdater: {
                id: handleId,
                findDndState: (id: string) => this.dndStatMap[id],
                dispatch: () => dispatch(v => v + 1),
                getDragActive: () => this.dragActive,
                getDropActive: () => this.dropActive.length ? this.dropActive[this.dropActive.length - 1] : {},
                getOptions: () => options,
                setDropActive: (ref: HTMLElement) => this.setDropActive(handleId, ref),
                setDragActive: () => this.setDragActive(handleId),
                cancelDropActive: () => this.cancelDropActive(),
                cancelDragActive: () => this.cancelDragActive(),
                transfer: (data?: Object) => data ? Object.assign(transfer, data) : transfer
            }
        }
        return dnd.dndUpdater;
    }
}


export const useDndManager = () => {
    return useContext(Context);
}

export interface DragState {
    options: any
    count: number
    dispatch: React.Dispatch<React.SetStateAction<number>>
    handleId: string
}

export const useDragUpdater = (options: DragOptions): DragState => {
    const [count, dispatch] = useState(0);

    const [handleId] = useState(Math.random().toString(36).substring(2, 10));
    const state = {
        options,
        count,
        dispatch,
        handleId
    };
    return state;
}

export interface DropState {
    options: any
    count: number
    dispatch: React.Dispatch<React.SetStateAction<number>>
    handleId: string
}

export const useDropUpdater = (options: DropOptions): DropState => {
    const [count, dispatch] = useState(0);
    const [handleId] = useState(Math.random().toString(36).substring(2, 10));
    const state = {
        options,
        count,
        dispatch,
        handleId
    };

    return state;
}