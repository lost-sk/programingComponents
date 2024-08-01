import React, {

} from 'react';
import { DndProvider } from './dnd';
import Desktop from './Desktop';
import { version } from './config';

interface IndexProps {
    outerProps: any
}

console.table({
    "name": "DesktopApp",
    "version": version
})

const Index: React.FC<IndexProps> = (outerProps) => {
    return (
        <DndProvider>
            <Desktop
                outerProps={outerProps}
            />
        </DndProvider>
    )
}
export default Index;