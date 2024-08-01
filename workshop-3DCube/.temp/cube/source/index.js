import React, { Component, createRef } from 'react'
import ReglInit from './main'
// import ReglInit from '~js'
// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
// }

class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('this.props config', config)
    this.cubeRef = createRef(null)
    this.interval = null
    this.regl = null
    this.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      interval: config?.interval?.value || '0',
      isDesign: props.isDesign === true ? true : false,
      backgroundColor: config?.backgroundColor?.color || '',
      dataList: [],
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')

    const { service, interval, color } = this.state

    if (!_.isEmpty(service)) {
      this.execService(service, 'dataList')
    }

    if (+interval > 0) {
      this.interval = setInterval(() => {
        if (!_.isEmpty(service)) {
          this.execService(service, 'dataList')
        }
      }, +interval * 1000)
    }

    this.regl = ReglInit(this.cubeRef.current, this.state.dataList, color)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.dataList, this.state.dataList)) {
      const { dataList, backgroundColor } = this.state
      console.log('didupdate', dataList)
      if (this.regl !== null) {
        this.regl.destroy()
      }
      let color = []
      if (/^rgba/.test(backgroundColor)) {
        const numbers = backgroundColor.match(/\d+/g)
        for (let i = 0; i < numbers.length; i++) {
          if (i < 3) {
            color.push(Math.round((+numbers[i] * 100) / 255) / 100)
          } else {
            color.push(+numbers[i])
          }
        }
      } else {
        color = [0, 0, 0, 0]
      }
      this.regl = ReglInit(this.cubeRef.current, dataList, color)
    }
  }

  componentWillUnmount() {
    if (this.regl) {
      this.regl.destroy()
    }
  }

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

  runCode = (key, msg) => {
    const events = _.get(this.state, 'config.events', [])
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

  render() {
    return <div ref={this.cubeRef}></div>
  }
}

export default CustomComp
