import React, { Component, createRef } from 'react'
import { message } from 'antd'
import * as eCharts from './echarts'

import _ from 'lodash'
const scriptUtil = {
  registerReactDom: () => {},
  executeScriptService: () => {},
}

const myColor = [
  '#fc8452',
  '#ea7ccc',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#5470c6',
  '#9a60b4',
]

class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('map this.props config', config)
    this.chartRef = createRef(null)
    this.interval = null
    this.chart = null
    this.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      backgroundColor: config?.backgroundColor?.color || '#0D2C69',
      interval: config?.interval?.value || '0',
      dataList: [],
    }
  }
  componentDidMount() {
    const { backgroundColor, dataList, interval, service } = this.state

    scriptUtil.registerReactDom(this, this.props)
    if (!_.isEmpty(service)) {
      this.execService(service, 'dataList')
    }

    this.chart = eCharts.init(this.chartRef.current)
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')

    const bigData = []
    const time1 = Date.now() - 10000 * 1000
    for (let i = 0; i < 10000; i += 1) {
      for (let m = 0; m < 100; m += 1) {
        bigData.push({
          time: time1 + i * 1000,
          value: (Math.random() * 400).toFixed(1),
        })
      }
    }

    const chartOption = {
      backgroundColor,
      dataset: { source: bigData, dimensions: ['time', 'value'] },
      xAxis: [{ type: 'time' }],
      yAxis: [{}],
      animation: false,
      dataZoom: [
        {
          type: 'slider',
          showDataShadow: false,
          realtime: false,
        },
        {
          type: 'slider',
          orient: 'vertical',
          showDataShadow: false,
          //realtime: false,
        },
      ],
      series: [
        {
          type: 'scatter',
          //data: rawData,
          dimensions: ['time', 'value'],
          symbolSize: 4,
          // itemStyle: {
          //   opacity: 0.4,
          // },
          // blendMode: 'source-over',
          large: true,
          // largeThreshold: 500,
          progressive: 10000,
        },
      ],
    }
    this.chart.setOption(chartOption)

    if (+interval > 0) {
      this.interval = setInterval(() => {
        if (!_.isEmpty(service)) {
          this.execService(service, 'dataList')
        }
      }, +interval * 1000)
    }
  }

  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {
    clearInterval(this.interval)
    this.chart.dispose()
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

  render() {
    return (
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <div style={{ height: '100%', width: '100%' }} ref={this.chartRef}></div>
      </div>
    )
  }
}

export default CustomComp
