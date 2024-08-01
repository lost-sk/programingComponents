import React, { memo, useEffect, useRef } from "react";
import scriptUtil from '../assets/externalsUtils';

scriptUtil.use('React', React);
const {
    customComponentConnect
  } = scriptUtil;


/*---------------------------------------------------------------------*/
const objName = `tyzuksupos_tyzuksupos.GeneralCompnents`; // 对象实例命名空间.模板别名
const serviceName = `tyzuksupos_tyzuksupos.MobilityMap`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/

scriptUtil.load("../assets/echarts.min.js")

const provincial_capital = {
  // 23个省
  台湾: "台湾市",
  河北: "石家庄市",
  山西: "太原市",
  辽宁: "沈阳市",
  吉林: "长春市",
  黑龙江: "哈尔滨市",
  江苏: "南京市",
  浙江: "杭州市",
  安徽: "合肥市",
  福建: "厦门市",
  江西: "南昌市",
  山东: "济南市",
  河南: "郑州市",
  湖北: "武汉市",
  湖南: "长沙市",
  广东: "广州市",
  海南: "海口市",
  四川: "成都市",
  贵州: "贵阳市",
  云南: "昆明市",
  陕西: "西安市",
  甘肃: "兰州市",
  青海: "西宁市",
  // 5个自治区
  新疆: "乌鲁木齐市",
  广西: "南宁市",
  内蒙古: "呼和浩特市",
  宁夏: "银川市",
  西藏: "拉萨市",
  // 4个直辖市
  北京: "东城区",
  天津: "河西区",
  上海: "浦东新区",
  重庆: "渝中区",
  // 2个特别行政区
  香港: "香港",
  澳门: "澳门",
};
const load = (src) =>
  new Promise(function (resolve) {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = function () {
      return resolve();
    };
  });

const convertData = function (data, geoCoordMap) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i];
    var fromCoord = geoCoordMap[provincial_capital["浙江"]];
    var toCoord = geoCoordMap[provincial_capital[dataItem.name]];
    if (fromCoord && toCoord) {
      res.push([
        {
          coord: fromCoord,
        },
        {
          coord: toCoord,
          value: dataItem.value,
        },
      ]);
    }
  }
  return res;
};
const createLineData = (data, geoCoordMap) => {
  const pointData = [];
  data.forEach((x) => {
    pointData.push({
      name: x.name,
      value: geoCoordMap[provincial_capital[x.name]],
    });
  });
  return pointData;
};
let nameMap = {};
const commonSeries = {
  type: "map",
  map: "china",
  roam: false,
  zoom: 1.2,
  showLegendSymbol: true,
  label: {
    show: true,
    textStyle: {
      color: "#fff",
    },
  },
  itemStyle: {
    areaColor: "rgba(3,42,99,.0)",
    borderColor: "rgb(47,187,212,.8)",
    borderWidth: 1,
  },
  emphasis: {
    itemStyle: {
      areaColor: "rgba(11,102,151,.8)",
    },
    label: {
      color: "#fff",
    },
  },
  data: [],
  nameMap,
};

var planePath =
  "path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705";

const series = [
  {
    type: "effectScatter",
    coordinateSystem: "geo",
    zlevel: 2,
    rippleEffect: {
      brushType: "stroke",
    },
    silent: true,
    label: {
      show: false,
    },
    symbolSize: 10,
    itemStyle: {
      color: "#21F3BFAA",
    },
    data: [],
  },
  {
    type: "scatter",
    coordinateSystem: "geo",
    zlevel: 2,
    silent: true,
    label: {
      show: false,
    },
    symbolSize: 2,
    itemStyle: {
      color: "#21F3BFCC",
    },
    data: [],
  },
  {
    name: "浙江",
    type: "lines",
    zlevel: 1,
    effect: {
      show: true,
      period: 6,
      trailLength: 0.7,
      color: "#fff",
      symbolSize: 3,
    },
    lineStyle: {
      normal: {
        color: "red",
        width: 1,
        curveness: 0.2,
      },
    },
    data: [],
  },
  {
    name: "浙江",
    type: "lines",
    zlevel: 2,
    effect: {
      show: true,
      period: 6,
      trailLength: 0,
      symbol: planePath,
      symbolSize: 10,
    },
    lineStyle: {
      normal: {
        color: "#1dd4b0",
        width: 1,
        opacity: 0.8,
        curveness: 0.2,
      },
    },
    data: [],
  },
  commonSeries,
];

