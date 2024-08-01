import React from 'react';
import scriptUtil from '../assets/externalsUtils';

scriptUtil
  .load("../assets/highcharts.js")
  .load("../assets/highcharts-more.js")
  .load("../assets/solid-gauge.js")

scriptUtil.use('React', React);

const {
  SupChartReact,
  customComponentConnect
} = scriptUtil;

/*---------------------------------------------------------------------*/
const objName = `tyzuksupos_tyzuksupos.GeneralCompnents`; // 对象实例命名空间.模板别名
const serviceName = `tyzuksupos_tyzuksupos.SingleValuePercentage`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/

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
    marginTop: 60,
    type: 'solidgauge'
  },
  title: {
    text: null
  },
  tooltip: {
    enabled: false,
  },
  yAxis: {

    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: []
  },
  pane: {
    startAngle: 0,
    endAngle: 360,
    background: [{ // Track for Move
      outerRadius: '112%',
      innerRadius: '88%',
      backgroundColor: '#3F4357',
      borderWidth: 0
    }]
  },
  plotOptions: {
    solidgauge: {
      borderWidth: '45px',
      dataLabels: {
        borderWidth: 0,
        x: 0,
        y: -80,
        format: '<span style="font-size:4em; color: #FFC227; font-weight: bold">{point.y:,.1f}%</span><br> <span style="font-size:4em; color: #FFF;"> {point.name}</spam>',
        style: {
          color: '#FFF'
        }
      },
      linecap: 'round',
      stickyTracking: false
    },

  },
  series: [{
    borderColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1
      },
      stops: [
        [0, '#30cbbc'],
        [1, '#46b9f6']
      ]
    },
    data: [{
      radius: '100%',
      innerRadius: '100%',
    }]
  }]
};

const SingleValuePercentage = () => {
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
          data: res.list || res.data || []
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

export default customComponentConnect(SingleValuePercentage);