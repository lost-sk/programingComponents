import React from 'react';
import scriptUtil from '../assets/externalsUtils';
import Highcharts from '../assets/highcharts';
import HighchartsMore from '../assets/highcharts-more';
import SolidGauge from '../assets/solid-gauge';

// Highcharts(SolidGauge);
// _ lodash 是全局变量，可以直接使用

scriptUtil.use("React",React);
const { SupChartReact } = scriptUtil;

/*---------------------------------------------------------------------*/
const objName = `tyzuksupos_tyzuksupos.GeneralCompnents`; // 对象实例命名空间.模板别名
const serviceName = `tyzuksupos_tyzuksupos.Gauges`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/

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
};
const options = {
  chart: {
    type: 'gauge',
  },
  title: null,
  pane: {
    startAngle: -90,
    endAngle: 90,
    background: null
  },
  yAxis: [{
    min: 0,
    max: 100,
    // offset: -20,
    lineColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 0
      },
      stops: [
        [0, '#83C6FD'],
        [0.13, '#83C6FD'],
        [0.30, '#64FFE4'],
        [0.63, '#FFD48F'],
        [0.85, '#FA9A00'],
        [1, '#FA6800']
      ]
    },
    tickColor: '#ddd',
    minorTickColor: '#ddd',
    lineWidth: 30,
    labels: {
      distance: -30
    },
    tickLength: 20,
    minorTickLength: 0,
    endOnTick: true
  }],
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: '<span style="color:#fee100;font-size:22px;">{y}</span> %',
        borderWidth: 0,
        style: {
          fontSize: '13px',
          color: '#000'
        }
      }
    },
    gauge: {
      dial: {
        radius: '40%',
        backgroundColor: '#95f9e3',
        baseWidth: 16,
        topWidth: 0,
        baseLength: '0%',
        rearLength: 16
      }
    }
  }
};

const Gauges = () => {
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

export default Gauges;