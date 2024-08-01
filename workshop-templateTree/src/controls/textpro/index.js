import React, { Component } from 'react'
import { List, Tooltip } from 'antd'
class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props.data._attrObject.data || {}
    this.state = {
      config,
      inputVal: '',
      bubbleVal: '',
      autoFlag: false,
      defFlag: false,
      position: '',
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    if (this.props.isDesign) {
      this.setState({
        inputVal: _.get(config, 'inputVal.value', mock.text),
        bubbleVal: _.get(config, 'bubbleVal.value', mock.title),
      })
      return
    }
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')
    let { config } = this.state
    // console.log(config, 'textpro config');
    this.getData()
    this.setState({
      inputVal: _.get(config, 'inputVal.value', mock.text),
      bubbleVal: _.get(config, 'bubbleVal.value', mock.title),
      autoFlag: _.get(config, 'auto.value') == 'true',
      defFlag: _.get(config, 'reveal.value') == 'true',
      position: _.get(config, 'bubbleinput.value'),
    })
  }
  componentWillUnmount() {
    scriptUtil.logoutReactDom(this, this.props)
  }
  onClick = () => {
    this.runCode('onClick', '点击标题事件脚本错误,请打开控制台查看错误信息')
  }
  getValue = () => {
    let { inputVal, bubbleVal } = this.state
    let data = {}
    data.title = bubbleVal
    data.text = inputVal
    return data
  }
  setSource = ({ text, title }) => {
    this.setState({
      inputVal: text,
      bubbleVal: title,
    })
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
        // console.log(res, 'restextpro')
        this.setState({
          inputVal: _.get(res, 'data.text'),
          bubbleVal: _.get(res, 'data.title'),
        })
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
    const { autoFlag, defFlag, position } = this.state
    const config = this.props.data._attrObject.data || {}
    const fontSize = _.get(config, 'fontSize.value', '13') + 'px'
    const fontColor = _.get(config, 'fontColor.color', '#000')
    const inputVal = _.get(config, 'inputVal.value', mock.text)
    const bubbleVal = _.get(config, 'bubbleVal.value', mock.title)
    return (
      <div>
        <Tooltip
          onClick={this.onClick}
          title={bubbleVal}
          autoAdjustOverflow={autoFlag}
          defaultVisible={defFlag}
          placement={position}
        >
          <span style={{ fontSize, color: fontColor }}>{inputVal}</span>
        </Tooltip>
      </div>
    )
  }
}

export default CustomComp
var mock = {
  text: '内容一',
  title: 'Prompt Text',
}
