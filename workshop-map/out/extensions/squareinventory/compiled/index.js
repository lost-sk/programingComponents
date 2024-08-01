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

    _this2.renderSvg = function (visible) {
      var _this2$state = _this2.state,
          squareHeight = _this2$state.squareHeight,
          squareWeight = _this2$state.squareWeight,
          squareColor = _this2$state.squareColor,
          squareBorderColor = _this2$state.squareBorderColor,
          showBorder = _this2$state.showBorder;
      return /*#__PURE__*/_react.default.createElement("i", {
        style: {
          width: squareWeight,
          height: squareHeight,
          color: squareColor,
          display: 'inline-block',
          margin: '2px',
          opacity: visible ? 1 : 0.3,
          border: showBorder === 'true' ? "solid 2px ".concat(squareBorderColor) : 'none'
        }
      }, /*#__PURE__*/_react.default.createElement("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 100 100",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/_react.default.createElement("g", {
        fill: "currentColor"
      }, /*#__PURE__*/_react.default.createElement("rect", {
        width: "100",
        height: "100"
      }))));
    };

    _this2.renderPart = function (percent, level) {
      var n = 0;

      switch (level) {
        case 4:
          n = percent; //0~40

          break;

        case 3:
          n = percent - 40; //41~70 -> 1 ~ 30

          break;

        case 2:
          n = percent - 70; //71~90 -> 1 ~ 20

          break;

        case 1:
          n = percent - 90; //91~100 -> 1 ~ 10

          break;
      }

      var svgs = [];

      for (var i = 0; i < level; i++) {
        svgs.push(_this2.renderSvg(n > i * 10 ? true : false));
      }

      return svgs;
    };

    var config = props?.data?._attrObject.data || {};
    console.log('square this.props config', config);
    _this2.state = {
      percent: 50,
      fontSize: config?.fontSize?.value || '32px',
      fontFamily: config?.fontFamily?.value || 'sans-serif',
      fontColor: config?.fontColor?.color || '#0000',
      service: config?.object?.dynamicDataSource || {},
      squareHeight: config?.squareHeight?.value || '32px',
      squareWeight: config?.squareWeight?.value || '32px',
      squareColor: config?.squareColor?.color || '#FFB5B5',
      squareBorderColor: config?.squareBorderColor?.color || '#f33',
      showText: config?.showText?.value || 'true',
      showBorder: config?.showBorder?.value || 'true',
      squareDirection: config?.squareDirection?.value || 'left',
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
          squareDirection = _this$state.squareDirection,
          fontSize = _this$state.fontSize,
          fontFamily = _this$state.fontFamily,
          fontColor = _this$state.fontColor,
          showText = _this$state.showText;
      var spanStyle = {
        position: 'absolute',
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontColor: fontColor
      };
      Object.assign(spanStyle, squareDirection === 'right' ? {
        left: '10px'
      } : {
        right: '10px'
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          position: 'relative',
          direction: squareDirection === 'right' ? 'rtl' : 'ltr'
        }
      }, /*#__PURE__*/_react.default.createElement("div", null, this.renderPart(percent, 1), showText === 'true' && /*#__PURE__*/_react.default.createElement("span", {
        style: spanStyle
      }, "".concat(percent, "%"))), /*#__PURE__*/_react.default.createElement("div", null, this.renderPart(percent, 2)), /*#__PURE__*/_react.default.createElement("div", null, this.renderPart(percent, 3)), /*#__PURE__*/_react.default.createElement("div", null, this.renderPart(percent, 4)));
    }
  }]);

  return CustomComp;
}(_react.Component);

var _default = CustomComp;
exports.default = _default;