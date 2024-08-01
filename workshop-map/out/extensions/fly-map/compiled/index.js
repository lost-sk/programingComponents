"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var eCharts = _interopRequireWildcard(require("./echarts"));

var _geoJSONWithCity = _interopRequireDefault(require("./geoJSONWithCity"));

var _geoMapWithCenter = _interopRequireDefault(require("./geoMapWithCenter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
//   executeScriptService: () => {},
// }
var MapData = [{
  name: '北京市',
  city: '北京',
  latitude: [116.4074, 39.9042]
}, {
  name: '天津市',
  city: '天津',
  latitude: [117.2008, 39.0842]
}, {
  name: '河北省',
  city: '石家庄',
  latitude: [114.5149, 38.0428]
}, {
  name: '山西省',
  city: '太原',
  latitude: [112.5489, 37.8706]
}, {
  name: '内蒙古自治区',
  city: '呼和浩特',
  latitude: [111.6708, 40.8183]
}, {
  name: '辽宁省',
  city: '沈阳',
  latitude: [123.4315, 41.8057]
}, {
  name: '吉林省',
  city: '长春',
  latitude: [125.3235, 43.8171]
}, {
  name: '黑龙江省',
  city: '哈尔滨',
  latitude: [126.5349, 45.8038]
}, {
  name: '上海市',
  city: '上海',
  latitude: [121.4737, 31.2304]
}, {
  name: '江苏省',
  city: '南京',
  latitude: [118.7969, 32.0603]
}, {
  name: '浙江省',
  city: '杭州',
  latitude: [120.1551, 30.2741]
}, {
  name: '安徽省',
  city: '合肥',
  latitude: [117.2272, 31.8206]
}, {
  name: '福建省',
  city: '福州',
  latitude: [119.2965, 26.0745]
}, {
  name: '江西省',
  city: '南昌',
  latitude: [115.8921, 28.6765]
}, {
  name: '山东省',
  city: '济南',
  latitude: [117.1205, 36.6519]
}, {
  name: '河南省',
  city: '郑州',
  latitude: [113.6254, 34.7466]
}, {
  name: '湖北省',
  city: '武汉',
  latitude: [114.3054, 30.5931]
}, {
  name: '湖南省',
  city: '长沙',
  latitude: [112.9388, 28.2282]
}, {
  name: '广东省',
  city: '广州',
  latitude: [113.2644, 23.1291]
}, {
  name: '广西壮族自治区',
  city: '南宁',
  latitude: [108.3661, 22.8172]
}, {
  name: '海南省',
  city: '海口',
  latitude: [110.3312, 20.0311]
}, {
  name: '重庆市',
  city: '重庆',
  latitude: [106.5516, 29.563]
}, {
  name: '四川省',
  city: '成都',
  latitude: [104.0665, 30.5723]
}, {
  name: '贵州省',
  city: '贵阳',
  latitude: [106.6302, 26.6477]
}, {
  name: '云南省',
  city: '昆明',
  latitude: [102.7123, 25.0406]
}, {
  name: '西藏自治区',
  city: '拉萨',
  latitude: [91.1409, 29.6456]
}, {
  name: '陕西省',
  city: '西安',
  latitude: [108.9402, 34.3416]
}, {
  name: '甘肃省',
  city: '兰州',
  latitude: [103.8236, 36.0581]
}, {
  name: '青海省',
  city: '西宁',
  latitude: [101.7782, 36.6171]
}, {
  name: '宁夏回族自治区',
  city: '银川',
  latitude: [106.2586, 38.4879]
}, {
  name: '新疆维吾尔自治区',
  city: '乌鲁木齐',
  latitude: [87.6177, 43.7928]
}, {
  name: '台湾省',
  city: '台北',
  latitude: [121.5654, 25.033]
}, {
  name: '香港特别行政区',
  city: '香港',
  latitude: [114.1694, 22.3193]
}, {
  name: '澳门特别行政区',
  city: '澳门',
  latitude: [113.5491, 22.1987]
}];
var labelMapData = [{
  name: '全国'
}, {
  name: '河北省',
  city: '石家庄',
  latitude: [114.5149, 38.0428]
}, {
  name: '山西省',
  city: '太原',
  latitude: [112.5489, 37.8706]
}, {
  name: '内蒙古自治区',
  city: '呼和浩特',
  latitude: [111.6708, 40.8183]
}, {
  name: '辽宁省',
  city: '沈阳',
  latitude: [123.4315, 41.8057]
}, {
  name: '吉林省',
  city: '长春',
  latitude: [125.3235, 43.8171]
}, {
  name: '黑龙江省',
  city: '哈尔滨',
  latitude: [126.5349, 45.8038]
}, {
  name: '江苏省',
  city: '南京',
  latitude: [118.7969, 32.0603]
}, {
  name: '浙江省',
  city: '杭州',
  latitude: [120.1551, 30.2741]
}, {
  name: '安徽省',
  city: '合肥',
  latitude: [117.2272, 31.8206]
}, {
  name: '福建省',
  city: '福州',
  latitude: [119.2965, 26.0745]
}, {
  name: '江西省',
  city: '南昌',
  latitude: [115.8921, 28.6765]
}, {
  name: '山东省',
  city: '济南',
  latitude: [117.1205, 36.6519]
}, {
  name: '河南省',
  city: '郑州',
  latitude: [113.6254, 34.7466]
}, {
  name: '湖北省',
  city: '武汉',
  latitude: [114.3054, 30.5931]
}, {
  name: '湖南省',
  city: '长沙',
  latitude: [112.9388, 28.2282]
}, {
  name: '广东省',
  city: '广州',
  latitude: [113.2644, 23.1291]
}, {
  name: '广西壮族自治区',
  city: '南宁',
  latitude: [108.3661, 22.8172]
}, {
  name: '海南省',
  city: '海口',
  latitude: [110.3312, 20.0311]
}, {
  name: '四川省',
  city: '成都',
  latitude: [104.0665, 30.5723]
}, {
  name: '贵州省',
  city: '贵阳',
  latitude: [106.6302, 26.6477]
}, {
  name: '云南省',
  city: '昆明',
  latitude: [102.7123, 25.0406]
}, {
  name: '西藏自治区',
  city: '拉萨',
  latitude: [91.1409, 29.6456]
}, {
  name: '陕西省',
  city: '西安',
  latitude: [108.9402, 34.3416]
}, {
  name: '甘肃省',
  city: '兰州',
  latitude: [103.8236, 36.0581]
}, {
  name: '青海省',
  city: '西宁',
  latitude: [101.7782, 36.6171]
}, {
  name: '宁夏回族自治区',
  city: '银川',
  latitude: [106.2586, 38.4879]
}, {
  name: '新疆维吾尔自治区',
  city: '乌鲁木齐',
  latitude: [87.6177, 43.7928]
}];
var myColor = ['#fc8452', '#ea7ccc', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#5470c6', '#9a60b4'];

function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

function filterGeoData(geodata) {
  var city = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var features = geodata.features;
  var filtetFeatures = features.filter(function (v) {
    if (v.properties.level === 'city') {
      return city ? true : false;
    }

    if (v.properties.level === 'district') {
      return false;
    }

    return true;
  });
  return _objectSpread(_objectSpread({}, geodata), {}, {
    features: filtetFeatures
  });
}

var provinceGeo = filterGeoData(_geoJSONWithCity.default);
var cityGeo = filterGeoData(_geoJSONWithCity.default, true);

var CustomComp = /*#__PURE__*/function (_Component) {
  _inherits(CustomComp, _Component);

  var _super = _createSuper(CustomComp);

  function CustomComp(props) {
    var _this2;

    _classCallCheck(this, CustomComp);

    _this2 = _super.call(this, props);

    _this2.runCode = function (key, msg) {
      var events = _this2.state.events;
      events.forEach(function (item) {
        if (item.content === key) {
          _this2.runScript(item.detail, msg);
        }
      });
    };

    _this2.runScript = function (codeStr, message) {
      try {
        //new function中codeStr脚本可以通过固定的_this来获取当前组件的this
        var _this = _assertThisInitialized(_this2);

        new Function('_this', codeStr)(_this);
      } catch (error) {
        console.error(error);
        notification.error({
          message: '可编程组件',
          description: message
        });
      }
    };

    _this2.execService = function (service, attr) {
      var objName = '';
      var serviceName = '';
      var params = {};

      if (service.key == 'template') {
        objName = service.selectedTemplate.namespace + '.' + service.selectedTemplate.name;
      } else {
        objName = service.selectedTemplate.namespace + '.' + service.selectedTemplate.name + '/' + service.selectedInstance.name;
      }

      if (service.subTab == 'service') {
        serviceName = service.selectedProp.namespace + '.' + service.selectedProp.name;
      } else {
        serviceName = 'system.getPropertyValue';
        params = {
          propName: service.selectedProp.propertyName
        };
      }

      scriptUtil.executeScriptService({
        objName: objName,
        // 模板 或者 实例
        serviceName: serviceName,
        // 服务的命名空间+服务别名
        // 入参
        params: params,
        version: 'V2',
        // 回调函数
        cb: function cb(res) {
          _this2.setState(_defineProperty({}, attr, res.data.list));
        }
      });
    };

    _this2.transHtml = function (visible, value) {
      var innerHtml = _this2.state.innerHtml;

      if (visible) {
        var regex = /\${(.*?)}/g;
        var replacedStr = innerHtml.replace(regex, function (match, captured) {
          return value[captured] || '';
        });
        return replacedStr;
      } else {
        return '';
      }
    };

    _this2.format2LinesData = function (list) {
      var linesData = [];

      var _loop = function _loop(index) {
        var _list$index = list[index],
            from = _list$index.from,
            to = _list$index.to;

        var tempFrom = _geoMapWithCenter.default.find(function (g) {
          return g.name.includes(from);
        });

        var tempTo = _geoMapWithCenter.default.find(function (g) {
          return g.name.includes(to);
        });

        if (tempFrom === undefined) {
          console.error("\u8BF7\u68C0\u67E5\u8BE5\u57CE\u5E02\u540D\u79F0\uFF1A".concat(from));

          _antd.message.error("\u8BF7\u68C0\u67E5\u8BE5\u57CE\u5E02\u540D\u79F0\uFF1A".concat(from));

          return "continue";
        }

        if (tempTo === undefined) {
          console.error("\u8BF7\u68C0\u67E5\u8BE5\u57CE\u5E02\u540D\u79F0\uFF1A".concat(to));

          _antd.message.error("\u8BF7\u68C0\u67E5\u8BE5\u57CE\u5E02\u540D\u79F0\uFF1A".concat(from));

          return "continue";
        }

        linesData.push({
          coords: [tempFrom.center, tempTo.center]
        });
      };

      for (var index = 0; index < list.length; index++) {
        var _ret = _loop(index);

        if (_ret === "continue") continue;
      }

      return linesData;
    };

    _this2.citizenName2MapData = function (list) {
      var tempMapData = _this2.state.mapData;

      var _loop2 = function _loop2(index) {
        var _list$index2 = list[index],
            from = _list$index2.from,
            to = _list$index2.to; //MapData(省会城市)中不存在的城市

        if (!tempMapData.find(function (g) {
          return from.includes(g.city);
        })) {
          var tempFrom = _geoMapWithCenter.default.find(function (g) {
            return g.name.includes(from);
          });

          if (tempFrom) {
            var parentId = tempFrom.parent;

            var parent = _geoMapWithCenter.default.find(function (g) {
              return g.treeID === parentId;
            });

            tempMapData.push({
              name: parent.name || '',
              city: from,
              latitude: tempFrom.center
            });
          }
        }

        if (!tempMapData.find(function (g) {
          return to.includes(g.city);
        })) {
          var tempTo = _geoMapWithCenter.default.find(function (g) {
            return g.name.includes(to);
          });

          if (tempTo) {
            var _parentId = tempTo.parent;

            var _parent = _geoMapWithCenter.default.find(function (g) {
              return g.treeID === _parentId;
            });

            tempMapData.push({
              name: _parent.name || '',
              city: to,
              latitude: tempTo.center
            });
          }
        }
      };

      for (var index = 0; index < list.length; index++) {
        _loop2(index);
      }

      return tempMapData;
    };

    var config = props?.data?._attrObject.data || {};
    console.log('map this.props config', config);
    _this2.mapRef = /*#__PURE__*/(0, _react.createRef)(null);
    _this2.interval = null;
    _this2.mapChart = null;
    _this2.state = {
      cityMap: false,
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      flyService: config?.flyObject?.dynamicDataSource || {},
      backgroundColor: config?.backgroundColor?.color || '#0D2C69',
      areaColor: config?.areaColor?.color || '#255EA7',
      borderColor: config?.borderColor?.color || '#0C2B69',
      cityColor: config?.cityColor?.color || '#FFFFFF',
      normalColor: config?.normalColor?.color || '#67C23A',
      warnColor: config?.warnColor?.color || '#E6A23C',
      errorColor: config?.errorColor?.color || '#F56C6C',
      tooltipColor: config?.tooltipColor?.color || '#f0f0f0',
      zoom: config?.zoom?.value || '1.33',
      center: config?.center?.value || '107,33',
      scale: config?.scale?.value || 'enable',
      move: config?.move?.value || 'enable',
      trigger: config?.trigger?.value || 'click',
      symbolSize: config?.symbolSize?.value || '20',
      interval: config?.interval?.value || '0',
      dataList: [],
      //dataList: [{ total: 22, name: '杭州', lng: 120.15, lat: 30.265 }],
      innerHtml: config?.htmlDetail || '',
      cardVisible: false,
      offsetX: 0,
      offsetY: 0,
      cardData: {},
      showFly: config?.showFly?.value || 'enable',
      flyDataList: [],
      mapData: MapData,
      showCitizenName: config?.showCitizenName?.value || 'disable'
    };
    return _this2;
  }

  _createClass(CustomComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var _this$state = this.state,
          borderColor = _this$state.borderColor,
          areaColor = _this$state.areaColor,
          backgroundColor = _this$state.backgroundColor,
          cityColor = _this$state.cityColor,
          dataList = _this$state.dataList,
          interval = _this$state.interval,
          zoom = _this$state.zoom,
          center = _this$state.center,
          scale = _this$state.scale,
          move = _this$state.move,
          symbolSize = _this$state.symbolSize,
          trigger = _this$state.trigger,
          flyDataList = _this$state.flyDataList,
          service = _this$state.service,
          flyService = _this$state.flyService,
          showFly = _this$state.showFly,
          mapData = _this$state.mapData;
      scriptUtil.registerReactDom(this, this.props);

      if (!_.isEmpty(service)) {
        this.execService(service, 'dataList');
      }

      if (!_.isEmpty(flyService) && showFly === 'enable') {
        this.execService(flyService, 'flyDataList');
      }

      this.mapChart = eCharts.init(this.mapRef.current);
      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息');
      eCharts.registerMap('provinces', provinceGeo);
      eCharts.registerMap('cities', cityGeo);
      var roam = false;

      if (scale === 'enable' && move === 'enable') {
        roam = true;
      } else {
        if (scale === 'enable') roam = 'scale';
        if (move === 'enable') roam = 'move';
      }

      var chartOption = {
        backgroundColor: backgroundColor,
        tooltip: {
          trigger: 'item',
          triggerOn: trigger
        },
        geo: {
          map: 'provinces',
          //map: 'cities',
          roam: roam,
          zoom: +zoom,
          center: center.split(','),
          tooltip: {
            show: false
          },
          emphasis: {
            disabled: true
          },
          itemStyle: {
            areaColor: areaColor,
            borderColor: borderColor
          }
        },
        dataset: {
          source: dataList
        },
        series: [{
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin',
          symbolSize: 0,
          label: {
            show: true,
            formatter: '{b}',
            position: 'right',
            offset: [-5, 0],
            color: cityColor,
            fontSize: 10
          },
          tooltip: {
            show: false
          },
          animation: false,
          data: mapData.map(function (item) {
            return {
              name: item.city,
              value: item.latitude
            };
          })
        }, {
          type: 'lines',
          coordinateSystem: 'geo',
          effect: {
            show: true,
            period: 4,
            trailLength: 0.5,
            // 轨迹尾迹的长度
            symbol: 'arrow',
            symbolSize: 6
          },
          animationDuration: 2000,
          lineStyle: {
            opacity: 0,
            color: function color(params) {
              return myColor[params.dataIndex % myColor.length];
            },
            curveness: 0.2
          },
          data: this.format2LinesData(flyDataList)
        }]
      };
      this.mapChart.setOption(chartOption);
      this.mapChart.on('click', function (params) {
        var cardVisible = _this3.state.cardVisible;

        if (params.seriesType === 'scatter' && params.seriesIndex === 1) {
          if (cardVisible === false) {
            _this3.setState({
              cardVisible: true,
              offsetX: params.event.offsetX,
              offsetY: params.event.offsetY,
              cardData: params.data || params.value
            });
          } else {
            _this3.setState({
              offsetX: params.event.offsetX,
              offsetY: params.event.offsetY,
              cardData: params.data || params.value
            });
          }
        } else {
          if (cardVisible) {
            _this3.setState({
              cardVisible: false
            });
          }
        }
      });
      var debounceFunc = debounce(function (zoom, cityMap, series) {
        console.log('debounceFunc', zoom, cityMap);
        var showCitizenName = _this3.state.showCitizenName;

        if (zoom > 5 && cityMap === false) {
          _this3.setState({
            cityMap: true
          });

          if (showCitizenName === 'enable') {
            series[0].data = [];
          }

          _this3.mapChart.setOption({
            geo: {
              map: 'cities',
              roam: false,
              label: showCitizenName === 'enable' ? {
                show: true,
                color: cityColor,
                formatter: function formatter(params) {
                  if (labelMapData.findIndex(function (m) {
                    return m.name === params.name;
                  }) !== -1) {
                    return '';
                  }

                  return params.name;
                }
              } : false
            },
            series: series
          }, {
            lazyUpdate: true
          });

          setTimeout(function () {
            _this3.mapChart.setOption({
              geo: {
                roam: roam
              }
            });
          }, 800);
        }

        if (zoom <= 5 && cityMap === true) {
          _this3.setState({
            cityMap: false
          });

          series[0].data = mapData.map(function (item) {
            return {
              name: item.city,
              value: item.latitude
            };
          });

          _this3.mapChart.setOption({
            geo: {
              map: 'provinces',
              roam: false,
              label: {
                show: false
              }
            },
            series: series
          }, {
            lazyUpdate: true
          });

          setTimeout(function () {
            _this3.mapChart.setOption({
              geo: {
                roam: roam
              }
            });
          }, 800);
        }
      }, 400);
      this.mapChart.on('georoam', function (params) {
        if (params.originX) {
          var _this3$mapChart$getOp = _this3.mapChart.getOption(),
              series = _this3$mapChart$getOp.series,
              geo = _this3$mapChart$getOp.geo;

          var cityMap = _this3.state.cityMap;
          debounceFunc(geo[0].zoom, cityMap, series);
        }
      });

      if (+interval > 0) {
        this.interval = setInterval(function () {
          if (!_.isEmpty(service)) {
            _this3.execService(service, 'dataList');
          }
        }, +interval * 1000);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (!_.isEqual(prevState.dataList, this.state.dataList)) {
        this.mapChart.setOption({
          dataset: {
            source: this.state.dataList
          }
        });
      }

      if (!_.isEqual(prevState.flyDataList, this.state.flyDataList)) {
        var newMapData = this.citizenName2MapData(this.state.flyDataList);
        this.setState({
          mapData: newMapData
        });

        var _this$mapChart$getOpt = this.mapChart.getOption(),
            series = _this$mapChart$getOpt.series;

        series[0].data = newMapData.map(function (item) {
          return {
            name: item.city,
            value: item.latitude
          };
        });
        series[1].data = this.format2LinesData(this.state.flyDataList);
        this.mapChart.setOption({
          series: series
        }, {
          lazyUpdate: true
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
      this.mapChart.dispose();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          height: '100%',
          width: '100%'
        },
        ref: this.mapRef
      });
    }
  }]);

  return CustomComp;
}(_react.Component);

var _default = CustomComp;
exports.default = _default;