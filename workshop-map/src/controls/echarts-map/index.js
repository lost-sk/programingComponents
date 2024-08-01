import React, { Component, createRef } from 'react'
import { message } from 'antd'
import * as eCharts from './echarts'
import geoJSON from './geoJSONWithCity'
import geoMap from './geoMapWithCenter'

// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
//   executeScriptService: () => {},
// }

const mapData = [
  { name: '北京市', city: '北京', latitude: [116.4074, 39.9042] },
  { name: '天津市', city: '天津', latitude: [117.2008, 39.0842] },
  { name: '河北省', city: '石家庄', latitude: [114.5149, 38.0428] },
  { name: '山西省', city: '太原', latitude: [112.5489, 37.8706] },
  { name: '内蒙古自治区', city: '呼和浩特', latitude: [111.6708, 40.8183] },
  { name: '辽宁省', city: '沈阳', latitude: [123.4315, 41.8057] },
  { name: '吉林省', city: '长春', latitude: [125.3235, 43.8171] },
  { name: '黑龙江省', city: '哈尔滨', latitude: [126.5349, 45.8038] },
  { name: '上海市', city: '上海', latitude: [121.4737, 31.2304] },
  { name: '江苏省', city: '南京', latitude: [118.7969, 32.0603] },
  { name: '浙江省', city: '杭州', latitude: [120.1551, 30.2741] },
  { name: '安徽省', city: '合肥', latitude: [117.2272, 31.8206] },
  { name: '福建省', city: '福州', latitude: [119.2965, 26.0745] },
  { name: '江西省', city: '南昌', latitude: [115.8921, 28.6765] },
  { name: '山东省', city: '济南', latitude: [117.1205, 36.6519] },
  { name: '河南省', city: '郑州', latitude: [113.6254, 34.7466] },
  { name: '湖北省', city: '武汉', latitude: [114.3054, 30.5931] },
  { name: '湖南省', city: '长沙', latitude: [112.9388, 28.2282] },
  { name: '广东省', city: '广州', latitude: [113.2644, 23.1291] },
  { name: '广西壮族自治区', city: '南宁', latitude: [108.3661, 22.8172] },
  { name: '海南省', city: '海口', latitude: [110.3312, 20.0311] },
  { name: '重庆市', city: '重庆', latitude: [106.5516, 29.563] },
  { name: '四川省', city: '成都', latitude: [104.0665, 30.5723] },
  { name: '贵州省', city: '贵阳', latitude: [106.6302, 26.6477] },
  { name: '云南省', city: '昆明', latitude: [102.7123, 25.0406] },
  { name: '西藏自治区', city: '拉萨', latitude: [91.1409, 29.6456] },
  { name: '陕西省', city: '西安', latitude: [108.9402, 34.3416] },
  { name: '甘肃省', city: '兰州', latitude: [103.8236, 36.0581] },
  { name: '青海省', city: '西宁', latitude: [101.7782, 36.6171] },
  { name: '宁夏回族自治区', city: '银川', latitude: [106.2586, 38.4879] },
  { name: '新疆维吾尔自治区', city: '乌鲁木齐', latitude: [87.6177, 43.7928] },
  { name: '台湾省', city: '台北', latitude: [121.5654, 25.033] },
  { name: '香港特别行政区', city: '香港', latitude: [114.1694, 22.3193] },
  { name: '澳门特别行政区', city: '澳门', latitude: [113.5491, 22.1987] },
]

