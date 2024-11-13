import React, { Component } from 'react'
import { Input } from 'antd'

class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('simu props config', config)
    this.state = {
      model: config?.model?.value || 'cyclone',
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)

    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.dataList, this.state.dataList)) {
      //TODO 数据变化后处理
    }
  }

  componentWillUnmount() {}

  getValue = () => {
    return this.state.value
  }

  setValue = (value) => {
    this.setState({ value })
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

  render() {
    return <div>Hello World</div>
  }
}

export default CustomComp
