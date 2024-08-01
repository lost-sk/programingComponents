"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

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

// import * as echarts from 'echarts'
// import 'echarts-gl'
// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
//   executeScriptService: () => {},
// }
var CustomComp = /*#__PURE__*/function (_Component) {
  _inherits(CustomComp, _Component);

  var _super = _createSuper(CustomComp);

  function CustomComp(props) {
    var _this2;

    _classCallCheck(this, CustomComp);

    _this2 = _super.call(this, props);

    _this2.formatDataList = function () {
      var dataList = _this2.state.dataList;
      var formatArray = [];

      for (var i = 0; i < dataList.length; i++) {
        if (typeof dataList[i][0] === 'string' && typeof dataList[i][1] === 'string') {
          var arr1 = dataList[i][0].split('-').map(function (v) {
            return +v;
          });
          var arr2 = dataList[i][1].split('-').map(function (v) {
            return +v;
          });

          for (var j = arr1[0]; j <= arr1[1]; j++) {
            for (var k = arr2[0]; k <= arr2[1]; k++) {
              formatArray.push([j, k, dataList[i][2]]);
            }
          }
        }

        if (typeof dataList[i][0] === 'string' && typeof dataList[i][1] === 'number') {
          var arr = dataList[i][0].split('-').map(function (v) {
            return +v;
          });

          for (var _j = arr[0]; _j <= arr[1]; _j++) {
            formatArray.push([_j, dataList[i][1], dataList[i][2]]);
          }
        }

        if (typeof dataList[i][0] === 'number' && typeof dataList[i][1] === 'string') {
          var _arr = dataList[i][1].split('-').map(function (v) {
            return +v;
          });

          for (var _j2 = _arr[0]; _j2 <= _arr[1]; _j2++) {
            formatArray.push([dataList[i][0], _j2, dataList[i][2]]);
          }
        }

        if (typeof dataList[i][0] === 'number' && typeof dataList[i][1] === 'number') {
          formatArray.push(dataList[i]);
        }
      }

      return formatArray;
    };

    _this2.getServiceData = function () {
      var service = _this2.state.service;
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
          _this2.setState({
            dataList: res.data.list
          });
        }
      });
    };

    _this2.runCode = function (key, msg) {
      var events = _this2.state?.config?.events || [];
      events.forEach(function (item) {
        if (item.content === key) {
          _this2.runScript(item.detail, msg);
        }
      });
    };

    _this2.runScript = function (codeStr, message) {
      try {
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

    _this2.onChange = function (value) {
      _this2.setState({
        value: value
      }, function () {
        _this2.runCode('onChange', '内容改变事件脚本错误,请打开控制台查看错误信息');
      });
    };

    _this2.onEchartsInit = function () {
      var _this2$state = _this2.state,
          xAxisBars = _this2$state.xAxisBars,
          yAxisBars = _this2$state.yAxisBars,
          zAxisBars = _this2$state.zAxisBars,
          startColor = _this2$state.startColor,
          endColor = _this2$state.endColor,
          scatterList = _this2$state.scatterList;
      _this2.glChart = echarts.init(_this2.mapRef.current);
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
          } // axisLine: {
          //   lineStyle: {
          //     opacity: 0,
          //   },
          // },
          // axisLabel: {
          //   show: false,
          // },
          // axisTick: {
          //   show: false,
          // },
          // splitLine: {
          //   show: false,
          // },
          // axisPointer: {
          //   show: false,
          // },

        },
        series: [{
          type: 'bar3D',
          data: _this2.formatDataList(),
          barSize: 1,
          shading: 'color',
          itemStyle: {
            opacity: 0.3
          }
        }, {
          type: 'scatter3D',
          data: scatterList,
          symbol: 'path://M512.341333 799.274667c-164.522667-183.424-246.741333-329.216-246.741333-437.333334 0-162.218667 110.464-241.493333 246.741333-241.493333 136.234667 0 246.698667 79.317333 246.698667 241.450667 0 108.117333-82.261333 253.866667-246.698667 437.418666z m0-313.258667c75.690667 0 137.002667-58.453333 137.002667-130.56s-61.312-130.56-137.002667-130.56c-75.690667 0-137.045333 58.453333-137.045333 130.56s61.354667 130.56 137.045333 130.56z m-170.666666 155.733333l38.272 36.992c-71.424 16.896-118.954667 46.976-118.954667 81.322667 0 52.906667 112.384 95.658667 250.965333 95.658667 138.624 0 251.008-42.837333 251.008-95.658667 0-33.962667-46.506667-63.786667-116.650666-80.725333l38.016-36.864c77.909333 25.941333 128.853333 68.906667 128.853333 117.589333 0 79.274667-134.826667 143.445333-301.226667 143.445333-166.314667 0-301.141333-64.170667-301.141333-143.36 0-49.152 51.84-92.501333 130.901333-118.4h-0.042666z',
          symbolSize: 20,
          label: {
            show: true,
            distance: 0,
            position: 'top',
            formatter: function formatter(params) {
              return params.name || params.value[2];
            }
          }
        }, {
          type: 'line3D',
          data: [[60, 40, 15], [60, 100, 15], [80, 100, 15]],
          lineStyle: {
            width: 6
          }
        }]
      };

      _this2.glChart.setOption(option);
    };

    _this2.loadScript = function () {
      var version = _this2.props.data.getAttr('version');

      var widgetName = _this2.props.widgetName;
      var scriptElement = document.createElement('script');
      console.log('version', version, widgetName);
      console.log('this.props', _this2.props, _this2.props.data); //scriptElement.src = 'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js'

      scriptElement.src = "/inter-api/ide/components/1/".concat(widgetName, "/").concat(version, "?fileName=resources/plugin/static/echarts.js");

      scriptElement.onload = function () {
        console.log('echarts onload');
        document.body.appendChild(scriptElement2);
      };

      document.body.appendChild(scriptElement);
      var scriptElement2 = document.createElement('script'); //scriptElement2.src = 'https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js'

      scriptElement.src = "/inter-api/ide/components/1/".concat(widgetName, "/").concat(version, "?fileName=resources/plugin/static/echarts-gl.js");

      scriptElement2.onload = function () {
        console.log('echarts-gl onload');

        _this2.onEchartsInit();
      };
    };

    var config = props?.data?._attrObject.data || {};
    console.log('this.props config', config);
    _this2.mapRef = /*#__PURE__*/(0, _react.createRef)(null);
    _this2.glChart = null;
    _this2.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      xAxisBars: config?.xAxisBars?.value || '150',
      yAxisBars: config?.yAxisBars?.value || '250',
      zAxisBars: config?.zAxisBars?.value || '20',
      startColor: config?.startColor?.color || '#67C23A',
      endColor: config?.endColor?.color || '#F56C6C',
      dataList: [['1-10', '1-10', 10], [20, '30-60', 16]],
      scatterList: [{
        name: '主卫',
        value: [40, 40, 10]
      }, {
        name: '厕所1',
        value: [50, 50, 20]
      }]
    };
    return _this2;
  }

  _createClass(CustomComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      scriptUtil.registerReactDom(this, this.props);

      if (!_.isEmpty(this.state.service)) {
        this.getServiceData();
      }

      this.loadScript(); //this.onEchartsInit()

      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息');
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (!_.isEqual(prevState.dataList, this.state.dataList) && this.glChart !== null) {
        this.glChart.setOption({
          series: [{
            data: this.formatDataList()
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
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          height: '100%',
          width: '100%'
        },
        ref: this.mapRef
      }));
    }
  }]);

  return CustomComp;
}(_react.Component);

var _default = CustomComp;
exports.default = _default;