const labelMapData = [
  { name: '全国' },
  { name: '河北省', city: '石家庄', latitude: [114.5149, 38.0428] },
  { name: '山西省', city: '太原', latitude: [112.5489, 37.8706] },
  { name: '内蒙古自治区', city: '呼和浩特', latitude: [111.6708, 40.8183] },
  { name: '辽宁省', city: '沈阳', latitude: [123.4315, 41.8057] },
  { name: '吉林省', city: '长春', latitude: [125.3235, 43.8171] },
  { name: '黑龙江省', city: '哈尔滨', latitude: [126.5349, 45.8038] },
  { name: '江苏省', city: '南京', latitude: [118.7969, 32.0603] },
  { name: '浙江省', city: '杭州', latitude: [120.1551, 30.2741] },
  { name: '安徽省', city: '合肥', latitude: [117.2272, 31.8206] },
  { name: '福建省', city: '福州', latitude: [119.2965, 26.0745] },
  { name: '江西省', city: '南昌', latitude: [115.8921, 28.6765] },
  { name: '山东省', city: '济南', latitude: [117.1205, 36.6519] },
  { name: '河南省', city: '郑州', latitude: [113.6254, 34.7466] },
  { name: '湖北省', city: '武汉', latitude: [114.3054, 30.5931] },
  { name: '湖南省', city: '长沙', latitude: [112.9388, 28.2282] },
  { name: '广东省', city: '广州', latitude: [113.2644, 23.1291] },
  { name: '广西壮族自治区', city: '南宁', latitude: [108.3661, 22.8172] },
  { name: '海南省', city: '海口', latitude: [110.3312, 20.0311] },
  { name: '四川省', city: '成都', latitude: [104.0665, 30.5723] },
  { name: '贵州省', city: '贵阳', latitude: [106.6302, 26.6477] },
  { name: '云南省', city: '昆明', latitude: [102.7123, 25.0406] },
  { name: '西藏自治区', city: '拉萨', latitude: [91.1409, 29.6456] },
  { name: '陕西省', city: '西安', latitude: [108.9402, 34.3416] },
  { name: '甘肃省', city: '兰州', latitude: [103.8236, 36.0581] },
  { name: '青海省', city: '西宁', latitude: [101.7782, 36.6171] },
  { name: '宁夏回族自治区', city: '银川', latitude: [106.2586, 38.4879] },
  { name: '新疆维吾尔自治区', city: '乌鲁木齐', latitude: [87.6177, 43.7928] },
]

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
function debounce(func, wait) {
  let timeout
  return function () {
    const context = this
    const args = arguments

    clearTimeout(timeout)
    timeout = setTimeout(function () {
      func.apply(context, args)
    }, wait)
  }
}

function filterGeoData(geodata, city = false) {
  const features = geodata.features
  const filtetFeatures = features.filter((v) => {
    if (v.properties.level === 'city') {
      return city ? true : false
    }
    if (v.properties.level === 'district') {
      return false
    }
    return true
  })

  return { ...geodata, features: filtetFeatures }
}
const provinceGeo = filterGeoData(geoJSON)
const cityGeo = filterGeoData(geoJSON, true)

