import React, { Component } from 'react'
//import _ from 'lodash'

class CustomComp extends Component {
  constructor(props) {
    super(props)
    console.log('square this.props', this.props)
    const config = props?.data?._attrObject.data || {}
    this.state = {
      percent: 50,
      fontSize: config?.fontSize?.value || '14px',
      fontFamily: config?.fontFamily?.value || 'sans-serif',
      fontColor: config?.fontColor?.color || '#000',
      service: config?.object?.dynamicDataSource || {},
      squareColor: config?.squareColor?.color || '#FFB5B5',
      showText: config?.showText?.value || 'true',
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

  render() {
    const { percent, fontSize, fontFamily, fontColor, squareColor, showText } = this.state

    return (
      <i style={{ color: squareColor, height: '100%', width: '100%', display: 'block' }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="none"
            stroke-width="1"
            fill="currentColor"
            fill-rule="evenodd"
            stroke-linejoin="round"
          >
            <path
              style={{
                opacity: percent > 75 ? 1 : 0.4,
              }}
              d="M38.3671378,14.5650584 L73.9721126,1.70090638 C74.4915344,1.51323816 75.0647442,1.78217765 75.2524124,2.30159952 C75.3317504,2.5211886 75.3317504,2.76161717 75.2524124,2.98120624 L62.3882604,38.586181 C62.0852483,39.4248479 61.4248479,40.0852483 60.586181,40.3882604 L24.9812062,53.2524124 C24.4617844,53.4400806 23.8885746,53.1711412 23.7009064,52.6517193 C23.6215684,52.4321302 23.6215684,52.1917016 23.7009064,51.9721126 L36.5650584,16.3671378 C36.8680705,15.5284709 37.5284709,14.8680705 38.3671378,14.5650584 Z"
              stroke="#A0A0A0"
              stroke-width="2"
              transform="translate(49.476659, 27.476659) rotate(45.000000) translate(-49.476659, -27.476659) "
            ></path>
            <path
              style={{
                opacity: percent > 50 ? 1 : 0.4,
              }}
              d="M74.4604001,37 L85.4082855,42.0212384 C85.9102789,42.2515015 86.1305598,42.8451127 85.9002967,43.3471061 C85.8004781,43.5647193 85.6258987,43.7392986 85.4082855,43.8391173 L50.7507847,59.7364255 C49.956705,60.1006678 49.043295,60.1006678 48.2492153,59.7364255 L13.5917145,43.8391173 C13.0897211,43.6088542 12.8694402,43.015243 13.0997033,42.5132496 C13.1995219,42.2956364 13.3741013,42.1210571 13.5917145,42.0212384 L24.5384001,37 L48.2492153,47.8752248 C48.9771217,48.2091136 49.8052987,48.2369377 50.5499168,47.958697 L50.7507847,47.8752248 L74.4604001,37 Z"
              stroke="#A0A0A0"
              stroke-width="2"
            ></path>
            <path
              style={{
                opacity: percent > 25 ? 1 : 0.4,
              }}
              d="M74.4604001,52.0106073 L85.4082855,57.0318457 C85.9102789,57.2621088 86.1305598,57.8557199 85.9002967,58.3577133 C85.8004781,58.5753265 85.6258987,58.7499059 85.4082855,58.8497245 L50.7507847,74.7470328 C49.956705,75.1112751 49.043295,75.1112751 48.2492153,74.7470328 L13.5917145,58.8497245 C13.0897211,58.6194614 12.8694402,58.0258503 13.0997033,57.5238569 C13.1995219,57.3062437 13.3741013,57.1316643 13.5917145,57.0318457 L24.5384001,52.0106073 L48.2492153,62.8858321 C48.9771217,63.2197209 49.8052987,63.247545 50.5499168,62.9693043 L50.7507847,62.8858321 L74.4604001,52.0106073 Z"
              stroke="#A0A0A0"
              stroke-width="2"
            ></path>
            <path
              style={{
                opacity: percent > 0 ? 1 : 0.4,
              }}
              d="M74.4604001,67.0212145 L85.4082855,72.0424529 C85.9102789,72.272716 86.1305598,72.8663272 85.9002967,73.3683206 C85.8004781,73.5859338 85.6258987,73.7605132 85.4082855,73.8603318 L50.7507847,89.75764 C49.956705,90.1218824 49.043295,90.1218824 48.2492153,89.75764 L13.5917145,73.8603318 C13.0897211,73.6300687 12.8694402,73.0364575 13.0997033,72.5344641 C13.1995219,72.3168509 13.3741013,72.1422716 13.5917145,72.0424529 L24.5384001,67.0212145 L48.2492153,77.8964393 C48.9771217,78.2303281 49.8052987,78.2581522 50.5499168,77.9799115 L50.7507847,77.8964393 L74.4604001,67.0212145 Z"
              stroke="#A0A0A0"
              stroke-width="2"
            ></path>
            <text
              x="50%"
              y="50%"
              text-anchor="middle"
              dominant-baseline="middle"
              text-align="center"
              style={{
                fontSize,
                fontFamily,
                fill: fontColor,
                opacity: showText === 'true' ? 1 : 0,
              }}
            >
              {`${percent}%`}
            </text>
          </g>
        </svg>
      </i>
    )
  }
}

export default CustomComp
