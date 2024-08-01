import React, { Component, createRef } from 'react';
import Highcharts from './highcharts'
import Sankey from './sankey'
import TimeLine from './timeline' //时序图插件

TimeLine(Highcharts)

class CustomComp extends Component {
    constructor(props) {
        super(props)
        const config = props?.data?._attrObject.data || {}
        console.log('map this.props config', config)
        this.mapRef = createRef(null)
        this.interval = null
        this.mapChart = null
        this.state = {
            events: config?.events || [],
            service: config?.object?.dynamicDataSource || {}, //数据源
            theme: config?.theme?.value || "blue",//主题
            inverted: config?.inverted?.value || "false",//图表方向
            backgroundColor: config?.backgroundColor?.color || '#0D2C6900', //背景颜色
            linkColor: config?.linkColor?.color || '#2A2A2A', //连线颜色
            linkLineWidth: config?.linkLineWidth?.value || 1, //连线宽度
            borderColor: config?.borderColor?.color || '#2479EF',//卡片边框颜色
            labelColor: config?.labelColor?.color || '#f0f0f0', //内容文字颜色
            chartTitle: config?.chartTitle?.value || '时序图', //标题
            titleFontColor: config?.titleFontColor?.color || '#000000', //标题颜色
            subTitle: config?.subTitle?.value || '时序图', //副标题
            subTitleFontColor: config?.subTitleFontColor?.color || '#000000', //副标题颜色
            nodeWidth: config?.nodeWidth?.value || '60', //卡片高度
            setColors: config?.setColors || [], //颜色序列
            colorByPoint: config?.colorByPoint?.value || "true",//使用默认全局配色
            toolTip: config?.toolTip?.value || "true",//提示框显示
            toolTipBackgroundColor: config?.toolTipBackgroundColor?.color || '#FFFFFF',   // 背景颜色
            toolTipBorderColor: config?.toolTipBorderColor?.color || '#3EE6F8',         // 边框颜色
            toolTipFontColor: config?.toolTipFontColor?.color || '#000000',        // 边框颜色
            toolTipBorderRadius: config?.toolTipBorderRadius?.value || 6,             // 边框圆角
            toolTipBorderWidth: config?.toolTipBorderWidth?.value || 1,               // 边框宽度
            toolTipShadow: config?.toolTipShadow?.value || "true",                 // 是否显示阴影
            dataList: [],
            cardVisible: false,
            offsetX: 0,
            offsetY: 0,
            chartOption: {},
            clickItem: {}
        }
    }
    componentDidMount() {
        scriptUtil.registerReactDom(this, this.props) //注册组件实例
        if (this.props.isDesign) {
            console.log('组态期')
            this.setState({
                dataList:mockList
            })
            
            this.chartLoad()
            return
        }
        this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')
        if (!_.isEmpty(this.state.service)) { //数据源判断 取值
            this.getServiceData().then(() => {
                this.chartLoad()
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevState.dataList, this.state.dataList)) {
            if (this.mapChart) {
                this.mapChart.legend.destroy()
                if (this.props.isDesign) {
                    this.chartLoad()
                    
                    return
                }
            }
        }

    }

    componentWillUnmount() {
        if (this.mapChart) {
            this.mapChart.legend.destroy()
        }
    }

    //图表加载
    chartLoad = () => {
        const {
            theme, //主题
            backgroundColor, //背景颜色
            borderColor,//卡片边框颜色
            labelColor, //内容文字颜色
            chartTitle, //标题内容
            titleFontColor, //标题颜色
            subTitle, //副标题内容
            subTitleFontColor, //副标题颜色
            setColors, //颜色序列
            toolTip,//提示框显示
            inverted,//是否反转图表
            toolTipBackgroundColor,  // 背景颜色
            toolTipBorderColor,      // 边框颜色
            toolTipBorderRadius,     // 边框圆角
            toolTipBorderWidth,      // 边框宽度
            toolTipShadow,           // 边框宽度
            toolTipFontColor,         //文字颜色
            dataList
        } = this.state
        var _this = this
        let color = null
        // 获取颜色配置
        if(setColors.length == 0){
            color = colorList[theme]
        }else{
            color = setColors.map(i => i.content)
        }
        const chartOption = {
            chart: {
                type: 'timeline',
                inverted: JSON.parse(inverted),
                backgroundColor: backgroundColor
            },
            xAxis: {
                visible: false
            },
            yAxis: {
                visible: false
            },
            title: chartTitle.length == 0 ? false : {
                text: chartTitle,
                style: {
                    color: titleFontColor
                }
            },
            subtitle: {
                text: subTitle,
                style: {
                    color: subTitleFontColor
                }
            },
            colors: color,
            series: [{
                data: dataList,
                dataLabels: {
                    color: labelColor,
                    borderColor: borderColor
                },

            }],
            tooltip: JSON.parse(toolTip) ? {
                backgroundColor: toolTipBackgroundColor,   // 背景颜色
                borderColor: toolTipBorderColor,         // 边框颜色
                borderRadius: toolTipBorderRadius,             // 边框圆角
                borderWidth: toolTipBorderWidth,               // 边框宽度
                shadow: JSON.parse(toolTipShadow),                 // 是否显示阴影
                outside: true,
                style: {
                    color: toolTipFontColor,
                    zIndex: 100
                }
            } : false,
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function (event) {
                            _this.setPointHandle()
                        }
                    }
                }
            },
            credits: { enabled: false }
        }
        //将当前配置项保存至state
        this.setState({
            chartOption: chartOption
        })
        this.mapChart = Highcharts.chart(this.mapRef.current, chartOption);
    }

    // 图表点击事件    
    setPointHandle = (e) => {
        this.runCode('onClick', '点击事件脚本错误,请打开控制台查看错误信息');
    }

    getValue = () => {
        return { dataList: this.state.dataList }
    }

    runCode = (key, msg) => {
        const { events } = this.state
        events.forEach((item) => {
            if (item.content === key) {
                this.runScript(item.detail, msg)
            }
        })
    }

    // 脚本运行器
    runScript = (codeStr, message) => {
        try {
            const _this = this
            //new function中codeStr脚本可以通过固定的_this来获取当前组件的this
            new Function('_this', codeStr)(_this)
            console.log()
        } catch (error) {
            console.error(error)
            notification.error({
                message: '可编程组件',
                description: message,
            })
        }
    }

    //获取后台服务返回的值
    getServiceData = () => {
        const _this = this
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
        return new Promise((resolve, reject) => {
            scriptUtil.executeScriptService({
                objName, // 模板 或者 实例
                serviceName, // 服务的命名空间+服务别名
                // 入参
                params,
                version: 'V2',
                // 回调函数
                cb: (res) => {
                    const resData = res.data.list
                    _this.setState({
                        dataList:resData
                    })
                    resolve('ok')
                },
            })
        });
    }

    //设置数据项
    setSource = (data) => {
        const chartOption = this.state.chartOption
        chartOption.series[0].data = data
        this.setState({
            chartOption: chartOption,
            dataList:data
        })
        this.mapChart.series[0].update({
            data: data
        })
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%' }}>
                <div style={{ height: '100%', width: '100%' }} ref={this.mapRef}></div>
            </div>
        );
    }
}

