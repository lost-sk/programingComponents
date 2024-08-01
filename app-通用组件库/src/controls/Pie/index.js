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
    text:"饼状图"
  },
  tooltip: {
    // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
    headerFormat: '<table><tr><td>{point.key}</td></tr>',
    pointFormat: '<tr><td>{series.name} </td>' +
      '<td style="color: {point.color};padding-left:5px;">{point.y}</td></tr>',
    footerFormat: '</table>',
    valueDecimals: 2
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: '<div>' +
          '<div style="color:{point.color};font-size:40px;">•</div>' +
          '<div style="color:#AFBDD1;font-size:18px;">{point.name}</div>' +
          '<br>' +
          '<div style="color:#FFF;font-size:16px;margin-left:50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{point.percentage:.1f}%</div>' +
          '</div>',
        style: {
          color: '#fff'
        }
      },
      showInLegend: false
    }
  },
};

const Pie = () => {
  const wrapRef = React.useRef(null);
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
          name: '数据',
          colorByPoint: true,
          data: res.data
        }]
      });
    }))
  }, [setOps])

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
    window.addEventListener("resize", () => chart.reflow());
  }, []);

  return (
    <SupChartReact
      highcharts={Highcharts}
      options={ops}
      callback={chartResizeRerender}
    />
  );
};

export default customComponentConnect(Pie);