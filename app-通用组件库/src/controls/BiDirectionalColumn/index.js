import React from 'react';
import scriptUtil from '../assets/externalsUtils';

scriptUtil
  .load("../assets/highcharts.js")
  .load("../assets/highcharts-more")

scriptUtil.use('React', React);

const {
  SupChartReact,
  customComponentConnect
} = scriptUtil;


/*---------------------------------------------------------------------*/
const objName = `tyzuksupos_tyzuksupos.GeneralCompnents`; // 对象实例命名空间.模板别名
const serviceName = `tyzuksupos_tyzuksupos.BiDirectionalColumn`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/

const myLabelColor = '#7ADAFF';//标签文本颜色
const myLineColor = '#4FDCFF'; //x轴线颜色
const myGridLineColor = '#054667'; //网格线颜色
const defaultConfig = {
  chart: {
    backgroundColor: 'transparent',
    // margin: [10, 0, 0, 0]
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
    type: 'bar'
  },
  title: {
    text: "双向轴"
  },
  exporting: {
    enabled: false
  },
  rangeSelector: {
    enabled: false
  },
  colors: ['#006ABF', '#007579'],
  xAxis: {
    categories: ['标签A', '标签B', '标签C', '标签D'],
    reversed: false,

  },
  yAxis: {
    title: {
      text: null
    },
    labels: {
      formatter: function () {
        return (Math.abs(this.value));
      }
    },
    min: -100,
    max: 100
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
      '<td style="color: {series.color};padding-left:5px;">{point.y:.0f}</td></tr>',
    footerFormat: '</table>',
    valueDecimals: 2
  },

  plotOptions: {
    series: {
      showInLegend: false,
      stacking: 'normal',
      borderWidth: 0,

    }
  },
};

const BiDirectionalColumn = () => {
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

export default customComponentConnect(BiDirectionalColumn);