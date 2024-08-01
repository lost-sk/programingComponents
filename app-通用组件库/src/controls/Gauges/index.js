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
const serviceName = `tyzuksupos_tyzuksupos.Gauges`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/

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
};
const options = {
  chart: {
    type: 'gauge',
  },
  title: {
    text: "速度仪",
  },
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
    tickColor: '#fff',
    minorTickColor: '#fff',
    lineWidth: 30,
    labels: {
      distance: -30,
      style: {
        color: '#fff',
      },
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
        baseWidth: 20,
        topWidth: 0,
        baseLength: '0%',
        rearLength: 10
      }
    },
    // 轴心的样式设置
    pivot: {
      backgroundColor: "#000000",
      borderColor: "#cccccc",
      borderWidth: 0,
      radius: 5
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
        series: res.data
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

  React.useEffect(() => {
    if (document
      .querySelector(".highcharts-axis-line")) {
      document
        .querySelector(".highcharts-axis-line")
        .setAttribute("stroke-linecap", "round");
    }

  }, [ops])

  return (
    <SupChartReact
      highcharts={Highcharts}
      options={ops}
      callback={chartResizeRerender}
    />
  );
};

export default customComponentConnect(Gauges);