import React, { useState } from 'react';
import { Switch } from 'antd';

export default function P(props) {
    const checked = _.get(props, 'editComponent.props.data._attrObject.showWeather')
    const [isOpen, setIsOpen] = useState(checked ? true : false);
    function useSelect(checked) {
        setIsOpen(checked);
        props.editComponent.props.data._attrObject.showWeather = checked;
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
            <div style={{ flex: 1 }}>是否显示天气</div>
            <Switch size='small' onChange={useSelect} checked={isOpen} />
            <div>状态:{isOpen ? '开启' : '关闭'}</div>
        </div>
    );
}