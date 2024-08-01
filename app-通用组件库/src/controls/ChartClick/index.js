import React from 'react';
import scriptUtil from '../assets/externalsUtils';

scriptUtil
  .load("../assets/highcharts.js")
  .load("../assets/highcharts-more.js");

scriptUtil.use("React", React);

const { SupChartReact, customComponentConnect } = scriptUtil;

/*---------------------------------------------------------------------*/
const objName = `tyzuksupos_tyzuksupos.GeneralCompnents`; // 对象实例命名空间,模板别名
const serviceName = `tyzuksupos_tyzuksupos.Line`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/

const myLabelColor = "#7ADAFF"; //标签文本颜色
const myLineColor = "#4FDCFF"; //x轴线颜色
const myGridLineColor = "#054667"; //网格线颜色

const defaultConfig = {
  chart: {
    backgroundColor: "transparent",
    // margin: [10, 0, 0, 0]
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
// 折线图配置
const options = {
  chart: {
    type: "line",
    events: {
      click: function (event) {
        alert("点击了图表面板");
      },
    },
  },
  title: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  rangeSelector: {
    enabled: false,
  },
  plotOptions: {
    series: {
      cursor: "pointer",
      events: {
        click: function (event) {
          alert("点击折线上的点位");
        },
        legendItemClick: function () {
          alert("点击了图例");
        },
      },
    },
  },
  legend: {
    enabled: true,
  },
};

const TooltipEG = (props) => {
  const wrapRef = React.useRef(null);

  const [ops, setOps] = React.useState(_.merge({}, defaultConfig, options));

  React.useEffect(() => {
    scriptUtil
      .servicePromise({
        objName,
        serviceName,
      })
      .then((res) =>
        setOps((ops) => {
          return _.merge({}, ops, {
            series: res.list || res.data || [],
          });
        })
      );
  }, [setOps]);

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

export default customComponentConnect(TooltipEG);
