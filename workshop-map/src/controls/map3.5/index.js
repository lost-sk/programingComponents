import React, { Component, createRef } from 'react'
import * as eCharts from './echarts'
import ChinaGeo from './china'

// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
//   executeScriptService: () => {},
// }

const img2 =
  'image://data:image/png;base64,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'

const mapName = 'china'
const mapData = [
  { name: '北京', fullName: '北京市', city: '北京', latitude: [116.4074, 39.9042] },
  { name: '天津', fullName: '天津市', city: '天津', latitude: [117.2008, 39.0842] },
  { name: '河北', fullName: '河北省', city: '石家庄', latitude: [114.5149, 38.0428] },
  { name: '山西', fullName: '山西省', city: '太原', latitude: [112.5489, 37.8706] },
  { name: '内蒙古', fullName: '内蒙古自治区', city: '呼和浩特', latitude: [111.6708, 40.8183] },
  { name: '辽宁', fullName: '辽宁省', city: '沈阳', latitude: [123.4315, 41.8057] },
  { name: '吉林', fullName: '吉林省', city: '长春', latitude: [125.3235, 43.8171] },
  { name: '黑龙江', fullName: '黑龙江省', city: '哈尔滨', latitude: [126.5349, 45.8038] },
  { name: '上海', fullName: '上海市', city: '上海', latitude: [121.4737, 31.2304] },
  { name: '江苏', fullName: '江苏省', city: '南京', latitude: [118.7969, 32.0603] },
  { name: '浙江', fullName: '浙江省', city: '杭州', latitude: [120.1551, 30.2741] },
  { name: '安徽', fullName: '安徽省', city: '合肥', latitude: [117.2272, 31.8206] },
  { name: '福建', fullName: '福建省', city: '福州', latitude: [119.2965, 26.0745] },
  { name: '江西', fullName: '江西省', city: '南昌', latitude: [115.8921, 28.6765] },
  { name: '山东', fullName: '山东省', city: '济南', latitude: [117.1205, 36.6519] },
  { name: '河南', fullName: '河南省', city: '郑州', latitude: [113.6254, 34.7466] },
  { name: '湖北', fullName: '湖北省', city: '武汉', latitude: [114.3054, 30.5931] },
  { name: '湖南', fullName: '湖南省', city: '长沙', latitude: [112.9388, 28.2282] },
  { name: '广东', fullName: '广东省', city: '广州', latitude: [113.2644, 23.1291] },
  { name: '广西', fullName: '广西壮族自治区', city: '南宁', latitude: [108.3661, 22.8172] },
  { name: '海南', fullName: '海南省', city: '海口', latitude: [110.3312, 20.0311] },
  { name: '重庆', fullName: '重庆市', city: '重庆', latitude: [106.5516, 29.563] },
  { name: '四川', fullName: '四川省', city: '成都', latitude: [104.0665, 30.5723] },
  { name: '贵州', fullName: '贵州省', city: '贵阳', latitude: [106.6302, 26.6477] },
  { name: '云南', fullName: '云南省', city: '昆明', latitude: [102.7123, 25.0406] },
  { name: '西藏', fullName: '西藏自治区', city: '拉萨', latitude: [91.1409, 29.6456] },
  { name: '陕西', fullName: '陕西省', city: '西安', latitude: [108.9402, 34.3416] },
  { name: '甘肃', fullName: '甘肃省', city: '兰州', latitude: [103.8236, 36.0581] },
  { name: '青海', fullName: '青海省', city: '西宁', latitude: [101.7782, 36.6171] },
  { name: '宁夏', fullName: '宁夏回族自治区', city: '银川', latitude: [106.2586, 38.4879] },
  { name: '新疆', fullName: '新疆维吾尔自治区', city: '乌鲁木齐', latitude: [87.6177, 43.7928] },
  { name: '台湾', fullName: '台湾省', city: '台北', latitude: [121.5654, 25.033] },
  { name: '香港', fullName: '香港特别行政区', city: '香港', latitude: [114.1694, 22.3193] },
  { name: '澳门', fullName: '澳门特别行政区', city: '澳门', latitude: [113.5491, 22.1987] },
]

