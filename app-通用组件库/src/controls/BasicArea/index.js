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
const serviceName = `tyzuksupos_tyzuksupos.BasicArea`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/


const myColor = ["#169B84", "#C2940A", "#006aee", "#e16555", "#9e4ad4"];// 线条颜色
const myLabelColor = "#7ADAFF"; //标签文本颜色
const myLineColor = "#4FDCFF"; //x轴线颜色
const myGridLineColor = "#054667"; //网格线颜色

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
    type: 'areaspline',
  },
  title: {
    text: "主标题",
    enabled: false
  },
  yAxis: {
    allowDecimals: false,
    labels: {
      formatter: function () {
        return this.value;
      }
    },
    title: {
      enabled: false
    },
    min: 0,
    max: 100,
    tickAmount: 5
  },
  xAxis: {
    allowDecimals: false,
    labels: {
      formatter: function () {
        return this.value + 1;
      }
    }
  },
  colors: myColor,
  plotOptions: {
    series: {
      states: {
        hover: {
          enabled: true
        }
      },
      marker: {
        enabled: false
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
        headerFormat: '<table>',
        pointFormat: '<tr><td>{series.name}  </td>' +
          '<td style="color: {series.color};padding-left:5px;">{point.y}</td></tr>',
        footerFormat: '</table>',
        valueDecimals: 2
      },
    }
  },
  legend: {
    squareSymbol: true,
    symbolRadius: 0
  }
}

const BasicArea = () => {
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

export default customComponentConnect(BasicArea);