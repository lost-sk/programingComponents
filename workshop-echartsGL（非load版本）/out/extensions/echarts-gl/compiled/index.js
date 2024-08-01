"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _echarts = _interopRequireDefault(require("./echarts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
//   executeScriptService: () => {},
// }
// const isDevelopment = true
var CustomComp = /*#__PURE__*/function (_Component) {
  _inherits(CustomComp, _Component);

  var _super = _createSuper(CustomComp);

  function CustomComp(props) {
    var _this2;

    _classCallCheck(this, CustomComp);

    _this2 = _super.call(this, props);

    _this2.formatScatterList = function (lists) {
      var formatArray = [];
      lists.forEach(function (li) {
        if (li.color) {
          formatArray.push(_objectSpread(_objectSpread({}, _.omit(li, ['color', 'position'])), {}, {
            itemStyle: {
              color: li.color
            },
            value: li?.position
          }));
        } else {
          formatArray.push(_objectSpread(_objectSpread({}, _.omit(li, ['position'])), {}, {
            value: li?.position
          }));
        }
      });
      return formatArray;
    };

    _this2.formatDataList = function (list) {
      var formatArray = [];

      for (var i = 0; i < list.length; i++) {
        if (typeof list[i][0] === 'string' && typeof list[i][1] === 'string') {
          var arr1 = list[i][0].split('-').map(function (v) {
            return +v;
          });

          var _arr = list[i][1].split('-').map(function (v) {
            return +v;
          });

          for (var j = arr1[0]; j <= arr1[1]; j++) {
            for (var k = _arr[0]; k <= _arr[1]; k++) {
              formatArray.push([j, k].concat(_toConsumableArray(list[i].slice(2))));
            }
          }
        }

        if (typeof list[i][0] === 'string' && typeof list[i][1] === 'number') {
          var arr = list[i][0].split('-').map(function (v) {
            return +v;
          });

          for (var _j = arr[0]; _j <= arr[1]; _j++) {
            formatArray.push([_j, list[i][1]].concat(_toConsumableArray(list[i].slice(2))));
          }
        }

        if (typeof list[i][0] === 'number' && typeof list[i][1] === 'string') {
          var _arr2 = list[i][1].split('-').map(function (v) {
            return +v;
          });

          for (var _j2 = _arr2[0]; _j2 <= _arr2[1]; _j2++) {
            formatArray.push([list[i][0], _j2].concat(_toConsumableArray(list[i].slice(2))));
          }
        }

        if (typeof list[i][0] === 'number' && typeof list[i][1] === 'number') {
          formatArray.push(list[i]);
        }
      }

      var arr2 = [];
      formatArray.forEach(function (f) {
        if (f.length > 3) {
          arr2.push({
            value: f.slice(0, 3),
            itemStyle: {
              color: f[3]
            }
          });
        } else {
          arr2.push({
            value: f.slice(0, 3)
          });
        }
      });
      return arr2;
    };

    _this2.formatDataString = function (str) {
      var arr = str.split('\n');
      var result = [];

      for (var i = 0; i < arr.length; i++) {
        if (/(?<!\/\/\s*\S*)\[.{5,}\]/.test(arr[i])) {
          var item = arr[i].match(/\[(.{5,})\]/)[1];
          var itemArr = item.split(',');
          var formatArr = itemArr.map(function (i) {
            if (Number.isNaN(+i)) {
              return i.replace(/"|'|\s/g, '');
            } else {
              return +i;
            }
          });
          result.push(formatArr);
        }
      }

      return result;
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

    _this2.runCode = function (key, msg) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var events = _this2.state.events;
      events.forEach(function (item) {
        if (item.content === key) {
          _this2.runScript(item.detail, msg, params);
        }
      });
    };

    _this2.runScript = function (codeStr, message, params) {
      try {
        var _this = _assertThisInitialized(_this2);

        new Function('_this', 'params', codeStr)(_this, params);
      } catch (error) {
        console.error(error);
        notification.error({
          message: '可编程组件',
          description: message
        });
      }
    };

    _this2.onEchartsInit = function () {
      var _this2$state = _this2.state,
          xAxisBars = _this2$state.xAxisBars,
          yAxisBars = _this2$state.yAxisBars,
          zAxisBars = _this2$state.zAxisBars,
          startColor = _this2$state.startColor,
          endColor = _this2$state.endColor,
          scatterList = _this2$state.scatterList,
          dataList = _this2$state.dataList,
          debugMode = _this2$state.debugMode,
          symbolSize = _this2$state.symbolSize;
      _this2.glChart = _echarts.default.init(_this2.mapRef.current);
      var option = {
        visualMap: {
          min: 1,
          max: +zAxisBars,
          inRange: {
            color: [startColor, endColor]
          }
        },
        xAxis3D: {
          type: 'value',
          min: 1,
          max: +xAxisBars
        },
        yAxis3D: {
          type: 'value',
          min: 1,
          max: +yAxisBars
        },
        zAxis3D: {
          type: 'value',
          min: 1,
          max: +zAxisBars
        },
        grid3D: {
          boxWidth: +xAxisBars,
          boxDepth: +yAxisBars,
          boxHeight: +zAxisBars,
          viewControl: {
            distance: +xAxisBars + 100
          }
        },
        series: [{
          type: 'bar3D',
          data: _this2.formatDataList(dataList),
          barSize: 1,
          itemStyle: {
            opacity: 0.3
          }
        }, {
          type: 'scatter3D',
          data: _this2.formatScatterList(scatterList),
          symbol: 'path://M512.341333 799.274667c-164.522667-183.424-246.741333-329.216-246.741333-437.333334 0-162.218667 110.464-241.493333 246.741333-241.493333 136.234667 0 246.698667 79.317333 246.698667 241.450667 0 108.117333-82.261333 253.866667-246.698667 437.418666z m0-313.258667c75.690667 0 137.002667-58.453333 137.002667-130.56s-61.312-130.56-137.002667-130.56c-75.690667 0-137.045333 58.453333-137.045333 130.56s61.354667 130.56 137.045333 130.56z m-170.666666 155.733333l38.272 36.992c-71.424 16.896-118.954667 46.976-118.954667 81.322667 0 52.906667 112.384 95.658667 250.965333 95.658667 138.624 0 251.008-42.837333 251.008-95.658667 0-33.962667-46.506667-63.786667-116.650666-80.725333l38.016-36.864c77.909333 25.941333 128.853333 68.906667 128.853333 117.589333 0 79.274667-134.826667 143.445333-301.226667 143.445333-166.314667 0-301.141333-64.170667-301.141333-143.36 0-49.152 51.84-92.501333 130.901333-118.4h-0.042666z',
          symbolSize: +symbolSize,
          label: {
            show: true,
            distance: 0,
            position: 'top',
            formatter: function formatter(params) {
              return params.name || params.value[2];
            }
          }
        }]
      };

      if (debugMode === 'false') {
        option.grid3D = _objectSpread(_objectSpread({}, option.grid3D), {
          axisLine: {
            lineStyle: {
              opacity: 0
            }
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisPointer: {
            show: false
          }
        });
        option.xAxis3D = _objectSpread(_objectSpread({}, option.xAxis3D), {}, {
          show: false,
          name: ''
        });
        option.yAxis3D = _objectSpread(_objectSpread({}, option.yAxis3D), {}, {
          show: false,
          name: ''
        });
        option.zAxis3D = _objectSpread(_objectSpread({}, option.zAxis3D), {}, {
          show: false,
          name: ''
        });
        option.visualMap = _objectSpread(_objectSpread({}, option.visualMap), {}, {
          show: false
        });
      }

      _this2.glChart.setOption(option);

      _this2.glChart.on('click', function (params) {
        var newParams = _.pick(params, ['color', 'value', 'data', 'event', 'seriesType', 'name']);

        _this2.runCode('onClick', '点击事件执行错误', newParams);
      });
    };

    _this2.getDataList = function () {
      return _this2.state.dataList;
    };

    _this2.setDataList = function (list) {
      if (Array.isArray(list)) {
        _this2.setState({
          dataList: list
        });
      }
    };

    var config = props?.data?._attrObject.data || {};
    console.log('this.props config', config);
    _this2.mapRef = /*#__PURE__*/(0, _react.createRef)(null);
    _this2.glChart = null;
    _this2.interval = null;
    _this2.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      xAxisBars: config?.xAxisBars?.value || '150',
      yAxisBars: config?.yAxisBars?.value || '250',
      zAxisBars: config?.zAxisBars?.value || '20',
      startColor: config?.startColor?.color || '#4FC1FF',
      endColor: config?.endColor?.color || '#1D7CFF',
      backgroundColor: config?.backgroundColor?.color || '',
      debugMode: config?.debugMode?.value || 'true',
      symbolSize: config?.symbolSize?.value || '20',
      interval: config?.interval?.value || '0',
      dataList: _this2.formatDataString(config?.htmlDetail?.value || ''),
      scatterList: [],
      isDesign: props.isDesign === true ? true : false
    };
    return _this2;
  }

  _createClass(CustomComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      scriptUtil.registerReactDom(this, this.props);
      var _this$state = this.state,
          service = _this$state.service,
          isDesign = _this$state.isDesign,
          interval = _this$state.interval;

      if (!_.isEmpty(service)) {
        this.execService(service, 'scatterList');
      }

      if (typeof isDevelopment === 'boolean' && isDevelopment) {
        this.setState({
          dataList: [[1, '1-195', 12], [1, '1-195', 12], [4, '1-195', 12], [1, '205-250', 12], [4, '205-250', 12], [5, '30-40', 10], ['1-30', 1, 12], ['1-30', 1, 12], ['40-150', 1, 12], [30, '1-70', 12], ['4-30', 70, 12], [40, '1-70', 12], ['40-150', 70, 12], ['95-150', 60, 12], [95, '40-60', 12], ['60-95', 40, 12], [60, '1-20', 12], [60, '30-39', 12], [60, '50-70', 12], ['103-140', '50-54', 5], ['60-100', '2-4', 8], [150, '1-20', 12], [150, '25-60', 12], [150, '70-85', 12], [150, '90-100', 12], [150, '110-150', 12], [150, '160-180', 12], [150, '200-220', 12], [150, '225-250', 12], ['1-80', 250, 12], ['90-100', 250, 12], ['120-140', 250, 12], ['145-150', 250, 12], ['1-60', 95, 12], ['70-100', 95, 12], ['110-150', 95, 12], [30, '80-95', 12], [59, '80-95', 12], [100, '70-85', 12], [110, '70-85', 12], ['100-103', 85, 12], ['107-110', 85, 12], ['1-150', 147, 12], ['1-70', 212, 12], ['1-70', 213, 12], ['1-70', 214, 12], [52, '147-195', 12], [30, '108-133', 12], ['110-140', '162-165', 5], ['70-100', '162-165', 5], ['70-75', 170, 2], ['90-95', 170, 2], ['120-125', 170, 2], ['130-135', 170, 2], ['30-60', 108, 12], ['80-120', 108, 12], ['30-120', 133, 12], ['90-150', '212-214', 12], [90, '212-220', 12], [90, '230-250', 12], [70, '212-220', 12], [70, '230-250', 12], [120, '108-122', 12], [120, '130-133', 12]],
          scatterList: [{
            name: '位置1',
            position: [120, 25, 1]
          }]
        });
      } else {
        if (Number.isInteger(+interval) && +interval > 0) {
          this.interval = setInterval(function () {
            if (!_.isEmpty(service)) {
              _this3.execService(service, 'scatterList');
            }
          }, +interval * 1000);
        }
      }

      this.onEchartsInit();
      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息');
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (!_.isEqual(prevState.dataList, this.state.dataList) && this.glChart !== null) {
        this.glChart.setOption({
          series: [{
            data: this.formatDataList(this.state.dataList)
          }]
        });
      }

      if (!_.isEqual(prevState.scatterList, this.state.scatterList) && this.glChart !== null) {
        this.glChart.setOption({
          series: [{}, {
            data: this.formatScatterList(this.state.scatterList)
          }]
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.glChart) {
        this.glChart.dispose();
      }

      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var backgroundColor = this.state.backgroundColor;
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          height: '100%',
          width: '100%',
          background: backgroundColor
        },
        ref: this.mapRef
      });
    }
  }]);

  return CustomComp;
}(_react.Component);

var _default = CustomComp;
exports.default = _default;