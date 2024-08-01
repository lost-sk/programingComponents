import React, { useState,useEffect } from 'react';
import { Switch } from 'antd';

export default function P(props) {
    //图例开关
    const checked = _.get(props, 'editComponent.props.data._attrObject.isDeskAdminMode')
    const [isOpen, setIsOpen] = useState(checked ? true : false);
    function useSelect(checked) {
        setIsOpen(checked);
        props.editComponent.props.data._attrObject.isDeskAdminMode = checked;
    }

    useEffect(()=>{
      if(window.__supOS_desktop_lock_save_observer__) return ()=>{};
      if(MutationObserver && typeof MutationObserver=='function'){
        window.__supOS_desktop_lock_save_observer__ = true;
        const observer = new MutationObserver((mutations, observer) => {
          mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
              if(mutation.addedNodes.length>0){
                mutation.addedNodes.forEach((node)=>{
                  // if([].slice.call(node.querySelectorAll(".ace_content .ace_comment span")).some(el=>el.innerHTML==='不')){
                  //   node.querySelector('.ant-modal-footer').style.display = 'none';
                  // }
                  if(node.querySelector('p') && node.querySelector('p').innerHTML == '脚本'){
                    // node.parentElement.removeChild(node);
                    node.style.display='none';
                  }
                })
              }
            }
          });
        });
        observer.observe(document.body, {childList: true});
      }
    },[]);

    return (
        <div style={{
            color: '#000',
            display: 'flex',
            padding: '5px 8px',
            lineHeight: '26px',
            width: '100%',
            alignItems:'center'
        }}>
            <div style={{ flex: 1 }}>是否使用管理员角色</div>
            <Switch size='small' onChange={useSelect} checked={isOpen} />
            <div>状态:{isOpen ? '开启' : '关闭'}</div>
        </div>
    );
}
