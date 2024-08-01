import React from 'react';
import ComponentBase from './ComponentBase';

import {
    BLOCK_TYPE,
} from '../config';


interface ComponentWithSchemaProps {
    schema: any
    id?: string
    children: React.ReactElement
}
const ComponentWithSchema: React.FC<ComponentWithSchemaProps> = (props) => {
    const {
        schema,
        id = 'sof',
        children
    } = props;
    if (schema.type === BLOCK_TYPE.CONTAINER) {
        const uid = `${id}:eof`;
        return <ComponentBase key={uid} id={uid} schema={schema}>
            <children.type schema={schema} id={uid} {...children.props}></children.type>
        </ComponentBase >
    }

    if (schema.type === BLOCK_TYPE.LAYOUT) return (
        <ComponentBase key={`${id}:eof`} id={`${id}:eof`} schema={schema}>
            {schema.children.map((schema: any, index: number) =>
                <ComponentWithSchema  {...{
                    ...props,
                    schema,
                    id: `${id}:b${index}`,
                    key: `${id}:b${index}`
                }} />
            )}
        </ComponentBase>
    )
    return null;
}

export default ComponentWithSchema;