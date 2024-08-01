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
const serviceName = `tyzuksupos_tyzuksupos.Jade`; // 服务命名空间.服务别名
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
    type: 'solidgauge',
    marginTop: 50,
  },
  title: {
    text: ''
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
    background: [{
      outerRadius: '112%',
      innerRadius: '88%',
      backgroundColor: '#3E4B61',
      borderWidth: 0
    }, {
      outerRadius: '62%',
      innerRadius: '38%',
      backgroundColor: '#3E4B61',
      borderWidth: 0
    }]
  },
  tooltip: {
    borderWidth: 0,
    backgroundColor: 'none',
    shadow: false,
    style: {
      fontSize: '16px'
    },
    pointFormat: '<span style="font-size:25px;color:{point.color}"> ■</span><span style="font-size:25px;color:#7ADAFF"> {series.name}</span><br><span style="font-size:2em; color:#FFF; font-weight: bold">{point.y}%</span>',
    positioner: function (labelWidth, labelHeight, point) {
      return {
        x: point.plotX - labelWidth / 2 + 12,
        y: point.plotY ,
      };
    }
  },
  plotOptions: {
    solidgauge: {
      borderWidth: '48px',
      dataLabels: {
        enabled: false,
        linecap: 'square',
        stickyTracking: false
      }
    },
  }
}

const Jade = () => {
  const wrapRef = React.useRef(null);

  const [ops, setOps] = React.useState(
    _.merge({}, defaultConfig, options)
  );

  // load data
  React.useEffect(() => {
    scriptUtil.servicePromise({
      objName,
      serviceName
    }).then(res => {

      const resultList = JSON.parse(JSON.stringify(res.list || res.data || []));

      resultList[0].borderColor = '#FF6D40';
      resultList[0].data[0].color = '#FF6D40';
      resultList[0].data[0].radius = '100%';
      resultList[0].data[0].innerRadius = '100%';
      resultList[1].borderColor = {
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
      };

      resultList[1].data[0].color = {
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
      };

      resultList[1].data[0].radius = '50%',
        resultList[1].data[0].innerRadius = '50%',

        setOps(ops => {
          return _.merge({}, ops, {
            series: resultList
          })
        });
    })

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

export default customComponentConnect(Jade);