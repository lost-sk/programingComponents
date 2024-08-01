import React, { Component, createRef } from 'react'

import * as echarts from 'echarts'
import 'echarts-wordcloud'
import _ from 'lodash'
const scriptUtil = {
  registerReactDom: () => {},
}

class CustomComp extends Component {
  constructor(props) {
    super(props)
    console.log('wordCloud this.props', this.props)
    this.mapRef = createRef(null)
    this.mapChart = null
    const config = props?.data?._attrObject.data || {}
    this.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')

    this.mapChart = echarts.init(this.mapRef.current)

    const option = {
      tooltip: {},
      series: [
        {
          type: 'wordCloud',
          // size of the grid in pixels for marking the availability of the canvas
          // the larger the grid size, the bigger the gap between words.
          gridSize: 20,
          sizeRange: [12, 80],
          rotationRange: [-90, 90],
          rotationStep: 90,
          //shape: 'circle',
          width: '100%',
          height: '100%',
          // if the font size is too large for the text to be displayed,
          // whether to shrink the text. If it is set to false, the text will
          // not be rendered. If it is set to true, the text will be shrinked.
          // This option is supported since echarts-wordcloud@2.1.0
          shrinkToFit: true,
          textStyle: {
            color: function () {
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(',') +
                ')'
              )
            },
          },
          data: [
            {
              name: 'Sam S Club',
              value: 80,
              textStyle: {
                color: 'black',
              },
            },
            {
              name: 'Macys',
              value: 50,
            },
            {
              name: 'Amy Schumer',
              value: 30,
            },
            {
              name: 'Jurassic World',
              value: 30,
            },
            {
              name: 'Charter Communications',
              value: 18,
            },
            {
              name: 'Chick Fil A',
              value: 12,
            },
            {
              name: 'Planet Fitness',
              value: 40,
            },
            {
              name: 'Pitch Perfect',
              value: 59,
            },
            {
              name: 'Express',
              value: 43,
            },
            {
              name: 'Home',
              value: 26,
            },
            {
              name: 'Johnny Depp',
              value: 47,
            },
            {
              name: 'Lena Dunham',
              value: 52,
            },
            {
              name: 'Lewis Hamilton',
              value: 55,
            },
            {
              name: 'KXAN',
              value: 50,
            },
            {
              name: 'Mary Ellen Mark',
              value: 42,
            },
            {
              name: 'Farrah Abraham',
              value: 36,
            },
            {
              name: 'Rita Ora',
              value: 36,
            },
            {
              name: 'Serena Williams',
              value: 28,
            },
            {
              name: 'NCAA baseball tournament',
              value: 23,
            },
            {
              name: 'Point Break',
              value: 26,
            },
          ],
        },
      ],
    }

    this.mapChart.setOption(option)
  }

  runCode = (key, msg) => {
    const events = _.get(this.state, 'config.events', [])
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

  onChange = (value) => {
    this.setState({ value }, () => {
      this.runCode('onChange', '内容改变事件脚本错误,请打开控制台查看错误信息')
    })
  }

  render() {
    return <div style={{ height: '100%', width: '100%' }} ref={this.mapRef}></div>
  }
}

export default CustomComp
