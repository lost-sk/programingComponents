import React, { Component } from 'react'
import { Card } from 'antd'
import './index.css'
//import _ from 'lodash'

class CustomComp extends Component {
  constructor(props) {
    super(props)
    console.log('card this.props config', props?.data?._attrObject.data)
    const config = props?.data?._attrObject.data || {}
    this.state = {
      valueList: [{ title: 'default title' }, { title: 'default title' }],
      fontSize: config?.fontSize?.value || '14px',
      fontFamily: config?.fontFamily?.value || 'sans-serif',
      fontColor: config?.fontColor?.color || '#000',
      fontBorder: config?.fontBorder?.value || 'normal',
      headHeight: config?.headHeight?.value || '55px',
      cardWidth: config?.cardWidth?.value || '100px',
      cardMargin: config?.cardMargin?.value || '6px',
      headBackground: config?.headBackground?.color || '#FFF',
      bodyBackground: config?.bodyBackground?.color || '#FFF',
      innerHtml: config?.htmlDetail || '<div>default body</div>',
      direction: config?.direction?.value || 'row',
      showBorder: config?.showBorder?.value || 'true',
      borderColor: config?.borderColor?.color || '#e8e8e8',
      service: config?.object?.dynamicDataSource || {},
      events: config?.events || [],
    }
  }
  componentDidMount() {
    console.log('card this.state', this.state)
    scriptUtil.registerReactDom(this, this.props)
    if (!_.isEmpty(this.state.service)) {
      this.getServiceData()
    }
    this.props.setScrollable(true)
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
          valueList: res?.data?.list || [],
        })
      },
    })
  }

  getHtml = () => {
    return this.state.innerHtml
  }

  setHtml = (innerHtml) => {
    this.setState({ innerHtml })
  }

  transHtml = (value) => {
    const { innerHtml } = this.state
    const regex = /\${(.*?)}/g
    const replacedStr = innerHtml.replace(regex, (match, captured) => {
      return value[captured] || ''
    })
    return replacedStr
  }

  render() {
    const {
      valueList,
      fontSize,
      fontFamily,
      fontColor,
      showBorder,
      borderColor,
      cardWidth,
      cardMargin,
      fontBorder,
      headHeight,
      headBackground,
      bodyBackground,
      direction,
    } = this.state

    return (
      <div
        className="cardSet"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: direction,
          flexWrap: 'wrap',
          overflow: 'auto',
        }}
      >
        {valueList.map((v) => {
          const htmlStr = { __html: this.transHtml(v) }
          return (
            <Card
              title={v.title}
              bordered={showBorder === 'true' ? true : false}
              headStyle={{
                fontSize,
                fontFamily,
                color: fontColor,
                height: headHeight,
                minHeight: '20px',
                fontWeight: fontBorder,
                backgroundColor: headBackground,
                display: 'flex',
                alignItems: 'center',
              }}
              bodyStyle={{
                borderTop: `2px solid ${borderColor}`,
                backgroundColor: bodyBackground,
              }}
              style={{
                border: `1px solid ${borderColor}`,
                minWidth: cardWidth,
                margin: cardMargin,
              }}
            >
              <div dangerouslySetInnerHTML={htmlStr}></div>
            </Card>
          )
        })}
      </div>
    )
  }
}

export default CustomComp
