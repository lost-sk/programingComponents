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
const serviceName = `tyzuksupos_tyzuksupos.Pie`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/

const myColor = ['#338899', '#86BE6C', '#FAD259'];
const myLabelColor = '#7ADAFF';//标签文本颜色
const myLineColor = '#4FDCFF'; //x轴线颜色
const myGridLineColor = '#054667'; //网格线颜色
const defaultConfig = {
  chart: {
    backgroundColor: 'transparent',
  },
  credits: {
    enabled: false
  },
  title: {
    style: {
      fontSize: '16px',
      color: '#B7C5DF',
    }
  },
  yAxis: {
    labels: {
      style: {
        color: myLabelColor
      }
    },
    gridLineColor: myGridLineColor
  },
  xAxis: {
    tickLength: 0,
    labels: {
      style: {
        color: myLabelColor
      }
    },
    lineColor: myLineColor
  },
  legend: {
    itemStyle: {
      color: myLabelColor
    }
  }
};
const options = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: "环形图标题居中",
    style: {
      fontSize: "20px"
    }
  },
  tooltip: {
    backgroundColor: '#00326b',
    borderColor: '#00326b',
    borderRadius: 10,
    style: {
      background: '#f50',
      color: '#229fc6',
      padding: 6
    },
    shared: true,
    useHTML: true,
    headerFormat: '<table><tr><td></td></tr>',
    pointFormat: '<tr><td>{point.name} </td>' +
      '<td style="color: {point.color};padding-left:5px;">{point.y}</td></tr>',
    footerFormat: '</table>',
    valueDecimals: 2
  },
  plotOptions: {
    pie: {
      borderWidth: 0,
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<div> <div style="color:{point.color};font-size:40px;">•</div><span style="color:#AFBDD1;font-size:18px;">{point.name}</span><br><span style="color:#FFF;font-size:16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{point.percentage:.1f}%</span></div>',
        style: {
          color: '#FFF'
        }
      },

    },
  },
  series: [{
    type: 'pie',
    innerSize: '80%',
    borderWidth: 0,
  }]
};

const Circle = () => {
  const wrapRef = React.useRef(null);
  const chartRef = React.useRef(null);

  const [ops, setOps] = React.useState(
    _.merge({}, defaultConfig, options)
  );

  // load data
  React.useEffect(() => {
    scriptUtil.servicePromise({
      objName,
      serviceName
    }).then(res => setOps((ops) => {
      return _.merge({}, ops, {
        series: [{
          data: res.data
        }]
      });
    }))
  }, [setOps])

  React.useEffect(() => {
    const { chart } = chartRef.current;
    chart.update({
      plotOptions: {
        pie: {
          point: {
            events: {
              mouseOver: function (e) {  // 鼠标滑过时动态更新标题
                chart.setTitle({
                  text: e.target.name + '\t' + e.target.y + ' %'
                });
              }
              //, 
              // click: function(e) { // 同样的可以在点击事件里处理
              //     chart.setTitle({
              //         text: e.point.name+ '\t'+ e.point.y + ' %'
              //     });
              // }
            }
          },
        }
      }
    })
  }, [])

  React.useEffect(() => {
    if (wrapRef && wrapRef.current) {
      ["touchstart", "touchmove", "touchend"].forEach((event) => {
        wrapRef.current.addEventListener(event, (e) => {
          e.stopPropagation();
        });
      });
    }
  }, [wrapRef]);

  const chartResizeRerender = React.useCallback((chart) => {
    const centerY = chart.series[0].center[1];
    const titleHeight = parseInt(chart.title.styles.fontSize);
    // 动态设置标题位置
    chart.setTitle({
      y: centerY + titleHeight / 2
    });
    window.addEventListener("resize", () => chart.reflow());
  }, [chartRef]);

  return (
    <SupChartReact
      highcharts={Highcharts}
      options={ops}
      callback={chartResizeRerender}
      ref={chartRef}
    />
  );
};

export default customComponentConnect(Circle);