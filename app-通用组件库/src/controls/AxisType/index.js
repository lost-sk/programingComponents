import React from 'react';
import scriptUtil from '../assets/externalsUtils';

scriptUtil.load("../assets/highcharts.js");

scriptUtil.use('React', React);

const {
  SupChartReact,
  customComponentConnect
} = scriptUtil;

/*---------------------------------------------------------------------*/
const objName = `tyzuksupos_tyzuksupos.GeneralCompnents`; // 对象实例命名空间.模板别名
const serviceName = `tyzuksupos_tyzuksupos.Line`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/


const myColor = ["#169B84", "#C2940A", "#006aee", "#e16555", "#9e4ad4"];// 线条颜色
const myLabelColor = "#7ADAFF"; //标签文本颜色
const myLineColor = "#4FDCFF"; //x轴线颜色
const myGridLineColor = "#054667"; //网格线颜色

const defaultConfig = {
    chart: {
        backgroundColor: "transparent",
    },
    credits: {
        enabled: false,
    },
    title: {
        style: {
            fontSize: "16px",
            color: "#B7C5DF",
        },
    },
    yAxis: {
        labels: {
            style: {
                color: myLabelColor,
                fontSize: "1.6em",
            },
        },
        gridLineColor: myGridLineColor,
    },
    xAxis: {
        tickLength: 0,
        labels: {
            style: {
                color: myLabelColor,
                fontSize: "1.6em",
            },
        },
        lineColor: myLineColor,
    },
    legend: {
        itemStyle: {
            color: myLabelColor,
        },
    },
};
const options = {
    chart: {
        type: "line",
    },
    title: {
        text: '主标题',
        enabled: true,
    },
    exporting: {
        enabled: false,
    },
    yAxis: {
        allowDecimals: false,
        gridLineDashStyle: "Dash",
    },
    colors: myColor,

};

const data1 = [
    {
        "data": [
            38,
            39,
            40,
            60,
            70,
            80,
            86
        ],
        "name": "2019"
    },
    {
        "data": [
            98,
            80,
            60,
            70,
            80,
            85,
            50
        ],
        "name": "2020"
    }
]

const data2 = [
    {
        "data": [
            {
                y: 38,
                x: Date.now()
            },
            {
                y: 39,
                x: new Date().getTime() + 1000 * 60 * 24
            },
            {
                y: 40,
                x: new Date().getTime() + 1000 * 60 * 24 * 2
            }, {
                y: 60,
                x: new Date().getTime() + 1000 * 60 * 24 * 3
            },
            {
                y: 80,
                x: new Date().getTime() + 1000 * 60 * 24 * 4
            }, {
                y: 40,
                x: new Date().getTime() + 1000 * 60 * 24 * 5
            }, {
                y: 70,
                x: new Date().getTime() + 1000 * 60 * 24 * 6
            }, {
                y: 29,
                x: new Date().getTime() + 1000 * 60 * 24 * 7
            }
        ],
        "name": "2019"
    },
]

const data3 = [
    {
        "data": [
            {
                y: 38,
                name: '一月'
            },
            {
                y: 39,
                name: '二月'
            },
            {
                y: 40,
                name: '三月'
            }, {
                y: 60,
                name: '四月'
            },
            {
                y: 80,
                name: '五月'
            }, {
                y: 40,
                name: '六月'
            }, {
                y: 70,
                name: '七月'
            }, {
                y: 29,
                name: '八月'
            }
        ],
        "name": "2019"
    },
]

const data4 = [
    {
        "data": [
            {
                y: 38,
                name: '一月'
            },
            {
                y: 39,
                name: '二月'
            },
            {
                y: 40,
                name: '三月'
            }, {
                y: 60,
                name: '四月'
            },
            {
                y: 80,
                name: '五月'
            }, {
                y: 40,
                name: '六月'
            }, {
                y: 70,
                name: '七月'
            }, {
                y: 29,
                name: '八月'
            }
        ],
        "name": "2019"
    },
]

const Demo = () => {
    const [ops, setOps] = React.useState(
        _.merge({}, defaultConfig, options)
    );

    // 线性轴。默认类型，x轴按照 Axis.tickInterval 值增长，y轴默认是自适应。
    const ops1 = _.merge({}, ops, {
        title: {
            text: "线性轴"
        },
        xAxis: {
            type: 'linear',

        },
        series: data1,
    })

    // 时间轴。时间使用和Javascript 日期对象一样，即用一个距1970年1月1日0时0分0秒的毫秒数表示时间，也就是时间戳。
    // 注意： 时间轴是等距轴，轴上时间坐标和点不一定一一对应，坐标点的时间不能倒退，否则会导致线条交叉
    // 通常需要配合格式化函数操作,放开下面注释看效果 https://bbs.hcharts.cn/article-124-1.html
    const ops2 = _.merge({}, ops, {
        title: {
            text: "时间轴"
        },
        xAxis: {
            type: 'datetime',
            // labels:{
            //     formatter(item){
            //         return Highcharts.dateFormat('%Y %H:%M:%S',item.value)
            //     }
            // }
        },
        series: data2,
    })

    // 最常用的坐标轴
    // 注意： 数据的值（如果是对象形式就是y的值）必须为数字。

    const ops3 = _.merge({}, ops, {
        title: {
            text: "数组轴"
        },
        xAxis: {
            type: 'category',
        },
        series: data3,
    })

    const ops4 = _.merge({}, ops, {
        title: {
            text: "带格式化函数的数组轴"
        },
        xAxis: {
            type: 'category',
            labels: {
                formatter(item) {
                    return item.value + "🍎"
                }
            }
        },
        series: data4,
    })
    return <div>
        <div style={blockItem}>
            <SupChartReact
                highcharts={Highcharts}
                options={ops1}
            />
        </div>
        <div style={blockItem}>
            <SupChartReact
                highcharts={Highcharts}
                options={ops2}
            />
        </div>
        <div style={blockItem}>
            <SupChartReact
                highcharts={Highcharts}
                options={ops3}
            />
        </div>
        <div style={blockItem}>
            <SupChartReact
                highcharts={Highcharts}
                options={ops4}
            />
        </div>
    </div>
}

export default customComponentConnect(Demo);

const blockItem = {
    display: "inline-block",
    width: '50%',
}