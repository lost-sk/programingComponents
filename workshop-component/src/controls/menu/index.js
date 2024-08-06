import React, { Component } from 'react'
import { Menu, Icon } from 'antd'

const { SubMenu } = Menu
class CustomComp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      config: props.data._attrObject.data,
      datalist: [],
      activeItems: [],
      choose: {},
      designStyle: {
        width: '100%',
        height: '100%',
      },
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    this.changeStyle()
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')
    this.getList()
  }
  componentWillUnmount() {
    scriptUtil.logoutReactDom(this, this.props)
  }
  changeStyle = () => {
    const backgroundColor = _.get(this.state.config, 'backgroundColor.color', '#fff')
    const fontColor = _.get(this.state.config, 'color.color', '#1677ff')
    const chooseColor = _.get(this.state.config, 'chooseColor.color', '#e6f4ff')
    const cid = this.props.data._tag
    const style = document.createElement('style')
    style.innerHTML = `
        #${cid} .ant-menu{
            background:${backgroundColor} !important;
        }
        #${cid} .ant-menu-item:hover, #${cid} .ant-menu-item-active, #${cid} .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,#${cid} .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
            color:${fontColor} !important;
            background:${chooseColor} !important;
        }
        #${cid} .ant-menu-horizontal >#${cid} .ant-menu-submenu-active, .ant-menu-horizontal > .ant-menu-submenu-open, .ant-menu-horizontal > .ant-menu-submenu-selected{
            border-bottom: 2px solid ${fontColor} !important;
        }
        #${cid} .ant-menu-vertical .ant-menu-item:after, .ant-menu-vertical-left .ant-menu-item:after, .ant-menu-vertical-right .ant-menu-item:after, .ant-menu-inline .ant-menu-item:after{
            border-right:3px solid ${fontColor} !important;
            color:${fontColor} 
        }
        #${cid} .ant-menu-submenu-arrow:after ,#${cid} .ant-menu-submenu-title:hover{
            color:${fontColor} 
        }
        #${cid} .ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow:before {
            background:${fontColor} !important;
        }

        #${cid} .ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow:after {
            background:${fontColor} !important;
        }
        #${cid} .ant-menu-submenu-vertical > .ant-menu-submenu-title .ant-menu-submenu-arrow:before {
            background:${fontColor} !important;
        }

        #${cid} .ant-menu-submenu-vertical > .ant-menu-submenu-title .ant-menu-submenu-arrow:after {
            background:${fontColor} !important;
        }

        #${cid} .ant-menu-horizontal > .ant-menu-submenu-selected,.ant-menu-vertical .ant-menu-submenu-selected{
            color:${fontColor} 
        }
        #${cid} .ant-menu-submenu-title:active {
            background:${chooseColor} !important;
        }
        #${cid} .ant-menu-horizontal > .ant-menu-submenu:hover{
            border-bottom: 2px solid ${fontColor} !important;
            color: ${fontColor} !important;
        }
        .ant-menu-item:hover, .ant-menu-item-active,.ant-menu-item-selected{
            color:${fontColor} !important;
            background:${chooseColor} !important;
        }
        `
    document.head.appendChild(style)
  }
  getList = () => {
    const dynamicDataSource = _.get(this.state.config, 'object.dynamicDataSource', {})
    const isOpen = _.get(this.state.config, 'open.value', 1)
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
        var list = []
        if (isOpen == 1) {
          res.data.list.forEach((item) => {
            list.push(item.title)
          })
        }
        this.setState({
          datalist: _.get(res, 'data.list', []),
          activeItems: list,
        })
      },
    })
  }
  runCode = (key, msg, params = null) => {
    const events = _.get(this.state, 'config.events', [])
    events.forEach((item) => {
      if (item.content === key) {
        this.runScript(item.detail, msg, params)
      }
    })
  }

  runScript = (codeStr, message, params) => {
    try {
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
  saveChoosed = (val) => {
    const data = val.item.props
    this.setState({
      choose: {
        key: data.eventKey,
        value: data.children,
      },
    })
    this.runCode('onSelect', '内容加载事件脚本错误,请打开控制台查看错误信息', data)
    // console.log(thi.state.choose)
  }
  getValue = () => {
    return this.state.choose
  }
  render() {
    const designStyle = this.props.isDesign
      ? { width: '100%', height: '100%', border: '3px dashed #E3E3E3' }
      : { border: '0px dashed blue' }
    const { datalist, config, activeItems } = this.state
    return (
      <div style={designStyle}>
        <Menu
          mode={_.get(config, 'mode.value', 'inline')}
          theme={_.get(config, 'theme.value', 'light')}
          openKeys={activeItems}
          onSelect={this.saveChoosed}
          onOpenChange={(key) => {
            this.setState({
              activeItems: key,
            })
          }}
        >
          {datalist.map((item) => {
            if (item.ItemGroup) {
              return (
                <SubMenu
                  key={item.title}
                  title={
                    <span>
                      <Icon type={_.get(config, 'icon.value', 'appstore')} />
                      <span>{item.title}</span>
                    </span>
                  }
                >
                  {item.ItemGroup.map((el) => {
                    return (
                      <Menu.ItemGroup key={el.title} title={el.title}>
                        {el.items.map((child) => {
                          return <Menu.Item key={child.itemValue}>{child.itemText}</Menu.Item>
                        })}
                      </Menu.ItemGroup>
                    )
                  })}
                </SubMenu>
              )
            } else {
              return (
                <SubMenu
                  key={item.title}
                  title={
                    <span>
                      <Icon type={_.get(config, 'icon.value', 'appstore')} />
                      <span>{item.title}</span>
                    </span>
                  }
                >
                  {item.items.map((child) => {
                    return <Menu.Item key={child.itemValue}>{child.itemText}</Menu.Item>
                  })}
                </SubMenu>
              )
            }
          })}
        </Menu>
      </div>
    )
  }
}

export default CustomComp
