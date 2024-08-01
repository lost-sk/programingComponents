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
const serviceName = `tyzuksupos_tyzuksupos.StackedColumn`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/

const myColor = ['#338899', '#86BE6C', '#FAD259'];
const myLabelColor = '#7ADAFF';//标签文本颜色
const myLineColor = '#4FDCFF'; //x轴线颜色
const myGridLineColor = '#054667'; //网格线颜色
const defaultConfig = {
  chart: {
    backgroundColor: "transparent",
    // margin: [0, 0, 0, 0]
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
    type: 'column',
    plotBorderWidth: null,
  },
  title: {
    text:"堆叠柱状图"
  },
  exporting: {
    enabled: false
  },
  rangeSelector: {
    enabled: false
  },
  yAxis: {
    min: 0,
    max: 100,
    tickAmount: 6,
    title: {
      text: null
    },
    stackLabels: {  // 堆叠数据标签
      enabled: false,
      style: {
        fontWeight: 'bold',
        color: 'gray'
      }
    },
    gridLineDashStyle: 'longDash'
  },
  xAxis: {
    allowDecimals: false,
    tickLength: 0,
    labels: {
      formatter: function () {
        return this.value + 1;
      }
    }
  },
  colors: myColor,
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
    headerFormat: '<table><tr><td>{point.x}</td></tr>',
    pointFormat: '<tr><td>{series.name} </td>' +
      '<td style="color: {series.color};padding-left:5px;">{point.y}</td></tr>',
    footerFormat: '</table>',
    valueDecimals: 2
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      borderWidth: 0,
      dataLabels: {
        enabled: false,
        color: 'white',
        style: {
          // 如果不需要数据标签阴影，可以将 textOutline 设置为 'none'
          textOutline: '1px 1px black'
        }
      },
      showInLegend: false
    }

  }
};

const StackedColumn = () => {
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
        series: res.list || res.data || [],
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

export default customComponentConnect(StackedColumn);