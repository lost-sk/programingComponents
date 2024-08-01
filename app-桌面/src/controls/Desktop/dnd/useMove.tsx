import { useDndManager, useDropUpdater } from './manager';
import { useMoveHandle, useMoveViewHandle } from './moveHandle';

interface UseMove {
    (): [
        (ref: HTMLElement | null) => void,
        (ref: HTMLElement | null) => void,
    ]
}

const useMove: UseMove = () => {
    const { manager } = useDndManager();
    const state = useDropUpdater({ type: 'default' });
    const updater = manager.connect(state);
    return [
        useMoveHandle(updater),
        useMoveViewHandle(updater)
    ];
}

export default useMove;