import React from 'react';
import scriptUtil from '../assets/externalsUtils';

scriptUtil
  .load("../assets/highcharts.js")
  .load("../assets/highcharts-more.js")

scriptUtil.use('React', React);

const {
  SupChartReact,
  customComponentConnect
} = scriptUtil;

/*---------------------------------------------------------------------*/
const objName = `tyzuksupos_tyzuksupos.GeneralCompnents`; // 对象实例命名空间.模板别名
const serviceName = `tyzuksupos_tyzuksupos.StackedBar`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/

// 修改颜色
const myColor = ['#B1FFF9', '#66E2DE', '#5A99EE'];
const myLabelColor = '#91b6c1';//标签文本颜色
const myLineColor = '#30cbbc'; //x轴线颜色
const myGridLineColor = '#1c3438'; //网格线颜色

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
    type: 'bar',
    plotBorderWidth: null,
  },
  title: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  rangeSelector: {
    enabled: false
  },
  yAxis: {
    min: 0,
    title: {
      text: null
    },
  },
  xAxis: {
    categories: ['装置A', '装置B', '装置C', '装置D']
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
    series: {
      stacking: 'normal',
      borderWidth: 0,
      // 隐藏底部标签
      showInLegend: false
    }
  },
}

const StackedBar = () => {
  const wrapRef = React.useRef(null);

  const [ops, setOps] = React.useState(
    _.merge({}, defaultConfig, options)
  );

  // load data
  React.useEffect(() => {
    scriptUtil.servicePromise({
      objName,
      serviceName
    }).then(res => setOps(ops => {
      return _.merge({}, ops, {
        series: res.list || res.data || []
      })
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
    window.addEventListener('resize', () => chart.reflow())
  }, [])

  return (
    <SupChartReact
      highcharts={Highcharts}
      options={ops}
      callback={chartResizeRerender}
    />
  );
};

export default customComponentConnect(StackedBar);