const options = {
  tooltip: {
    show: true,
    padding: [0, 0],
    formatter: (data) => {
      if (!data.data) return "<div></div>";
      return `<div class='toolTipbox'>
          <div class='title' style="background:#99590a;color:#fff;border:1px solid #da604c;padding:4px 8px;border-radius:4px">${
            data.data.value || 0
          }</div>
        </div>`;
      // return  data.value || 0
    },
  },
  geo: {
    map: "china",
    roam: false,
    zoom: 1.2,
    itemStyle: {
      normal: {
        areaColor: "rgba(128, 128, 128, 0)", //默认区块颜色
        borderColor: "#03b8c0", //区块描边颜色
        borderWidth: 2, //区块描边颜色
        shadowBlur: 4,
        shadowOffsetY: 8,
        shadowOffsetX: 0,
        shadowColor: "rgba(6,73,145,.8)",
      },
      emphasis: {
        areaColor: "#45ad00", //鼠标划过区块的颜色
      },
    },
  },
  visualMap: {
    show: true,
    type: "piecewise",
    align: "left",
    left: "3%",
    bottom: "7%",
    borderColor: "rgba(63, 202, 241, 0.2)",
    borderWidth: 1,
    min: 0,
    max: 10000000,
    textStyle: {
      color: "#fff",
    },
    seriesIndex: 3,
    inverse: true,
    pieces: [
      { color: "rgba(12,187,238,.8)", min: 500, label: ">500" },
      { color: "rgba(12,137,187,.7)", min: 200, max: 500, label: ">200" },
      { color: "rgba(11,102,153,.6)", min: 100, max: 200, label: ">100" },
      { color: "rgba(10,67,115,.5)", min: 50, max: 100, label: ">50" },
      { color: "rgba(3,42,99,.4)", min: 0, max: 50, label: ">0" },
    ],
  },
};

const getData = () =>
  new Promise((resolve) =>
    scriptUtil.excuteScriptService({
      objName: "tyzuksupos_tyzuksupos.GeneralCompnents",
      serviceName: "tyzuksupos_tyzuksupos.Map1",
      version: "V2",
      cb: resolve,
    })
  );

const EchartMap = () => {
  const container = useRef(null);
  const chart = useRef(null);
  const geo = useRef(null);

  useEffect(() => {
    (async () => {
      const china = await fetch(
        "/resource/App_264610095947b7fa572df452f1c87c11/assets/china.json"
      ).then((res) => res.json());

      echarts.registerMap("china", china);

      geo.current = await fetch(
        "/resource/App_264610095947b7fa572df452f1c87c11/assets/geo.json"
      ).then((res) => res.json());
      chart.current = echarts.init(container.current);

      const { data } = await scriptUtil.servicePromise({
        objName,
        serviceName
      })

      chart.current.setOption({
        ...options,
        series: [
          {
            ...series[0],
            data: createLineData(data, geo.current),
          },
          {
            ...series[1],
            data: createLineData(data, geo.current),
          },
          {
            ...series[3],
            data: convertData(data, geo.current),
          },
          {
            ...series[4],
            data: data,
          },
        ],
      });
    })();
  }, []);

  return (
    <div className="compWrapper" style={{ width: "100%", height: "100%" }}>
      <div
        id="chart"
        ref={container}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default customComponentConnect(EchartMap);
