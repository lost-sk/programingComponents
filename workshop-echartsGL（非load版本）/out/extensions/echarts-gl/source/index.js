import React, { Component, createRef } from 'react'
import echarts from './echarts'
// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
//   executeScriptService: () => {},
// }
// const isDevelopment = true

class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('this.props config', config)
    this.mapRef = createRef(null)
    this.glChart = null
    this.interval = null
    this.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      xAxisBars: config?.xAxisBars?.value || '150',
      yAxisBars: config?.yAxisBars?.value || '250',
      zAxisBars: config?.zAxisBars?.value || '20',
      startColor: config?.startColor?.color || '#4FC1FF',
      endColor: config?.endColor?.color || '#1D7CFF',
      backgroundColor: config?.backgroundColor?.color || '',
      debugMode: config?.debugMode?.value || 'true',
      symbolSize: config?.symbolSize?.value || '20',
      interval: config?.interval?.value || '0',
      dataList: this.formatDataString(config?.htmlDetail?.value || ''),
      scatterList: [],
      isDesign: props.isDesign === true ? true : false,
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    const { service, isDesign, interval } = this.state
    if (!_.isEmpty(service)) {
      this.execService(service, 'scatterList')
    }

    if (typeof isDevelopment === 'boolean' && isDevelopment) {
      this.setState({
        dataList: [
          [1, '1-195', 12],
          [1, '1-195', 12],
          [4, '1-195', 12],
          [1, '205-250', 12],
          [4, '205-250', 12],
          [5, '30-40', 10],
          ['1-30', 1, 12],
          ['1-30', 1, 12],
          ['40-150', 1, 12],
          [30, '1-70', 12],
          ['4-30', 70, 12],
          [40, '1-70', 12],
          ['40-150', 70, 12],
          ['95-150', 60, 12],
          [95, '40-60', 12],
          ['60-95', 40, 12],
          [60, '1-20', 12],
          [60, '30-39', 12],
          [60, '50-70', 12],
          ['103-140', '50-54', 5],
          ['60-100', '2-4', 8],
          [150, '1-20', 12],
          [150, '25-60', 12],
          [150, '70-85', 12],
          [150, '90-100', 12],
          [150, '110-150', 12],
          [150, '160-180', 12],
          [150, '200-220', 12],
          [150, '225-250', 12],
          ['1-80', 250, 12],
          ['90-100', 250, 12],
          ['120-140', 250, 12],
          ['145-150', 250, 12],
          ['1-60', 95, 12],
          ['70-100', 95, 12],
          ['110-150', 95, 12],
          [30, '80-95', 12],
          [59, '80-95', 12],
          [100, '70-85', 12],
          [110, '70-85', 12],
          ['100-103', 85, 12],
          ['107-110', 85, 12],
          ['1-150', 147, 12],
          ['1-70', 212, 12],
          ['1-70', 213, 12],
          ['1-70', 214, 12],
          [52, '147-195', 12],
          [30, '108-133', 12],
          ['110-140', '162-165', 5],
          ['70-100', '162-165', 5],
          ['70-75', 170, 2],
          ['90-95', 170, 2],
          ['120-125', 170, 2],
          ['130-135', 170, 2],
          ['30-60', 108, 12],
          ['80-120', 108, 12],
          ['30-120', 133, 12],
          ['90-150', '212-214', 12],
          [90, '212-220', 12],
          [90, '230-250', 12],
          [70, '212-220', 12],
          [70, '230-250', 12],
          [120, '108-122', 12],
          [120, '130-133', 12],
        ],
        scatterList: [{ name: '位置1', position: [120, 25, 1] }],
      })
    } else {
      if (Number.isInteger(+interval) && +interval > 0) {
        this.interval = setInterval(() => {
          if (!_.isEmpty(service)) {
            this.execService(service, 'scatterList')
          }
        }, +interval * 1000)
      }
    }

    this.onEchartsInit()
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.dataList, this.state.dataList) && this.glChart !== null) {
      this.glChart.setOption({
        series: [
          {
            data: this.formatDataList(this.state.dataList),
          },
        ],
      })
    }
    if (!_.isEqual(prevState.scatterList, this.state.scatterList) && this.glChart !== null) {
      this.glChart.setOption({
        series: [
          {},
          {
            data: this.formatScatterList(this.state.scatterList),
          },
        ],
      })
    }
  }

  componentWillUnmount() {
    if (this.glChart) {
      this.glChart.dispose()
    }
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  formatScatterList = (lists) => {
    const formatArray = []
    lists.forEach((li) => {
      if (li.color) {
        formatArray.push({
          ..._.omit(li, ['color', 'position']),
          itemStyle: { color: li.color },
          value: li?.position,
        })
      } else {
        formatArray.push({
          ..._.omit(li, ['position']),
          value: li?.position,
        })
      }
    })
    return formatArray
  }

  formatDataList = (list) => {
    const formatArray = []

    for (let i = 0; i < list.length; i++) {
      if (typeof list[i][0] === 'string' && typeof list[i][1] === 'string') {
        const arr1 = list[i][0].split('-').map((v) => +v)
        const arr2 = list[i][1].split('-').map((v) => +v)
        for (let j = arr1[0]; j <= arr1[1]; j++) {
          for (let k = arr2[0]; k <= arr2[1]; k++) {
            formatArray.push([j, k, ...list[i].slice(2)])
          }
        }
      }
      if (typeof list[i][0] === 'string' && typeof list[i][1] === 'number') {
        const arr = list[i][0].split('-').map((v) => +v)
        for (let j = arr[0]; j <= arr[1]; j++) {
          formatArray.push([j, list[i][1], ...list[i].slice(2)])
        }
      }
      if (typeof list[i][0] === 'number' && typeof list[i][1] === 'string') {
        const arr = list[i][1].split('-').map((v) => +v)
        for (let j = arr[0]; j <= arr[1]; j++) {
          formatArray.push([list[i][0], j, ...list[i].slice(2)])
        }
      }
      if (typeof list[i][0] === 'number' && typeof list[i][1] === 'number') {
        formatArray.push(list[i])
      }
    }

    const arr2 = []
    formatArray.forEach((f) => {
      if (f.length > 3) {
        arr2.push({
          value: f.slice(0, 3),
          itemStyle: {
            color: f[3],
          },
        })
      } else {
        arr2.push({
          value: f.slice(0, 3),
        })
      }
    })

    return arr2
  }

  formatDataString = (str) => {
    const arr = str.split('\n')

    const result = []

    for (let i = 0; i < arr.length; i++) {
      if (/(?<!\/\/\s*\S*)\[.{5,}\]/.test(arr[i])) {
        const item = arr[i].match(/\[(.{5,})\]/)[1]
        const itemArr = item.split(',')
        const formatArr = itemArr.map((i) => {
          if (Number.isNaN(+i)) {
            return i.replace(/"|'|\s/g, '')
          } else {
            return +i
          }
        })

        result.push(formatArr)
      }
    }

    return result
  }

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

  onEchartsInit = () => {
    const {
      xAxisBars,
      yAxisBars,
      zAxisBars,
      startColor,
      endColor,
      scatterList,
      dataList,
      debugMode,
      symbolSize,
    } = this.state

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
      },
      series: [
        {
          type: 'bar3D',
          data: this.formatDataList(dataList),
          barSize: 1,
          itemStyle: {
            opacity: 0.3,
          },
        },
        {
          type: 'scatter3D',
          data: this.formatScatterList(scatterList),
          symbol:
            'path://M512.341333 799.274667c-164.522667-183.424-246.741333-329.216-246.741333-437.333334 0-162.218667 110.464-241.493333 246.741333-241.493333 136.234667 0 246.698667 79.317333 246.698667 241.450667 0 108.117333-82.261333 253.866667-246.698667 437.418666z m0-313.258667c75.690667 0 137.002667-58.453333 137.002667-130.56s-61.312-130.56-137.002667-130.56c-75.690667 0-137.045333 58.453333-137.045333 130.56s61.354667 130.56 137.045333 130.56z m-170.666666 155.733333l38.272 36.992c-71.424 16.896-118.954667 46.976-118.954667 81.322667 0 52.906667 112.384 95.658667 250.965333 95.658667 138.624 0 251.008-42.837333 251.008-95.658667 0-33.962667-46.506667-63.786667-116.650666-80.725333l38.016-36.864c77.909333 25.941333 128.853333 68.906667 128.853333 117.589333 0 79.274667-134.826667 143.445333-301.226667 143.445333-166.314667 0-301.141333-64.170667-301.141333-143.36 0-49.152 51.84-92.501333 130.901333-118.4h-0.042666z',
          symbolSize: +symbolSize,
          label: {
            show: true,
            distance: 0,
            position: 'top',
            formatter: (params) => {
              return params.name || params.value[2]
            },
          },
        },
      ],
    }
    if (debugMode === 'false') {
      option.grid3D = {
        ...option.grid3D,
        ...{
          axisLine: {
            lineStyle: {
              opacity: 0,
            },
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisPointer: {
            show: false,
          },
        },
      }
      option.xAxis3D = {
        ...option.xAxis3D,
        show: false,
        name: '',
      }
      option.yAxis3D = {
        ...option.yAxis3D,
        show: false,
        name: '',
      }
      option.zAxis3D = {
        ...option.zAxis3D,
        show: false,
        name: '',
      }
      option.visualMap = {
        ...option.visualMap,
        show: false,
      }
    }
    this.glChart.setOption(option)

    this.glChart.on('click', (params) => {
      const newParams = _.pick(params, ['color', 'value', 'data', 'event', 'seriesType', 'name'])
      this.runCode('onClick', '点击事件执行错误', newParams)
    })
  }

  //instance function
  getDataList = () => {
    return this.state.dataList
  }

  setDataList = (list) => {
    if (Array.isArray(list)) {
      this.setState({
        dataList: list,
      })
    }
  }

  render() {
    const { backgroundColor } = this.state
    return (
      <div
        style={{ height: '100%', width: '100%', background: backgroundColor }}
        ref={this.mapRef}
      ></div>
    )
  }
}

export default CustomComp