export default CustomComp;

const colorList = {
    blue: ['#2196f3', '#1e88e5', '#1565c0', '#2962ff', '#0d47a1', '#363C46'],
    teal: ['#b2dfdb', '#4db6ac', '#009688', '#00796b', '#00695c', '#004d40'],
    green: ['#c8e6c9', '#81c784', '#66bb6a', '#43a047', '#2e7d32', '#1b5e20'],
    yellow: ['#fff9c4', '#fff176', '#ffeb3b', '#fdd835', '#fbc02d', '#f57f17'],
    orange: ['#ffcc80', '#ffb74d', '#ff9800', '#f57c00', '#ef6c00', '#e65100']
}
const mockList = [{
    name: '首次生物',
    label: '1951：第一批太空犬',
    description: '1951年7月22日第一批狗（Dezik 和 Tsygan）送上太空'
}, {
    name: '人造卫星',
    label: '1957: 第一颗人造卫星',
    description: '1957年十月4日，发射第一颗人造卫星，第一次接收到来自太空的信号'
}, {
    name: '载人航天',
    label: '1961：首次载人航天(尤里加加林)',
    description: '首次载人航天(尤里加加林)，首次载人轨道飞行'
}, {
    name: '登陆月球',
    label: '1969：人类首次登陆月球',
    description: 'First human on the Moon, and first space launch from a celestial body other than the Earth. First sample return from the Moon'
}, {
    name: '空间站',
    label: '1971: 第一个太空空间站',
    description: 'Salyut 1 was the first space station of any kind, launched into low Earth orbit by the Soviet Union on April 19, 1971.'
}, {
    name: '阿波罗-联盟号试验计划',
    label: '1975: First multinational manned mission',
    description: 'The mission included both joint and separate scientific experiments, and provided useful engineering experience for future joint US–Russian space flights, such as the Shuttle–Mir Program and the International Space Station.'
}]