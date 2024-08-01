import React, { Component } from 'react'
//import _ from 'lodash'

class CustomComp extends Component {
  constructor(props) {
    super(props)
    console.log('square this.props', this.props)
    const config = props?.data?._attrObject.data || {}
    this.state = {
      percent: 50,
      fontSize: config?.fontSize?.value || '32px',
      fontFamily: config?.fontFamily?.value || 'sans-serif',
      fontColor: config?.fontColor?.color || '#0000',
      service: config?.object?.dynamicDataSource || {},
      squareHeight: config?.squareHeight?.value || '32px',
      squareWeight: config?.squareWeight?.value || '32px',
      squareColor: config?.squareColor?.color || '#FFB5B5',
      showText: config?.showText?.value || 'true',
      showBorder: config?.showBorder?.value || 'true',
      squareDirection: config?.squareDirection?.value || 'left',
      events: config?.events || [],
    }
  }
  componentDidMount() {
    console.log('square this.state', this.state)
    scriptUtil.registerReactDom(this, this.props)
    if (!_.isEmpty(this.state.service)) {
      this.getServiceData()
    }
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')
  }

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

  getServiceData = () => {
    const { service } = this.state

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
          percent: res.data,
        })
      },
    })
  }

  getValue = () => {
    return this.state.percent
  }

  setValue = (percent) => {
    this.setState({ percent })
  }

  renderSvg = (visible) => {
    const { squareHeight, squareWeight, squareColor, showBorder } = this.state
    return (
      <i
        style={{
          width: squareWeight,
          height: squareHeight,
          color: squareColor,
          display: 'inline-block',
          margin: '2px',
          opacity: visible ? 1 : 0.3,
          border: showBorder === 'true' ? 'solid 2px #f33' : 'none',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="currentColor">
            <rect width="100" height="100"></rect>
          </g>
        </svg>
      </i>
    )
  }

  renderPart = (percent, level) => {
    let n = 0
    switch (level) {
      case 4:
        n = percent //0~40
        break
      case 3:
        n = percent - 40 //41~70 -> 1 ~ 30
        break
      case 2:
        n = percent - 70 //71~90 -> 1 ~ 20
        break
      case 1:
        n = percent - 90 //91~100 -> 1 ~ 10
        break
    }
    const svgs = []
    for (let i = 0; i < level; i++) {
      svgs.push(this.renderSvg(n > i * 10 ? true : false))
    }

    return svgs
  }

  render() {
    const { percent, squareDirection, fontSize, fontFamily, fontColor, showText } = this.state
    const spanStyle = {
      position: 'absolute',
      fontSize,
      fontFamily,
      fontColor,
    }
    Object.assign(spanStyle, squareDirection === 'right' ? { left: '10px' } : { right: '10px' })

    return (
      <div style={{ position: 'relative', direction: squareDirection === 'right' ? 'rtl' : 'ltr' }}>
        <div>
          {this.renderPart(percent, 1)}
          {showText === 'true' && <span style={spanStyle}>{`${percent}%`}</span>}
        </div>
        <div>{this.renderPart(percent, 2)}</div>
        <div>{this.renderPart(percent, 3)}</div>
        <div>{this.renderPart(percent, 4)}</div>
      </div>
    )
  }
}

export default CustomComp
