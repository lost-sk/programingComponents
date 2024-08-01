import React, {useState} from 'react';
import {Switch} from 'antd';

export default function LegendSelect (props) {
    //图例开关
    const isLegend = _.get(props,'editComponent.props.data._attrObject.data.isLegend')
    const [isOpen, setIsOpen] = useState(isLegend ? true : false);
    function useSelect(checked) {
        setIsOpen(checked);
        props.editComponent.props.data._attrObject.data.isLegend = checked;
    }
    return (
        <div style={{
            color:'#000',
            display:'flex',
            padding:'5px 8px',
            lineHeight:'26px',
            width:'100%',
        }}>
            <div style={{width:60}}>图例开关</div>
            <div style={{flex:1}}><Switch size='small' onChange={useSelect} checked={isOpen}/></div>
            <div>状态:{isOpen ? '开启':'关闭'}</div>
        </div>
    );
}
