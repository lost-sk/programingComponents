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
const serviceName = `tyzuksupos_tyzuksupos.RadarMap`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/

const myColor = ['#8746FF', '#17C786'];
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
    polar: true,
    type: 'area',
  },
  title: {
    text:"雷达图"
  },
  exporting: {
    enabled: false
  },
  rangeSelector: {
    enabled: false
  },
  pane: {
    size: '80%'
  },
  yAxis: {
    gridLineInterpolation: 'polygon',
    lineWidth: 0,
    min: 0
  },
  xAxis: {
    categories: ['标签', '标签', '标签', '标签', '标签', '标签'],
    tickmarkPlacement: 'on',
    lineWidth: 0
  },

  colors: myColor,

  legend: {
    verticalAlign: 'left',
    y: 550,
  },
  tooltip: {
    shared: true,
    pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
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
    headerFormat: '<table><tr><td>{point.x}</td></tr>',
    pointFormat: '<tr><td>{series.name} </td>' +
      '<td style="color: {series.color};padding-left:5px;">${point.y}</td></tr>',
    footerFormat: '</table>',
    valueDecimals: 2
  },
}

const RadarMap = () => {
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

export default customComponentConnect(RadarMap);