

import { Button,Spin } from 'antd';
import React,{useCallback, useState,Suspense,lazy, useEffect} from 'react';

const TOKEN = localStorage.getItem('ticket')


let fc = (token) =>(method,url,options)=> fetch(url, {
    ...{
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept-Language': 'zh-cn'
      }
    },
    ...options ? { body: JSON.stringify(options) } : {}
  }
  ).then(res => res.text())
fc = fc(TOKEN)

const osLoad = fc('GET','/resource/App_264610095947b7fa572df452f1c87c11/libs/ObjectSelect.js')

export default function DataSelect (props){
  const {edit} = props;
  const dataSelect = _.get(props,'editComponent.props.data._attrObject.data.dataSelect',{})
  const [visible,setVisible] = useState(false);
  const [ObjectSelect,setObjectSelect] = useState(null);
  const handleCancel = useCallback(()=>{
    setVisible(false);
  },[setVisible])
  const handleOk = useCallback((objects)=>{
     edit(objects);
     setVisible(false)
  },[
    edit,
    setVisible
  ])
  useEffect(()=>{
    osLoad.then((strFn)=>{
       const module = {}
        new Function('module',strFn)(module);
        const {ObjectSelectorModal} = module.exports;
        setObjectSelect(()=>ObjectSelectorModal);
    })
  },[
    setObjectSelect
  ])

  return  <div style={{
      width:'100%',
      display: 'flex',
      padding: '5px 8px',
      lineHeight: '26px',
      color: '#000'
    }}>
      <div style={{width:60}}>数据源</div>
      <div style={{flex:1}}>
        <Spin spinning={!ObjectSelect}>
            <Button 
                type='button'
                onClick={()=>setVisible(true)}
            >{dataSelect?dataSelect.selectedTemplate.showName+dataSelect.selectedProp.showName:"\u6DFB\u52A0"}</Button>
        </Spin>
      </div>
      {visible &&　!!ObjectSelect? <ObjectSelect
        {...{
            visible: true,
            handleOk,
            handleCancel:handleCancel,
            tabs:['instance', 'template', 'property'],
            selectedObject:'',
            multiSelect:false,
            domain:'',
            namespace:'App_ee8c09823607e93a5596c83128dcee74',
            scope:7
            }}
    />: null}
  </div> 
}