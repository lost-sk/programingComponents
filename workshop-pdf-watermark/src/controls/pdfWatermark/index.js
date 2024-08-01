import React, { Component } from 'react'
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib'
class CustomComp extends Component {
  constructor(props) {
    super(props)
    console.log('rate this.props', this.props)
    const config = props?.data?._attrObject.data || {}
    this.interval = null
    this.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      interval: config?.interval?.value || '0', //定时刷新时间
      isDesign: props.isDesign === true ? true : false,
      backgroundColor: config?.backgroundColor?.color || '',
      dataList: [], //服务返回存放
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.dataList, this.state.dataList)) {
      //TODO 数据变化后处理
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
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

  getValue = () => {
    return this.state.value
  }

  setValue = (value) => {
    this.setState({ value })
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

  // 添加水印并生成新的PDF数据
  addWatermark = async (pdfData) => {
    try {
      const pdfDoc = await PDFDocument.load(pdfData)
      const pages = pdfDoc.getPages()
      const fontSize = 20
      const watermarkText = `Custom Name - ${new Date().toISOString().split('T')[0]}`

      for (const page of pages) {
        const { width, height } = page.getSize()
        const text = pdfDoc.registerFontkit(StandardFonts.Helvetica)
        page.drawText(watermarkText, {
          x: width / 4,
          y: height / 4,
          size: fontSize,
          font: text,
          color: rgb(0.5, 0.5, 0.5),
          rotate: degrees(45),
        })
      }

      const watermarkedPdfBytes = await pdfDoc.save()
      setWatermarkedPdfData(watermarkedPdfBytes)
    } catch (error) {
      console.error('Error adding watermark:', error)
    }
  }

  render() {
    return <div>Hello World</div>
  }
}

export default CustomComp
