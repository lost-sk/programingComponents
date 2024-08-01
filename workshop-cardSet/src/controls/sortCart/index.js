import React, { Component } from 'react'
import { Card } from 'antd'
//import './index.css'

import _ from 'lodash'
const scriptUtil = {
  registerReactDom: () => {},
  executeScriptService: () => {},
}

class CustomComp extends Component {
  constructor(props) {
    super(props)
    console.log('card this.props config', props?.data?._attrObject.data)
    const config = props?.data?._attrObject.data || {}
    this.state = {
      valueList: [
        { id: '1', title: 'default title', sort: 3 },
        { id: '2', title: 'default title2', sort: 1 },
        { id: '3', title: 'default title3', sort: 2 },
        { id: '4', title: 'default title4', sort: 0 },
        { id: '5', title: 'default title5', sort: 4 },
        { id: '6', title: 'default title6', sort: 5 },
      ],
      cardWidth: config?.cardWidth?.value || '25%',
      cardHeight: config?.cardHeight?.value || '100px',
      cardMargin: config?.cardMargin?.value || '6px',
      direction: config?.direction?.value || 'row',
      showBorder: config?.showBorder?.value || 'true',
      borderColor: config?.borderColor?.color || '#e8e8e8',
      service: config?.object?.dynamicDataSource || {},
      events: config?.events || [],
      dragState: {
        draggingNode: null,
        dropNode: null,
      },
    }
  }
  componentDidMount() {
    console.log('card this.state', this.state)
    scriptUtil.registerReactDom(this, this.props)
    if (!_.isEmpty(this.state.service)) {
      this.getServiceData()
    }
    //this.props.setScrollable(true)
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

  handleDragStart = (dragEvent, dragNode) => {
    dragEvent.preventDefault()
    this.setState({
      dragState: {
        ...this.state.dragState,
        draggingNode: dragNode,
      },
    })
  }

  handleDragOver = (dragEvent, overNode) => {
    dragEvent.preventDefault()
    this.setState({
      dragState: {
        ...this.state.dragState,
        dropNode: overNode,
      },
    })
  }

  handleDragEnd = (dragEvent) => {
    const {
      dragState: { draggingNode, dropNode },
      valueList,
    } = this.state
    dragEvent.preventDefault()
    if (draggingNode.sort === dropNode.sort) return
    // 交互两个卡片的sort
    const dragIndex = valueList.findIndex((v) => v.id === draggingNode.id)
    const dropIndex = valueList.findIndex((v) => v.id === dropNode.id)
    if (dragIndex !== -1 && dropIndex !== -1) {
      const tSort = [dropNode.sort, draggingNode.sort]
      valueList[dragIndex].sort = tSort[0]
      valueList[dropIndex].sort = tSort[1]
    }

    this.setState({
      valueList,
    })
  }

  render() {
    const { valueList, showBorder, borderColor, cardWidth, cardMargin, direction, cardHeight } =
      this.state
    const sortList = valueList.sort((a, b) => {
      return a.sort > b.sort ? 0 : -1
    })
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
        {sortList.map((v) => {
          return (
            <Card
              key={v.title}
              title={v.title}
              bordered={showBorder === 'true' ? true : false}
              style={{
                border: `1px solid ${borderColor}`,
                width: cardWidth,
                height: cardHeight,
                margin: cardMargin,
              }}
              draggable
              onDragStart={(event) => {
                this.handleDragStart(event, v)
              }}
              onDragOver={(event) => {
                this.handleDragOver(event, v)
              }}
              onDragEnd={(event) => {
                this.handleDragEnd(event)
              }}
            >
              <div></div>
            </Card>
          )
        })}
      </div>
    )
  }
}

export default CustomComp
