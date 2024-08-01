import React, { Component, createRef } from 'react'

import Highcharts from './highcharts'
import WordCloud from './wordcloud'
WordCloud(Highcharts)

// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
// }

const text =
  'quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.'
const textData = text.split(/[,\. ]+/g).reduce(function (arr, word) {
  var obj = arr.find(function (obj) {
    return obj.name === word
  })
  if (obj) {
    obj.weight += 1
  } else {
    obj = {
      name: word,
      weight: 1,
    }
    arr.push(obj)
  }
  return arr
}, [])

class CustomComp extends Component {
  constructor(props) {
    super(props)

    this.mapRef = createRef(null)
    this.mapChart = null
    this.interval = null

    const config = props?.data?._attrObject.data || {}
    this.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      isDesign: props.isDesign === true ? true : false,
      wordList: props.isDesign === true ? textData : [],
      interval: config?.interval?.value || '0',
      backgroundColor: config?.backgroundColor?.color || '',
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')

    const { wordList, interval, service, backgroundColor } = this.state
    this.mapChart = new Highcharts.Chart(this.mapRef.current, {
      series: [
        {
          type: 'wordcloud',
          data: wordList,
          events: {
            click: (e) => {
              this.runCode('onClick', '点击事件执行错误', e.point.options)
            },
          },
        },
      ],
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      chart: {
        backgroundColor,
      },
    })

    if (Number.isInteger(+interval) && +interval > 0) {
      this.interval = setInterval(() => {
        if (!_.isEmpty(service)) {
          this.execService(service, 'wordList')
        }
      }, +interval * 1000)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.wordList, this.state.wordList) && this.mapChart !== null) {
      this.mapChart.series[0].setData(this.state.wordList)
    }
  }

  componentWillUnmount() {
    if (this.mapChart) {
      this.mapChart.destroy()
    }
    if (this.interval) {
      clearInterval(this.interval)
    }
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

  runCode = (key, msg, params) => {
    const { events = [] } = this.state
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

  render() {
    return <div style={{ height: '100%', width: '100%' }} ref={this.mapRef}></div>
  }
}

export default CustomComp
