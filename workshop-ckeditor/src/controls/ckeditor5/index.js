import React, { Component, createRef } from 'react'
import * as CkEditorReact from './ckeditor5-react'
import * as ClassicEditor from './ckeditor5-build-classic'
//import { CKEditor } from '@ckeditor/ckeditor5-react'
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import _ from 'lodash'

const { CKEditor } = CkEditorReact

class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('ckeditor5 this.props config', config)
    this.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      backgroundColor: config?.backgroundColor?.color || '#0D2C69',
      zoom: config?.zoom?.value || '1.33',
      trigger: config?.trigger?.value || 'click',
      innerHtml: config?.htmlDetail || '',
    }
  }
  componentDidMount() {
    // scriptUtil.registerReactDom(this, this.props)
    // if (!_.isEmpty(this.state.service)) {
    //   this.getServiceData()
    // }

    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')

    // if (Number.isInteger(+interval) && +interval > 0) {
    //   this.interval = setInterval(() => {
    //     if (!_.isEmpty(this.state.service)) {
    //       this.getServiceData()
    //     }
    //   }, +interval * 1000)
    // }
  }

  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {}

  runCode = (key, msg) => {
    const { events } = this.state
    events.forEach((item) => {
      if (item.content === key) {
        this.runScript(item.detail, msg)
      }
    })
  }

  runScript = (codeStr, message) => {
    try {
      //new function中codeStr脚本可以通过固定的_this来获取当前组件的this
      const _this = this
      new Function('_this', codeStr)(_this)
    } catch (error) {
      console.error(error)
      notification.error({
        message: '可编程组件',
        description: message,
      })
    }
  }

  // getServiceData = () => {
  //   const { service } = this.state

  //   var objName = ''
  //   var serviceName = ''
  //   var params = {}
  //   if (service.key == 'template') {
  //     objName = service.selectedTemplate.namespace + '.' + service.selectedTemplate.name
  //   } else {
  //     objName =
  //       service.selectedTemplate.namespace +
  //       '.' +
  //       service.selectedTemplate.name +
  //       '/' +
  //       service.selectedInstance.name
  //   }

  //   if (service.subTab == 'service') {
  //     serviceName = service.selectedProp.namespace + '.' + service.selectedProp.name
  //   } else {
  //     serviceName = 'system.getPropertyValue'
  //     params = {
  //       propName: service.selectedProp.propertyName,
  //     }
  //   }

  //   scriptUtil.executeScriptService({
  //     objName, // 模板 或者 实例
  //     serviceName, // 服务的命名空间+服务别名
  //     // 入参
  //     params,
  //     version: 'V2',
  //     // 回调函数
  //     cb: (res) => {
  //       this.setState({
  //         dataList: res.data.list,
  //       })
  //     },
  //   })
  // }

  // transHtml = (visible, value) => {
  //   const { innerHtml } = this.state
  //   if (visible) {
  //     const regex = /\${(.*?)}/g
  //     const replacedStr = innerHtml.replace(regex, (match, captured) => {
  //       return value[captured] || ''
  //     })
  //     return replacedStr
  //   } else {
  //     return ''
  //   }
  // }

  render() {
    return (
      <div>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor&nbsp;5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor)
          }}
          onChange={(event) => {
            console.log(event)
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor)
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor)
          }}
        />
      </div>
    )
  }
}

export default CustomComp
