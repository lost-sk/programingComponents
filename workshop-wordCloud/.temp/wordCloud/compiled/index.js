"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var echarts = _interopRequireWildcard(require("./echarts"));

require("./echarts-wordcloud");

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
// import 'echarts-wordcloud'
// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
// }
var CustomComp = /*#__PURE__*/function (_Component) {
  _inherits(CustomComp, _Component);

  var _super = _createSuper(CustomComp);

  function CustomComp(props) {
    var _this2;

    _classCallCheck(this, CustomComp);

    _this2 = _super.call(this, props);

    _this2.runCode = function (key, msg) {
      var events = _.get(_this2.state, 'config.events', []);

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

    _this2.onChange = function (value) {
      _this2.setState({
        value: value
      }, function () {
        _this2.runCode('onChange', '内容改变事件脚本错误,请打开控制台查看错误信息');
      });
    };

    console.log('wordCloud this.props', _this2.props);
    _this2.mapRef = /*#__PURE__*/(0, _react.createRef)(null);
    _this2.mapChart = null;
    var config = props?.data?._attrObject.data || {};
    _this2.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {}
    };
    return _this2;
  }

  _createClass(CustomComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      scriptUtil.registerReactDom(this, this.props);
      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息');
      this.mapChart = echarts.init(this.mapRef.current);
      var option = {
        tooltip: {},
        series: [{
          type: 'wordCloud',
          // size of the grid in pixels for marking the availability of the canvas
          // the larger the grid size, the bigger the gap between words.
          gridSize: 20,
          sizeRange: [12, 80],
          rotationRange: [-90, 90],
          rotationStep: 90,
          //shape: 'circle',
          width: '100%',
          height: '100%',
          // set to true to allow word to be drawn partly outside of the canvas.
          // Allow word bigger than the size of the canvas to be drawn
          // This option is supported since echarts-wordcloud@2.1.0
          //drawOutOfBound: true,
          // if the font size is too large for the text to be displayed,
          // whether to shrink the text. If it is set to false, the text will
          // not be rendered. If it is set to true, the text will be shrinked.
          // This option is supported since echarts-wordcloud@2.1.0
          shrinkToFit: true,
          textStyle: {
            color: function color() {
              return 'rgb(' + [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',') + ')';
            }
          },
          data: [{
            name: 'Sam S Club',
            value: 80,
            textStyle: {
              color: 'black'
            }
          }, {
            name: 'Macys',
            value: 50
          }, {
            name: 'Amy Schumer',
            value: 30
          }, {
            name: 'Jurassic World',
            value: 30
          }, {
            name: 'Charter Communications',
            value: 18
          }, {
            name: 'Chick Fil A',
            value: 12
          }, {
            name: 'Planet Fitness',
            value: 40
          }, {
            name: 'Pitch Perfect',
            value: 59
          }, {
            name: 'Express',
            value: 43
          }, {
            name: 'Home',
            value: 26
          }, {
            name: 'Johnny Depp',
            value: 47
          }, {
            name: 'Lena Dunham',
            value: 52
          }, {
            name: 'Lewis Hamilton',
            value: 55
          }, {
            name: 'KXAN',
            value: 50
          }, {
            name: 'Mary Ellen Mark',
            value: 42
          }, {
            name: 'Farrah Abraham',
            value: 36
          }, {
            name: 'Rita Ora',
            value: 36
          }, {
            name: 'Serena Williams',
            value: 28
          }, {
            name: 'NCAA baseball tournament',
            value: 23
          }, {
            name: 'Point Break',
            value: 26
          }]
        }]
      };
      this.mapChart.setOption(option);
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