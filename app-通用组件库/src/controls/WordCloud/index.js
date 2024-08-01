import React from 'react';
import scriptUtil from '../assets/externalsUtils';

scriptUtil
  .load("../assets/highcharts.js")
  .load("../assets/wordcloud.js")

scriptUtil.use("React", React);

const { SupChartReact, customComponentConnect } = scriptUtil;

/*---------------------------------------------------------------------*/
const objName = `tyzuksupos_tyzuksupos.GeneralCompnents`; // 对象实例命名空间.模板别名
const serviceName = `tyzuksupos_tyzuksupos.WordCloud`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/

const defaultConfig = {
  chart: {
    type: "wordcloud",
    backgroundColor: "transparent",
  },

  title: {
    style: {
      fontSize: "16px",
      color: "#B7C5DF",
    },
  },
  credits: {
    enabled: false,
  },
};
const options = {
  title: {
    text: "词云图",
  },
};

const WordCloud = () => {
  const wrapRef = React.useRef(null);

  const [ops, setOps] = React.useState(_.merge({}, defaultConfig, options));

  //   load data
  React.useEffect(() => {
    scriptUtil
      .servicePromise({
        objName,
        serviceName,
      })
      .then((res) =>
        setOps((ops) => {
          return _.merge({}, ops, {
            series:[{
                data:res.list || res.data || [],
            }] 
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

export default customComponentConnect(WordCloud);
