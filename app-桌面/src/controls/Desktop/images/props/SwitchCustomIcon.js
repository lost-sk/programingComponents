import React, { useState,useEffect } from 'react';
import { Switch } from 'antd';

export default function LegendSelect(props) {
    //图例开关
    const checked = _.get(props, 'editComponent.props.data._attrObject.useSSOAppCustomIcon')
    const [isOpen, setIsOpen] = useState(checked ? true : false);
    function useSelect(checked) {
        setIsOpen(checked);
        props.editComponent.props.data._attrObject.useSSOAppCustomIcon = checked;
    }

    return (
        <div style={{
            color: '#000',
            display: 'flex',
            padding: '5px 8px',
            lineHeight: '26px',
            width: '100%',
            alignItems:'center'
        }}>
            <div style={{ flex: 1 }}>自定义第三方App图标</div>
            <Switch size='small' onChange={useSelect} checked={isOpen} />
            <div>状态:{isOpen ? '开启' : '关闭'}</div>
        </div>
    );
}
