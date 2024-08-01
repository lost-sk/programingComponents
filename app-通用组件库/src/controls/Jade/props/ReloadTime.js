import React from 'react';
import {InputNumber} from "antd";

export default function ReloadTime (props) {
    const {edit} = props;
    //定时刷新
    const reloadTime = _.get(props,'editComponent.props.data._attrObject.data.reloadTime');
    edit(reloadTime ? reloadTime : 0)
    function useOnChange(val) {
        edit(val)
    }
    return (
        <div style={{
            color:'#000',
            display:'flex',
            padding:'5px 8px',
            lineHeight:'26px',
            width:'100%',
        }}>
            <div style={{width:60}}>定时刷新</div>
            <div style={{flex:1}}><InputNumber size="small" min={0} defaultValue={reloadTime ? reloadTime : 0} onChange={useOnChange}/></div>
            <div>单位:秒</div>
        </div>
    );
}
