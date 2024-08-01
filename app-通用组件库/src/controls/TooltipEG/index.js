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
  tooltip: {
    backgroundColor: "#00326b", // 背景颜色
    borderColor: "#00326b", //边框颜色
    borderRadius: 10, //边框圆角值
    padding: 10, //弹出框的内边距
    style: {
      background: "#f50",
      color: "#229fc6",
      padding: 6,
      // 这里可以设置行高，官方文档没有给出这个字段
      // lineHeight:20
    },
    // 同一x坐标对应多个y值的时候，允许在一个tooltip中显示多个y值
    shared: true,
    //   允许使用HTML语法
    useHTML: true,
    // 这几个方法常用来覆盖默认组件的样式
    // 平台组件不能控制tooltip文字大小，可以在这里覆盖
    /*
            scriptUtil
                .getRegisterReactDom('xxxx')
                .getCurrentInstance()
                .chart.update({
                    tooltip:{
                        //...
                    }
                })
        */
    headerFormat:
      "<table><tr><td style='font-size:20px'>{point.key} 自定义</td></tr>",
    pointFormat:
      "<tr><td>{series.name} </td>" +
      '<td style="color: {series.color};padding-left:5px;">{point.y}</td></tr>',
    footerFormat: "</table>",
    valueDecimals: 2, //保留小数位
    valuePrefix: "前缀-", //前缀
    valueSuffix: "-后缀", //后缀
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
