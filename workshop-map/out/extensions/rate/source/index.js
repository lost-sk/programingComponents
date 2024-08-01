import React, { Component } from 'react'
import { Rate } from 'antd'

class CustomComp extends Component {
  constructor(props) {
    super(props)
    console.log('rate this.props', this.props)
    this.state = {
      value: +props.data._attrObject.data?.defaultValue?.value || 0,
      config: props.data._attrObject.data,
    }
  }
  componentDidMount() {
    console.log('rate this.state', this.state)
    scriptUtil.registerReactDom(this, this.props)
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')
  }

  getValue = () => {
    return this.state.value
  }

  setValue = (value) => {
    this.setState({ value })
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

  onChange = (value) => {
    this.setState({ value }, () => {
      this.runCode('onChange', '内容改变事件脚本错误,请打开控制台查看错误信息')
    })
  }

  render() {
    const { value, config } = this.state
    const starCounts = +config?.starCounts?.value || 5
    const allowHalf = config?.allowHalf?.value === 'true' ? true : false
    return <Rate onChange={this.onChange} value={value} count={starCounts} allowHalf={allowHalf} />
  }
}

export default CustomComp
