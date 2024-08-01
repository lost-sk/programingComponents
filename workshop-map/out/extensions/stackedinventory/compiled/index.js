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

//import _ from 'lodash'
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
            percent: res.data
          });
        }
      });
    };

    _this2.getValue = function () {
      return _this2.state.percent;
    };

    _this2.setValue = function (percent) {
      _this2.setState({
        percent: percent
      });
    };

    console.log('square this.props', _this2.props);
    var config = props?.data?._attrObject.data || {};
    _this2.state = {
      percent: 50,
      fontSize: config?.fontSize?.value || '14px',
      fontFamily: config?.fontFamily?.value || 'sans-serif',
      fontColor: config?.fontColor?.color || '#000',
      service: config?.object?.dynamicDataSource || {},
      squareColor: config?.squareColor?.color || '#FFB5B5',
      squareBoldColor: config?.squareBoldColor?.color || '#A0A0A0',
      showText: config?.showText?.value || 'true',
      events: config?.events || []
    };
    return _this2;
  }

  _createClass(CustomComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('square this.state', this.state);
      scriptUtil.registerReactDom(this, this.props);

      if (!_.isEmpty(this.state.service)) {
        this.getServiceData();
      }

      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息');
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          percent = _this$state.percent,
          fontSize = _this$state.fontSize,
          fontFamily = _this$state.fontFamily,
          fontColor = _this$state.fontColor,
          squareColor = _this$state.squareColor,
          squareBoldColor = _this$state.squareBoldColor,
          showText = _this$state.showText;
      return /*#__PURE__*/_react.default.createElement("i", {
        style: {
          color: squareColor,
          height: '100%',
          width: '100%',
          display: 'block'
        }
      }, /*#__PURE__*/_react.default.createElement("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 100 100",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/_react.default.createElement("g", {
        stroke: "none",
        "stroke-width": "1",
        fill: "currentColor",
        "fill-rule": "evenodd",
        "stroke-linejoin": "round"
      }, /*#__PURE__*/_react.default.createElement("path", {
        style: {
          opacity: percent > 0 ? 1 : 0.4
        },
        d: "M38.3671378,58.4250148 L73.9721126,45.5608628 C74.4915344,45.3731946 75.0647442,45.6421341 75.2524124,46.1615559 C75.3317504,46.381145 75.3317504,46.6215736 75.2524124,46.8411627 L62.3882604,82.4461374 C62.0852483,83.2848043 61.4248479,83.9452047 60.586181,84.2482169 L24.9812062,97.1123688 C24.4617844,97.3000371 23.8885746,97.0310976 23.7009064,96.5116757 C23.6215684,96.2920866 23.6215684,96.0516581 23.7009064,95.832069 L36.5650584,60.2270942 C36.8680705,59.3884273 37.5284709,58.7280269 38.3671378,58.4250148 Z",
        id: "square4",
        stroke: squareBoldColor,
        "stroke-width": "2",
        transform: "translate(49.476659, 71.336616) rotate(45.000000) translate(-49.476659, -71.336616) "
      }), /*#__PURE__*/_react.default.createElement("path", {
        style: {
          opacity: percent > 25 ? 1 : 0.4
        },
        d: "M38.3671378,44.471696 L73.9721126,31.607544 C74.4915344,31.4198758 75.0647442,31.6888153 75.2524124,32.2082371 C75.3317504,32.4278262 75.3317504,32.6682548 75.2524124,32.8878439 L62.3882604,68.4928186 C62.0852483,69.3314855 61.4248479,69.9918859 60.586181,70.2948981 L24.9812062,83.15905 C24.4617844,83.3467183 23.8885746,83.0777788 23.7009064,82.5583569 C23.6215684,82.3387678 23.6215684,82.0983393 23.7009064,81.8787502 L36.5650584,46.2737754 C36.8680705,45.4351085 37.5284709,44.7747081 38.3671378,44.471696 Z",
        id: "square3",
        stroke: squareBoldColor,
        "stroke-width": "2",
        transform: "translate(49.476659, 57.383297) rotate(45.000000) translate(-49.476659, -57.383297) "
      }), /*#__PURE__*/_react.default.createElement("path", {
        style: {
          opacity: percent > 50 ? 1 : 0.4
        },
        d: "M38.3671378,30.5183772 L73.9721126,17.6542252 C74.4915344,17.466557 75.0647442,17.7354965 75.2524124,18.2549183 C75.3317504,18.4745074 75.3317504,18.714936 75.2524124,18.934525 L62.3882604,54.5394998 C62.0852483,55.3781667 61.4248479,56.0385671 60.586181,56.3415792 L24.9812062,69.2057312 C24.4617844,69.3933994 23.8885746,69.12446 23.7009064,68.6050381 C23.6215684,68.385449 23.6215684,68.1450204 23.7009064,67.9254314 L36.5650584,32.3204566 C36.8680705,31.4817897 37.5284709,30.8213893 38.3671378,30.5183772 Z",
        id: "square2",
        stroke: squareBoldColor,
        "stroke-width": "2",
        transform: "translate(49.476659, 43.429978) rotate(45.000000) translate(-49.476659, -43.429978) "
      }), /*#__PURE__*/_react.default.createElement("path", {
        style: {
          opacity: percent > 75 ? 1 : 0.4
        },
        d: "M38.3671378,16.5650584 L73.9721126,3.70090638 C74.4915344,3.51323816 75.0647442,3.78217765 75.2524124,4.30159952 C75.3317504,4.5211886 75.3317504,4.76161717 75.2524124,4.98120624 L62.3882604,40.586181 C62.0852483,41.4248479 61.4248479,42.0852483 60.586181,42.3882604 L24.9812062,55.2524124 C24.4617844,55.4400806 23.8885746,55.1711412 23.7009064,54.6517193 C23.6215684,54.4321302 23.6215684,54.1917016 23.7009064,53.9721126 L36.5650584,18.3671378 C36.8680705,17.5284709 37.5284709,16.8680705 38.3671378,16.5650584 Z",
        id: "square1",
        stroke: squareBoldColor,
        "stroke-width": "2",
        transform: "translate(49.476659, 29.476659) rotate(45.000000) translate(-49.476659, -29.476659) "
      }), /*#__PURE__*/_react.default.createElement("text", {
        x: "50%",
        y: "50%",
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        "text-align": "center",
        style: {
          fontSize: fontSize,
          fontFamily: fontFamily,
          fill: fontColor,
          opacity: showText === 'true' ? 1 : 0
        }
      }, "".concat(percent, "%")))));
    }
  }]);

  return CustomComp;
}(_react.Component);

var _default = CustomComp;
exports.default = _default;