class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('map this.props config', config)
    this.mapRef = createRef(null)
    this.interval = null
    this.mapChart = null
    this.state = {
      cityMap: false,
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      flyService: config?.flyObject?.dynamicDataSource || {},
      backgroundColor: config?.backgroundColor?.color || '#0D2C69',
      areaColor: config?.areaColor?.color || '#255EA7',
      borderColor: config?.borderColor?.color || '#0C2B69',
      cityColor: config?.cityColor?.color || '#FFFFFF',
      normalColor: config?.normalColor?.color || '#67C23A',
      warnColor: config?.warnColor?.color || '#E6A23C',
      errorColor: config?.errorColor?.color || '#F56C6C',
      tooltipColor: config?.tooltipColor?.color || '#f0f0f0',
      zoom: config?.zoom?.value || '1.33',
      center: config?.center?.value || '107,33',
      scale: config?.scale?.value || 'enable',
      move: config?.move?.value || 'enable',
      trigger: config?.trigger?.value || 'click',
      symbolSize: config?.symbolSize?.value || '20',
      interval: config?.interval?.value || '0',
      dataList: [],
      //dataList: [{ total: 22, name: '杭州', lng: 120.15, lat: 30.265 }],
      innerHtml: config?.htmlDetail || '',
      cardVisible: false,
      offsetX: 0,
      offsetY: 0,
      cardData: {},
      showFly: config?.showFly?.value || 'enable',
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
      symbolSize,
      trigger,
      flyDataList,
      service,
      flyService,
      showFly,
    } = this.state

    scriptUtil.registerReactDom(this, this.props)
    if (!_.isEmpty(service)) {
      this.execService(service, 'dataList')
    }

    if (!_.isEmpty(flyService) && showFly === 'enable') {
      this.execService(flyService, 'flyDataList')
    }

    this.mapChart = eCharts.init(this.mapRef.current)
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')

    eCharts.registerMap('provinces', provinceGeo)
    eCharts.registerMap('cities', cityGeo)

    let roam = false
    if (scale === 'enable' && move === 'enable') {
      roam = true
    } else {
      if (scale === 'enable') roam = 'scale'
      if (move === 'enable') roam = 'move'
    }
    const chartOption = {
      backgroundColor,
      tooltip: {
        trigger: 'item',
        triggerOn: trigger,
      },
      geo: [
        {
          map: 'provinces',
          //map: 'cities',
          roam,
          zoom: +zoom,
          center: center.split(','),
          tooltip: {
            show: false,
          },
          emphasis: {
            disabled: true,
          },
          itemStyle: {
            areaColor,
            borderColor,
          },
        },
      ],
      dataset: { source: dataList },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin',
          symbolSize: 0,
          label: {
            show: true,
            formatter: '{b}',
            position: 'right',
            offset: [-5, 0],
            color: cityColor,
            fontSize: 10,
          },
          tooltip: {
            show: false,
          },
          animation: false,
          data: mapData.map(function (item) {
            return {
              name: item.city,
              value: item.latitude,
            }
          }),
        },
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          //symbol: 'pin',
          symbol:
            'path://M512.341333 799.274667c-164.522667-183.424-246.741333-329.216-246.741333-437.333334 0-162.218667 110.464-241.493333 246.741333-241.493333 136.234667 0 246.698667 79.317333 246.698667 241.450667 0 108.117333-82.261333 253.866667-246.698667 437.418666z m0-313.258667c75.690667 0 137.002667-58.453333 137.002667-130.56s-61.312-130.56-137.002667-130.56c-75.690667 0-137.045333 58.453333-137.045333 130.56s61.354667 130.56 137.045333 130.56z m-170.666666 155.733333l38.272 36.992c-71.424 16.896-118.954667 46.976-118.954667 81.322667 0 52.906667 112.384 95.658667 250.965333 95.658667 138.624 0 251.008-42.837333 251.008-95.658667 0-33.962667-46.506667-63.786667-116.650666-80.725333l38.016-36.864c77.909333 25.941333 128.853333 68.906667 128.853333 117.589333 0 79.274667-134.826667 143.445333-301.226667 143.445333-166.314667 0-301.141333-64.170667-301.141333-143.36 0-49.152 51.84-92.501333 130.901333-118.4h-0.042666z',
          symbolSize: +symbolSize,
          itemStyle: {
            color: (params) => {
              if (params?.data?.status) {
                switch (params.data.status) {
                  case 'error':
                    return errorColor
                  case 'warn':
                    return warnColor
                  default:
                    return normalColor
                }
              }
              return normalColor
            },
          },
          dimensions: ['name', 'lng', 'lat'],
          encode: {
            lng: 'lng',
            lat: 'lat',
          },
          tooltip: {
            show: innerHtml.length === 0 ? true : false,
            backgroundColor: tooltipColor,
            formatter: (params) => {
              const { data } = params
              const t = _.omit(data, ['lng', 'lat', 'status'])
              let str = ''
              for (let key in t) {
                str += `${key}:${t[key]}<br>`
              }
              return '<p>' + str + '</p>'
            },
          },
        },
        {
          type: 'lines',
          coordinateSystem: 'geo',
          effect: {
            show: true,
            period: 4,
            trailLength: 0.5, // 轨迹尾迹的长度
            symbol: 'arrow',
            symbolSize: 6,
          },
          animationDuration: 2000,
          lineStyle: {
            opacity: 0,
            color: (params) => myColor[params.dataIndex],
            curveness: 0.2,
          },
          data: this.format2LinesData(flyDataList),
        },
      ],
    }
    this.mapChart.setOption(chartOption)

    this.mapChart.on('click', (params) => {
      const { cardVisible } = this.state
      if (params.seriesType === 'scatter' && params.seriesIndex === 1) {
        if (cardVisible === false) {
          this.setState({
            cardVisible: true,
            offsetX: params.event.offsetX,
            offsetY: params.event.offsetY,
            cardData: params.data || params.value,
          })
        } else {
          this.setState({
            offsetX: params.event.offsetX,
            offsetY: params.event.offsetY,
            cardData: params.data || params.value,
          })
        }
      } else {
        if (cardVisible) {
          this.setState({
            cardVisible: false,
          })
        }
      }
    })

    const debounceFunc = debounce((zoom, cityMap, series) => {
      console.log('debounceFunc', zoom, cityMap)
      if (zoom > 5 && cityMap === false) {
        this.setState({ cityMap: true })
        series[0].data = []

        this.mapChart.setOption(
          {
            geo: {
              map: 'cities',
              roam: false,
              label: {
                show: true,
                color: cityColor,
                formatter: (params) => {
                  if (labelMapData.findIndex((m) => m.name === params.name) !== -1) {
                    return ''
                  }
                  return params.name
                },
              },
            },
            series,
          },
          {
            lazyUpdate: true,
          }
        )
        setTimeout(() => {
          this.mapChart.setOption({
            geo: {
              roam,
            },
          })
        }, 800)
      }
      if (zoom <= 5 && cityMap === true) {
        this.setState({ cityMap: false })
        series[0].data = mapData.map(function (item) {
          return {
            name: item.city,
            value: item.latitude,
          }
        })

        this.mapChart.setOption(
          {
            geo: {
              map: 'provinces',
              roam: false,
              label: {
                show: false,
              },
            },
            series,
          },
          {
            lazyUpdate: true,
          }
        )
        setTimeout(() => {
          this.mapChart.setOption({
            geo: {
              roam,
            },
          })
        }, 800)
      }
    }, 400)

    this.mapChart.on('georoam', (params) => {
      if (params.originX) {
        const { series, geo } = this.mapChart.getOption()
        const { cityMap } = this.state
        debounceFunc(geo[0].zoom, cityMap, series)
      }
    })

    if (+interval > 0) {
      this.interval = setInterval(() => {
        if (!_.isEmpty(service)) {
          this.execService(service, 'dataList')
        }
      }, +interval * 1000)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.dataList, this.state.dataList)) {
      this.mapChart.setOption({
        dataset: {
          source: this.state.dataList,
        },
      })
    }

    if (!_.isEqual(prevState.flyDataList, this.state.flyDataList)) {
      const { series } = this.mapChart.getOption()
      series[2].data = this.format2LinesData(this.state.flyDataList)
      this.mapChart.setOption(
        {
          series,
        },
        {
          lazyUpdate: true,
        }
      )
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

  format2LinesData = (list) => {
    let linesData = []
    for (let index = 0; index < list.length; index++) {
      const { from, to } = list[index]
      const tempFrom = geoMap.find((g) => g.name.includes(from))
      const tempTo = geoMap.find((g) => g.name.includes(to))
      if (tempFrom === undefined) {
        console.error(`请检查该城市名称：${from}`)
        message.error(`请检查该城市名称：${from}`)
        continue
      }
      if (tempTo === undefined) {
        console.error(`请检查该城市名称：${to}`)
        message.error(`请检查该城市名称：${from}`)
        continue
      }
      linesData.push({
        coords: [tempFrom.center, tempTo.center],
      })
    }
    return linesData
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
