import React, { Component, createRef } from 'react'

// import * as echarts from 'echarts'
// import 'echarts-gl'
// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
//   executeScriptService: () => {},
// }

class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('this.props config', config)
    this.mapRef = createRef(null)
    this.glChart = null
    this.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      xAxisBars: config?.xAxisBars?.value || '150',
      yAxisBars: config?.yAxisBars?.value || '250',
      zAxisBars: config?.zAxisBars?.value || '20',
      startColor: config?.startColor?.color || '#67C23A',
      endColor: config?.endColor?.color || '#F56C6C',
      dataList: [
        ['1-10', '1-10', 10],
        [20, '30-60', 16],
      ],
      scatterList: [
        {
          name: '主卫',
          value: [40, 40, 10],
        },
        {
          name: '厕所1',
          value: [50, 50, 20],
        },
      ],
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    if (!_.isEmpty(this.state.service)) {
      this.getServiceData()
    }
    this.loadScript()
    //this.onEchartsInit()
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.dataList, this.state.dataList) && this.glChart !== null) {
      this.glChart.setOption({
        series: [
          {
            data: this.formatDataList(),
          },
        ],
      })
    }
  }

  componentWillUnmount() {
    if (this.glChart) {
      this.glChart.dispose()
    }
  }

  formatDataList = () => {
    const { dataList } = this.state
    const formatArray = []

    for (let i = 0; i < dataList.length; i++) {
      if (typeof dataList[i][0] === 'string' && typeof dataList[i][1] === 'string') {
        const arr1 = dataList[i][0].split('-').map((v) => +v)
        const arr2 = dataList[i][1].split('-').map((v) => +v)
        for (let j = arr1[0]; j <= arr1[1]; j++) {
          for (let k = arr2[0]; k <= arr2[1]; k++) {
            formatArray.push([j, k, dataList[i][2]])
          }
        }
      }
      if (typeof dataList[i][0] === 'string' && typeof dataList[i][1] === 'number') {
        const arr = dataList[i][0].split('-').map((v) => +v)
        for (let j = arr[0]; j <= arr[1]; j++) {
          formatArray.push([j, dataList[i][1], dataList[i][2]])
        }
      }
      if (typeof dataList[i][0] === 'number' && typeof dataList[i][1] === 'string') {
        const arr = dataList[i][1].split('-').map((v) => +v)
        for (let j = arr[0]; j <= arr[1]; j++) {
          formatArray.push([dataList[i][0], j, dataList[i][2]])
        }
      }
      if (typeof dataList[i][0] === 'number' && typeof dataList[i][1] === 'number') {
        formatArray.push(dataList[i])
      }
    }

    return formatArray
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
          dataList: res.data.list,
        })
      },
    })
  }

  runCode = (key, msg) => {
    const events = this.state?.config?.events || []
    events.forEach((item) => {
      if (item.content === key) {
        this.runScript(item.detail, msg)
      }
    })
  }

  runScript = (codeStr, message) => {
    try {
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

  onEchartsInit = () => {
    const { xAxisBars, yAxisBars, zAxisBars, startColor, endColor, scatterList } = this.state

    this.glChart = echarts.init(this.mapRef.current)

    const option = {
      visualMap: {
        min: 1,
        max: +zAxisBars,
        inRange: {
          color: [startColor, endColor],
        },
      },
      xAxis3D: {
        type: 'value',
        min: 1,
        max: +xAxisBars,
      },
      yAxis3D: {
        type: 'value',
        min: 1,
        max: +yAxisBars,
      },
      zAxis3D: {
        type: 'value',
        min: 1,
        max: +zAxisBars,
      },
      grid3D: {
        boxWidth: +xAxisBars,
        boxDepth: +yAxisBars,
        boxHeight: +zAxisBars,
        viewControl: {
          distance: +xAxisBars + 100,
        },
        // axisLine: {
        //   lineStyle: {
        //     opacity: 0,
        //   },
        // },
        // axisLabel: {
        //   show: false,
        // },
        // axisTick: {
        //   show: false,
        // },
        // splitLine: {
        //   show: false,
        // },
        // axisPointer: {
        //   show: false,
        // },
      },
      series: [
        {
          type: 'bar3D',
          data: this.formatDataList(),
          barSize: 1,
          shading: 'color',
          itemStyle: {
            opacity: 0.3,
          },
        },
        {
          type: 'scatter3D',
          data: scatterList,
          symbol:
            'path://M512.341333 799.274667c-164.522667-183.424-246.741333-329.216-246.741333-437.333334 0-162.218667 110.464-241.493333 246.741333-241.493333 136.234667 0 246.698667 79.317333 246.698667 241.450667 0 108.117333-82.261333 253.866667-246.698667 437.418666z m0-313.258667c75.690667 0 137.002667-58.453333 137.002667-130.56s-61.312-130.56-137.002667-130.56c-75.690667 0-137.045333 58.453333-137.045333 130.56s61.354667 130.56 137.045333 130.56z m-170.666666 155.733333l38.272 36.992c-71.424 16.896-118.954667 46.976-118.954667 81.322667 0 52.906667 112.384 95.658667 250.965333 95.658667 138.624 0 251.008-42.837333 251.008-95.658667 0-33.962667-46.506667-63.786667-116.650666-80.725333l38.016-36.864c77.909333 25.941333 128.853333 68.906667 128.853333 117.589333 0 79.274667-134.826667 143.445333-301.226667 143.445333-166.314667 0-301.141333-64.170667-301.141333-143.36 0-49.152 51.84-92.501333 130.901333-118.4h-0.042666z',
          symbolSize: 20,
          label: {
            show: true,
            distance: 0,
            position: 'top',
            formatter: (params) => {
              return params.name || params.value[2]
            },
          },
        },
        {
          type: 'line3D',
          data: [
            [60, 40, 15],
            [60, 100, 15],
            [80, 100, 15],
          ],
          lineStyle: {
            width: 6,
          },
        },
      ],
    }
    this.glChart.setOption(option)
  }

  loadScript = () => {
    const version = this.props.data.getAttr('version')
    const widgetName = this.props.widgetName
    const scriptElement = document.createElement('script')
    console.log('version', version, widgetName)
    console.log('this.props', this.props, this.props.data)
    //scriptElement.src = 'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js'
    scriptElement.src = `/inter-api/ide/components/1/${widgetName}/${version}?fileName=resources/plugin/static/echarts.js`
    scriptElement.onload = () => {
      console.log('echarts onload')
      document.body.appendChild(scriptElement2)
    }
    document.body.appendChild(scriptElement)

    const scriptElement2 = document.createElement('script')
    //scriptElement2.src = 'https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js'
    scriptElement.src = `/inter-api/ide/components/1/${widgetName}/${version}?fileName=resources/plugin/static/echarts-gl.js`
    scriptElement2.onload = () => {
      console.log('echarts-gl onload')
      this.onEchartsInit()
    }
  }
  render() {
    return (
      <>
        <div style={{ height: '100%', width: '100%' }} ref={this.mapRef}></div>
      </>
    )
  }
}

export default CustomComp
