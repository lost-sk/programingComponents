"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _highcharts = _interopRequireDefault(require("./highcharts"));

var _wordcloud = _interopRequireDefault(require("./wordcloud"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

(0, _wordcloud.default)(_highcharts.default); // import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
// }

var text = 'quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.';
var textData = text.split(/[,\. ]+/g).reduce(function (arr, word) {
  var obj = arr.find(function (obj) {
    return obj.name === word;
  });

  if (obj) {
    obj.weight += 1;
  } else {
    obj = {
      name: word,
      weight: 1
    };
    arr.push(obj);
  }

  return arr;
}, []);

var CustomComp = /*#__PURE__*/function (_Component) {
  _inherits(CustomComp, _Component);

  var _super = _createSuper(CustomComp);

  function CustomComp(props) {
    var _this2;

    _classCallCheck(this, CustomComp);

    _this2 = _super.call(this, props);

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

    _this2.runCode = function (key, msg, params) {
      var _this2$state$events = _this2.state.events,
          events = _this2$state$events === void 0 ? [] : _this2$state$events;
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

    _this2.mapRef = /*#__PURE__*/(0, _react.createRef)(null);
    _this2.mapChart = null;
    _this2.interval = null;
    var config = props?.data?._attrObject.data || {};
    _this2.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      isDesign: props.isDesign === true ? true : false,
      wordList: props.isDesign === true ? textData : [],
      interval: config?.interval?.value || '0',
      backgroundColor: config?.backgroundColor?.color || ''
    };
    return _this2;
  }

  _createClass(CustomComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      scriptUtil.registerReactDom(this, this.props);
      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息');
      var _this$state = this.state,
          wordList = _this$state.wordList,
          interval = _this$state.interval,
          service = _this$state.service,
          backgroundColor = _this$state.backgroundColor;
      this.mapChart = new _highcharts.default.Chart(this.mapRef.current, {
        series: [{
          type: 'wordcloud',
          data: wordList,
          events: {
            click: function click(e) {
              _this3.runCode('onClick', '点击事件执行错误', e.point.options);
            }
          }
        }],
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        chart: {
          backgroundColor: backgroundColor
        }
      });

      if (Number.isInteger(+interval) && +interval > 0) {
        this.interval = setInterval(function () {
          if (!_.isEmpty(service)) {
            _this3.execService(service, 'wordList');
          }
        }, +interval * 1000);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (!_.isEqual(prevState.wordList, this.state.wordList) && this.mapChart !== null) {
        this.mapChart.series[0].setData(this.state.wordList);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.mapChart) {
        this.mapChart.destroy();
      }

      if (this.interval) {
        clearInterval(this.interval);
      }
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