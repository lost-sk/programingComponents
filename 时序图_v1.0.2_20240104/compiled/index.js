"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _highcharts = _interopRequireDefault(require("./highcharts"));

var _sankey = _interopRequireDefault(require("./sankey"));

var _timeline = _interopRequireDefault(require("./timeline"));

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

//时序图插件
(0, _timeline.default)(_highcharts.default);

var CustomComp = /*#__PURE__*/function (_Component) {
  _inherits(CustomComp, _Component);

  var _super = _createSuper(CustomComp);

  function CustomComp(props) {
    var _this2;

    _classCallCheck(this, CustomComp);

    _this2 = _super.call(this, props);

    _this2.chartLoad = function () {
      var _this2$state = _this2.state,
          theme = _this2$state.theme,
          backgroundColor = _this2$state.backgroundColor,
          borderColor = _this2$state.borderColor,
          labelColor = _this2$state.labelColor,
          chartTitle = _this2$state.chartTitle,
          titleFontColor = _this2$state.titleFontColor,
          subTitle = _this2$state.subTitle,
          subTitleFontColor = _this2$state.subTitleFontColor,
          setColors = _this2$state.setColors,
          toolTip = _this2$state.toolTip,
          inverted = _this2$state.inverted,
          toolTipBackgroundColor = _this2$state.toolTipBackgroundColor,
          toolTipBorderColor = _this2$state.toolTipBorderColor,
          toolTipBorderRadius = _this2$state.toolTipBorderRadius,
          toolTipBorderWidth = _this2$state.toolTipBorderWidth,
          toolTipShadow = _this2$state.toolTipShadow,
          toolTipFontColor = _this2$state.toolTipFontColor,
          dataList = _this2$state.dataList;

      var _this = _assertThisInitialized(_this2);

      var color = null; // 获取颜色配置

      if (setColors.length == 0) {
        color = colorList[theme];
      } else {
        color = setColors.map(function (i) {
          return i.content;
        });
      }

      var chartOption = {
        chart: {
          type: 'timeline',
          inverted: JSON.parse(inverted),
          backgroundColor: backgroundColor
        },
        xAxis: {
          visible: false
        },
        yAxis: {
          visible: false
        },
        title: chartTitle.length == 0 ? false : {
          text: chartTitle,
          style: {
            color: titleFontColor
          }
        },
        subtitle: {
          text: subTitle,
          style: {
            color: subTitleFontColor
          }
        },
        colors: color,
        series: [{
          data: dataList,
          dataLabels: {
            color: labelColor,
            borderColor: borderColor
          }
        }],
        tooltip: JSON.parse(toolTip) ? {
          backgroundColor: toolTipBackgroundColor,
          // 背景颜色
          borderColor: toolTipBorderColor,
          // 边框颜色
          borderRadius: toolTipBorderRadius,
          // 边框圆角
          borderWidth: toolTipBorderWidth,
          // 边框宽度
          shadow: JSON.parse(toolTipShadow),
          // 是否显示阴影
          outside: true,
          style: {
            color: toolTipFontColor,
            zIndex: 100
          }
        } : false,
        plotOptions: {
          series: {
            cursor: 'pointer',
            events: {
              click: function click(event) {
                _this.setPointHandle();
              }
            }
          }
        },
        credits: {
          enabled: false
        }
      }; //将当前配置项保存至state

      _this2.setState({
        chartOption: chartOption
      });

      _this2.mapChart = _highcharts.default.chart(_this2.mapRef.current, chartOption);
    };

    _this2.setPointHandle = function (e) {
      _this2.runCode('onClick', '点击事件脚本错误,请打开控制台查看错误信息');
    };

    _this2.getValue = function () {
      return {
        dataList: _this2.state.dataList
      };
    };

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
        var _this = _assertThisInitialized(_this2); //new function中codeStr脚本可以通过固定的_this来获取当前组件的this


        new Function('_this', codeStr)(_this);
        console.log();
      } catch (error) {
        console.error(error);
        notification.error({
          message: '可编程组件',
          description: message
        });
      }
    };

    _this2.getServiceData = function () {
      var _this = _assertThisInitialized(_this2);

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

      return new Promise(function (resolve, reject) {
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
            var resData = res.data.list;

            _this.setState({
              dataList: resData
            });

            resolve('ok');
          }
        });
      });
    };

    _this2.setSource = function (data) {
      var chartOption = _this2.state.chartOption;
      chartOption.series[0].data = data;

      _this2.setState({
        chartOption: chartOption,
        dataList: data
      });

      _this2.mapChart.series[0].update({
        data: data
      });
    };

    var config = props?.data?._attrObject.data || {};
    console.log('map this.props config', config);
    _this2.mapRef = /*#__PURE__*/(0, _react.createRef)(null);
    _this2.interval = null;
    _this2.mapChart = null;
    _this2.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      //数据源
      theme: config?.theme?.value || "blue",
      //主题
      inverted: config?.inverted?.value || "false",
      //图表方向
      backgroundColor: config?.backgroundColor?.color || '#0D2C6900',
      //背景颜色
      linkColor: config?.linkColor?.color || '#2A2A2A',
      //连线颜色
      linkLineWidth: config?.linkLineWidth?.value || 1,
      //连线宽度
      borderColor: config?.borderColor?.color || '#2479EF',
      //卡片边框颜色
      labelColor: config?.labelColor?.color || '#f0f0f0',
      //内容文字颜色
      chartTitle: config?.chartTitle?.value || '时序图',
      //标题
      titleFontColor: config?.titleFontColor?.color || '#000000',
      //标题颜色
      subTitle: config?.subTitle?.value || '时序图',
      //副标题
      subTitleFontColor: config?.subTitleFontColor?.color || '#000000',
      //副标题颜色
      nodeWidth: config?.nodeWidth?.value || '60',
      //卡片高度
      setColors: config?.setColors || [],
      //颜色序列
      colorByPoint: config?.colorByPoint?.value || "true",
      //使用默认全局配色
      toolTip: config?.toolTip?.value || "true",
      //提示框显示
      toolTipBackgroundColor: config?.toolTipBackgroundColor?.color || '#FFFFFF',
      // 背景颜色
      toolTipBorderColor: config?.toolTipBorderColor?.color || '#3EE6F8',
      // 边框颜色
      toolTipFontColor: config?.toolTipFontColor?.color || '#000000',
      // 边框颜色
      toolTipBorderRadius: config?.toolTipBorderRadius?.value || 6,
      // 边框圆角
      toolTipBorderWidth: config?.toolTipBorderWidth?.value || 1,
      // 边框宽度
      toolTipShadow: config?.toolTipShadow?.value || "true",
      // 是否显示阴影
      dataList: [],
      cardVisible: false,
      offsetX: 0,
      offsetY: 0,
      chartOption: {},
      clickItem: {}
    };
    return _this2;
  }

  _createClass(CustomComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      scriptUtil.registerReactDom(this, this.props); //注册组件实例

      if (this.props.isDesign) {
        console.log('组态期');
        this.setState({
          dataList: mockList
        });
        this.chartLoad();
        return;
      }

      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息');

      if (!_.isEmpty(this.state.service)) {
        //数据源判断 取值
        this.getServiceData().then(function () {
          _this3.chartLoad();
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (!_.isEqual(prevState.dataList, this.state.dataList)) {
        if (this.mapChart) {
          this.mapChart.legend.destroy();

          if (this.props.isDesign) {
            this.chartLoad();
            return;
          }
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.mapChart) {
        this.mapChart.legend.destroy();
      }
    } //图表加载

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          height: '100%',
          width: '100%'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
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
var colorList = {
  blue: ['#2196f3', '#1e88e5', '#1565c0', '#2962ff', '#0d47a1', '#363C46'],
  teal: ['#b2dfdb', '#4db6ac', '#009688', '#00796b', '#00695c', '#004d40'],
  green: ['#c8e6c9', '#81c784', '#66bb6a', '#43a047', '#2e7d32', '#1b5e20'],
  yellow: ['#fff9c4', '#fff176', '#ffeb3b', '#fdd835', '#fbc02d', '#f57f17'],
  orange: ['#ffcc80', '#ffb74d', '#ff9800', '#f57c00', '#ef6c00', '#e65100']
};
var mockList = [{
  name: '首次生物',
  label: '1951：第一批太空犬',
  description: '1951年7月22日第一批狗（Dezik 和 Tsygan）送上太空'
}, {
  name: '人造卫星',
  label: '1957: 第一颗人造卫星',
  description: '1957年十月4日，发射第一颗人造卫星，第一次接收到来自太空的信号'
}, {
  name: '载人航天',
  label: '1961：首次载人航天(尤里加加林)',
  description: '首次载人航天(尤里加加林)，首次载人轨道飞行'
}, {
  name: '登陆月球',
  label: '1969：人类首次登陆月球',
  description: 'First human on the Moon, and first space launch from a celestial body other than the Earth. First sample return from the Moon'
}, {
  name: '空间站',
  label: '1971: 第一个太空空间站',
  description: 'Salyut 1 was the first space station of any kind, launched into low Earth orbit by the Soviet Union on April 19, 1971.'
}, {
  name: '阿波罗-联盟号试验计划',
  label: '1975: First multinational manned mission',
  description: 'The mission included both joint and separate scientific experiments, and provided useful engineering experience for future joint US–Russian space flights, such as the Shuttle–Mir Program and the International Space Station.'
}];