const covertMapData = (data) => {
  const res = data.map((item) => ({
    name: item.name,
    value: item.value,
  }))
  return res
}
const lineData = (data, topN = 3) => {
  const res = data
    .sort((a, b) => {
      if (a.value > b.value) return -1
      if (a.value < b.value) return 1
      return 0
    })
    .slice(0, topN)
    .map((item) => ({
      coords: [[...item.latitude], [item.latitude[0], item.latitude[1] + 1.5]],
    }))
  return res
}

const scatterData = (data, topN = 3) => {
  const res = data
    .sort((a, b) => {
      if (a.value > b.value) return -1
      if (a.value < b.value) return 1
      return 0
    })
    .slice(0, topN)
    .map((item) => ({
      name: item.name,
      value: [item.latitude[0], item.latitude[1] + 2, item.value],
    }))
  //console.log('scatterData', res)
  return res
}

const converData = (data, topN = 3) => {
  return data
    .sort((a, b) => {
      if (a.value > b.value) return -1
      if (a.value < b.value) return 1
      return 0
    })
    .slice(0, topN)
    .map((item) => ({ name: item.name, value: [...item.latitude, item.value] }))
}

class CustomComp extends Component {
  constructor(props) {
    super(props)
    let config = {}
    if (props && props.data && props.data._attrObject && props.data._attrObject.data) {
      config = props.data._attrObject.data
    }

    this.mapRef = createRef(null)
    this.interval = null
    this.mapChart = null
    this.state = {
      cityMap: false,
      events: config.events != undefined ? config.events : [],
      service: config.object != undefined ? config.object : {},
      backgroundColor: config.backgroundColor != undefined ? config.backgroundColor : '#0D2C69',
      areaColor: config.areaColor != undefined ? config.areaColor : '#255EA7',
      borderColor: config.borderColor != undefined ? config.borderColor : '#0C2B69',
      cityColor: config.cityColor != undefined ? config.cityColor : '#ffffff',
      normalColor: config.normalColor != undefined ? config.normalColor : '#67C23A',
      warnColor: config.warnColor != undefined ? config.warnColor : '#E6A23C',
      errorColor: config.errorColor != undefined ? config.errorColor : '#F56C6C',
      tooltipColor: config.tooltipColor != undefined ? config.tooltipColor : '#f0f0f0',
      zoom: config.zoom != undefined ? config.zoom : '1.5',
      center: config.center != undefined ? config.center : '107,30',
      scale: config.scale != undefined ? config.scale : 'enable',
      move: config.move != undefined ? config.move : 'enable',
      trigger: config.trigger != undefined ? config.trigger : 'mousemove',
      interval: config.interval != undefined ? config.interval : '0',
      topN: config.topN != undefined ? config.topN : '3',
      dataList: mapData.map((m) => ({ ...m, value: 0 })),
      //dataList: [{ total: 22, name: '杭州', lng: 120.15, lat: 30.265 }],
      innerHtml: config.htmlDetail != undefined ? config.htmlDetail : '',
      cardVisible: false,
      offsetX: 0,
      offsetY: 0,
      cardData: {},
      flyDataList: [],
    }
  }
  componentDidMount() {
    const {
      borderColor,
      areaColor,
      backgroundColor,
      cityColor,
      dataList,
      interval,
      normalColor,
      warnColor,
      errorColor,
      tooltipColor,
      innerHtml,
      zoom,
      center,
      scale,
      move,
      trigger,
      flyDataList,
      service,
      topN,
    } = this.state

    scriptUtil.registerReactDom(this, this.props)
    if (!_.isEmpty(service)) {
      this.execService(service, 'dataList')
    }

    this.mapChart = eCharts.init(this.mapRef.current)
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')

    eCharts.registerMap(mapName, ChinaGeo)

    // let roam = false
    // if (scale === 'enable' && move === 'enable') {
    //   roam = true
    // } else {
    //   if (scale === 'enable') roam = 'scale'
    //   if (move === 'enable') roam = 'move'
    // }

    const chartOption = {
      backgroundColor,
      tooltip: {
        trigger: 'item',
        triggerOn: trigger,
      },
      geo: [
        {
          layoutCenter: ['50%', '50%'], //位置
          layoutSize: '100%', //大小
          show: true,
          map: mapName,
          roam: false,
          zoom,
          aspectScale: 1,
          itemStyle: {
            normal: {
              areaColor: {
                type: 'linear',
                x: 1200,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(3,27,78,0.75)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(58,149,253,0.75)', // 50% 处的颜色
                  },
                ],
                global: true, // 缺省为 false
              },
              borderColor: '#c0f3fb',
              borderWidth: 1,
              shadowColor: '#8cd3ef',
              shadowOffsetY: 10,
              shadowBlur: 120,
            },
            emphasis: {
              areaColor: 'rgba(0,254,233,0.6)',
              // borderWidth: 0
            },
          },
        },
        {
          map: mapName,
          zlevel: -1,
          aspectScale: 1,
          zoom,
          layoutCenter: ['50%', '51%'],
          layoutSize: '100%',
          roam: false,
          silent: true,
          itemStyle: {
            normal: {
              borderWidth: 1,
              // borderColor:"rgba(17, 149, 216,0.6)",
              borderColor: 'rgba(58,149,253,0.8)',
              shadowColor: 'rgba(172, 122, 255,0.5)',
              shadowOffsetY: 5,
              shadowBlur: 15,
              areaColor: 'rgba(5,21,35,0.1)',
            },
          },
        },
        {
          map: mapName,
          zlevel: -2,
          aspectScale: 1,
          zoom,
          layoutCenter: ['50%', '52%'],
          layoutSize: '100%',
          roam: false,
          silent: true,
          itemStyle: {
            normal: {
              borderWidth: 1,
              // borderColor: "rgba(57, 132, 188,0.4)",
              borderColor: 'rgba(58,149,253,0.6)',
              shadowColor: 'rgba(65, 214, 255,1)',
              shadowOffsetY: 5,
              shadowBlur: 15,
              areaColor: 'transpercent',
            },
          },
        },
        {
          map: mapName,
          zlevel: -3,
          aspectScale: 1,
          zoom,
          layoutCenter: ['50%', '53%'],
          layoutSize: '100%',
          roam: false,
          silent: true,
          itemStyle: {
            normal: {
              borderWidth: 1,
              // borderColor: "rgba(11, 43, 97,0.8)",
              borderColor: 'rgba(58,149,253,0.4)',
              shadowColor: 'rgba(58,149,253,1)',
              shadowOffsetY: 15,
              shadowBlur: 10,
              areaColor: 'transpercent',
            },
          },
        },
        {
          map: mapName,
          zlevel: -4,
          aspectScale: 1,
          zoom,
          layoutCenter: ['50%', '54%'],
          layoutSize: '100%',
          roam: false,
          silent: true,
          itemStyle: {
            normal: {
              borderWidth: 5,
              // borderColor: "rgba(11, 43, 97,0.8)",
              borderColor: 'rgba(5,9,57,0.8)',
              shadowColor: 'rgba(29, 111, 165,0.8)',
              shadowOffsetY: 15,
              shadowBlur: 10,
              areaColor: 'rgba(5,21,35,0.1)',
            },
          },
        },
      ],
      series: [
        {
          name: 'chinamap',
          type: 'map',
          map: mapName,
          geoIndex: 0,
          aspectScale: 1, //长宽比
          zoom,
          showLegendSymbol: true,
          roam: false,
          layoutCenter: ['50%', '50%'],
          layoutSize: '100%',
          animation: false,
          tooltip: {
            formatter: function (params) {
              const { data } = params
              if (data.value !== null) {
                return `${data.value}`
              }
              return '暂无数据'
            },
          },
          data: covertMapData(dataList),
        },
        //柱状体的主干
        {
          name: 'topLine',
          type: 'lines',
          zlevel: 5,
          effect: {
            show: false,
            symbolSize: 5, // 图标大小
          },
          lineStyle: {
            width: 6, // 尾迹线条宽度
            color: 'rgba(249, 105, 13, .6)',
            opacity: 1, // 尾迹线条透明度
            curveness: 0, // 尾迹线条曲直度
          },
          label: {
            show: 0,
            position: 'end',
            formatter: '245',
          },
          silent: true,
          data: lineData(dataList, topN),
        },
        // 柱状体的顶部
        {
          name: 'topScatter',
          type: 'scatter',
          coordinateSystem: 'geo',
          geoIndex: 0,
          zlevel: 5,
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                //console.log('params', params)
                return `${params.name} : ${params.value[2]}`
              },
              color: '#fff',
              rich: {
                fline: {
                  // padding: [0, 25],
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                },
                tline: {
                  // padding: [0, 27],
                  color: '#ABF8FF',
                  fontSize: 12,
                },
              },
            },
            emphasis: {
              show: true,
            },
          },
          itemStyle: {
            color: '#00FFF6',
            opacity: 1,
          },
          tooltip: {
            show: false,
          },
          symbol: img2,
          symbolSize: [110, 60],
          symbolOffset: [0, -20],
          z: 999,
          data: scatterData(dataList, topN),
        },
        {
          name: 'topEffectScatter',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: converData(dataList, topN),
          showEffectOn: 'render',
          itemStyle: {
            normal: {
              color: '#00FFFF',
            },
          },
          rippleEffect: {
            scale: 5,
            brushType: 'stroke',
          },
          symbol: 'circle',
          symbolSize: [20, 10],
          itemStyle: {
            normal: {
              color: '#16ffff',
              shadowBlur: 10,
              shadowColor: '#16ffff',
            },
            opacity: 1,
          },
          tooltip: {
            show: false,
          },
          zlevel: 4,
        },
      ],
    }
    this.mapChart.setOption(chartOption)

    if (+interval > 0) {
      this.interval = setInterval(() => {
        if (!_.isEmpty(service)) {
          this.execService(service, 'dataList')
        }
      }, +interval * 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    this.mapChart.dispose()
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
    var params = { pageIndex: 1, pageSize: 100 }
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
        if (attr === 'dataList') {
          const finalList = mapData.map((m) => {
            const findV = res.data.list.find((f) => m.fullName.includes(f['system.dim_0']))
            if (findV) {
              m.value = findV['system.indicator']
            } else {
              m.value = null
            }
            return m
          })
          this.setState({
            [attr]: finalList,
          })
          const topN = this.state.topN || 3
          this.mapChart.setOption({
            series: [
              { name: 'chinamap', data: covertMapData(finalList) },
              { name: 'topLine', data: lineData(finalList, topN) },
              { name: 'topScatter', data: scatterData(finalList, topN) },
              { name: 'topEffectScatter', data: converData(finalList, topN) },
            ],
          })
        } else {
          this.setState({
            [attr]: res.data.list,
          })
        }
      },
    })
  }

  transHtml = (visible, value) => {
    const { innerHtml } = this.state
    if (visible) {
      const regex = /\${(.*?)}/g
      const replacedStr = innerHtml.replace(regex, (match, captured) => {
        return value[captured] || ''
      })
      return replacedStr
    } else {
      return ''
    }
  }

  render() {
    const { cardVisible, offsetX, offsetY, cardData, innerHtml } = this.state
    const visible = innerHtml.length === 0 ? false : cardVisible ? true : false
    const htmlStr = { __html: this.transHtml(visible, cardData) }
    return (
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <div style={{ height: '100%', width: '100%' }} ref={this.mapRef}></div>
        <div
          style={{
            display: visible ? 'block' : 'none',
            position: 'absolute',
            top: offsetY - 15,
            left: offsetX + 15,
            background: 'rgba(255,255,255,0.2)',
          }}
          dangerouslySetInnerHTML={htmlStr}
        ></div>
      </div>
    )
  }
}

export default CustomComp
