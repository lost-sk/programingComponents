import React, { Component } from 'react'
import { Tag } from 'antd'
class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}

    this.state = {
      config: props.data._attrObject.data,
      diycolor: '',
      text: '',
      text1: config?.labelcon?.value ? config.labelcon.value : '标签',
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    if (this.props.isDesign) {
      this.setState({})
      return
    }
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')
    let { config } = this.state
    // console.log(config, 'sinlabel config');
    this.getData()
    this.setState({
      diycolor: _.get(config, 'diycolor.color'),
      text: _.get(config, 'labelcon.value'),
      style: _.get(config, 'style.value'),
    })
  }
  componentWillUnmount() {
    scriptUtil.logoutReactDom(this, this.props) /////////////多标签    服务单
  }
  onClick = () => {
    this.runCode('onClick', '点击标题事件脚本错误,请打开控制台查看错误信息')
  }
  getValue = () => {
    const { text, diycolor, style } = this.state
    let data = {}
    data.text = text
    data.color = diycolor ? diycolor : style
    return data
  }
  setValue = (str) => {
    this.setState({ text1: str })
  }
  getData = () => {
    const dynamicDataSource = _.get(this.state.config, 'object.dynamicDataSource', {})
    if (_.isEmpty(dynamicDataSource)) return

    let objName = ''
    let serviceName = ''
    let params = {}

    if (dynamicDataSource.key == 'template') {
      objName =
        dynamicDataSource.selectedTemplate.namespace + '.' + dynamicDataSource.selectedTemplate.name
    } else {
      objName =
        dynamicDataSource.selectedTemplate.namespace +
        '.' +
        dynamicDataSource.selectedTemplate.name +
        '/' +
        dynamicDataSource.selectedInstance.name
    }

    if (dynamicDataSource.subTab == 'service') {
      serviceName =
        dynamicDataSource.selectedProp.namespace + '.' + dynamicDataSource.selectedProp.name
    } else {
      serviceName = 'system.getPropertyValue'
      params = {
        propName: dynamicDataSource.selectedProp.propertyName,
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
        // console.log(res, 'ressinlabel')
        this.setState({})
      },
    })
  }
  runCode = (key, msg) => {
    // console.log(this.state.config, 'configgg');
    const events = _.get(this.state, 'config.event', [])
    // console.log(events, 'events');
    events.forEach((item) => {
      if (item.content === key) {
        this.runScript(item.detail, msg)
      }
    })
  }
  runScript = (codeStr, message) => {
    try {
      new Function(codeStr)()
    } catch (error) {
      console.error(error)
      notification.error({
        message: '可编程组件',
        description: message,
      })
    }
  }
  render() {
    const { text1 } = this.state
    const usediy = _.get(this.props, 'data._attrObject.data.usediy.value', 'false')
    const color =
      usediy === 'true'
        ? _.get(this.props, 'data._attrObject.data.diycolor.color')
          ? _.get(this.props, 'data._attrObject.data.diycolor.color')
          : _.get(this.props, 'data._attrObject.data.style.value', 'magenta')
        : _.get(this.props, 'data._attrObject.data.style.value', 'magenta')

    return (
      <div>
        <Tag
          onClick={this.onClick}
          style={{
            fontSize: _.get(this.props, 'data._attrObject.data.textsize.value', '12'),
          }}
          color={color}
        >
          {text1}
        </Tag>
      </div>
    )
  }
}

export default CustomComp
