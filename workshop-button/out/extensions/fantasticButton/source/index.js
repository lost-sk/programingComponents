import React, { Component, createRef } from 'react'
import './style.css'

// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
//   executeScriptService: () => {},
// }
class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}

    this.interval = null
    this.buttonRef = createRef()
    this.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      interval: config?.interval?.value || '0', //定时刷新时间
      isDesign: props.isDesign === true ? true : false,
      backgroundColor: config?.backgroundColor?.color || '',
      fontColor: config?.fontColor?.color || '',
      fontSize: config?.fontSize?.value || '16',
      text: config?.text?.value || '确定',
    }
  }

  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')
  }

  /**
   *
   * @param {*} service oodm服务
   * @param {*} attr 服务返回存放位置
   */
  execService = (service, attr) => {
    var objName = ''
    var serviceName = ''
    var params = {}
    if (service.key == 'template') {
      objName = service.selectedTemplate.namespace + '.' + service.selectedTemplate.name
    } else {
      objName =
        service.selectedTemplate.namespace +
        '.' +
        service.selectedTemplate.name +
        '/' +
        service.selectedInstance.name
    }

    if (service.subTab == 'service') {
      serviceName = service.selectedProp.namespace + '.' + service.selectedProp.name
    } else {
      serviceName = 'system.getPropertyValue'
      params = {
        propName: service.selectedProp.propertyName,
      }
    }

    scriptUtil.executeScriptService({
      objName, // 模板 或者 实例
      serviceName, // 服务的命名空间+服务别名
      // 入参
      params,
      version: 'V2',
      // 回调函数
      cb: (res) => {
        this.setState({
          [attr]: res.data.list,
        })
      },
    })
  }

  runCode = (key, msg, params = null) => {
    const { events } = this.state
    events.forEach((item) => {
      if (item.content === key) {
        this.runScript(item.detail, msg, params)
      }
    })
  }

  runScript = (codeStr, message, params) => {
    try {
      //new function中codeStr脚本可以通过固定的_this来获取当前组件的this,通过params获取入参
      const _this = this
      new Function('_this', 'params', codeStr)(_this, params)
    } catch (error) {
      console.error(error)
      notification.error({
        message: '可编程组件',
        description: message,
      })
    }
  }

  handleClick = () => {
    this.runCode('click', '单机事件脚本错误,请打开控制台查看错误信息')
  }

  render() {
    const { text, fontColor, fontSize } = this.state
    const config = this.props?.data?._attrObject.data || {}
    const style = config?.style?.value || '1'
    return (
      <button onClick={this.handleClick} ref={this.buttonRef} className={`custom-btn btn-${style}`}>
        <span style={{ fontSize: fontSize + 'px', color: fontColor }}>{text}</span>
        {style === '12' && (
          <span style={{ fontSize: fontSize + 'px', color: fontColor }}>{text}</span>
        )}
      </button>
    )
  }
}

export default CustomComp
