import React, { Component } from 'react'
import { message } from 'antd'

// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
//   executeScriptService: () => {},
// }

class CustomComp extends Component {
  constructor(props) {
    super(props)

    const config = props?.data?._attrObject.data || {}
    console.log('user this.props', config)
    this.interval = null
    this.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      isDesign: props.isDesign === true ? true : false,
      fontColor: config?.fontColor?.color || '',
      fontSize: config?.fontSize?.value || '16',
      fontWeight: config?.fontWeight?.value || '400',
      userInfo: {},
      showType: config?.showType?.value || '1', // 1 用户 2部门 3岗位 4公司 5 角色
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    const { service, isDesign, interval } = this.state
    if (!_.isEmpty(service)) {
      this.execService(service, 'dataList')
    }
    //定时请求服务
    if (+interval > 0) {
      this.interval = setInterval(() => {
        if (!_.isEmpty(service)) {
          this.execService(service, 'dataList')
        }
      }, +interval * 1000)
    }
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')

    let user = {}
    user = scriptUtil.getSessionUserInfo()
    const url = `/open-api/organization/v2/persons/${user.staffCode}`
    scriptUtil.request(url, { method: 'GET' }).then((res) => {
      user = { ...user, ...res }
      scriptUtil.getUserInfo((res2) => {
        const roleList = res2?.userInfo?.userRoleList || []
        user.userRoleList = roleList
        this.setState({
          userInfo: user,
        })
      })
    })
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

  getValue = () => {
    return this.state.userInfo
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

  renderFunc = () => {
    const { showType, userInfo } = this.state
    console.log('showType', showType)
    let text = ''
    switch (showType) {
      case '2':
        if (Array.isArray(userInfo.departments)) {
          const arr = userInfo.departments.map((u) => u.name)
          text = arr.join('、')
        }
        break
      case '3':
        if (Array.isArray(userInfo.positions)) {
          const arr = userInfo.positions.map((u) => u.name)
          text = arr.join('、')
        }
        break
      case '4':
        if (Array.isArray(userInfo.companies)) {
          const arr = userInfo.companies.map((u) => u.name)
          text = arr.join('、')
        }
        break
      case '5':
        if (Array.isArray(userInfo.userRoleList)) {
          const arr = userInfo.userRoleList.map((u) => u.name)
          text = arr.join('、')
        }
        break
      default:
        text = userInfo.username || userInfo.name || ''
        break
    }
    return text
  }

  render() {
    const { fontColor, fontSize, fontWeight } = this.state
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          fontSize: fontSize + 'px',
          color: fontColor,
          fontWeight,
        }}
      >
        {this.renderFunc()}
      </div>
    )
  }
}

export default CustomComp
