"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

require("./index.css");

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
            valueList: res?.data?.list || []
          });
        }
      });
    };

    _this2.getHtml = function () {
      return _this2.state.innerHtml;
    };

    _this2.setHtml = function (innerHtml) {
      _this2.setState({
        innerHtml: innerHtml
      });
    };

    _this2.transHtml = function (value) {
      var innerHtml = _this2.state.innerHtml;
      var regex = /\${(.*?)}/g;
      var replacedStr = innerHtml.replace(regex, function (match, captured) {
        return value[captured] || '';
      });
      return replacedStr;
    };

    console.log('card this.props config', props?.data?._attrObject.data);
    var config = props?.data?._attrObject.data || {};
    _this2.state = {
      valueList: [{
        title: 'default title'
      }, {
        title: 'default title'
      }],
      fontSize: config?.fontSize?.value || '14px',
      fontFamily: config?.fontFamily?.value || 'sans-serif',
      fontColor: config?.fontColor?.color || '#000',
      fontBorder: config?.fontBorder?.value || 'normal',
      headHeight: config?.headHeight?.value || '55px',
      cardWidth: config?.cardWidth?.value || '100px',
      cardMargin: config?.cardMargin?.value || '6px',
      headBackground: config?.headBackground?.color || '#FFF',
      bodyBackground: config?.bodyBackground?.color || '#FFF',
      innerHtml: config?.htmlDetail || '<div>default body</div>',
      direction: config?.direction?.value || 'row',
      showBorder: config?.showBorder?.value || 'true',
      borderColor: config?.borderColor?.color || '#e8e8e8',
      service: config?.object?.dynamicDataSource || {},
      events: config?.events || []
    };
    return _this2;
  }

  _createClass(CustomComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('card this.state', this.state);
      scriptUtil.registerReactDom(this, this.props);

      if (!_.isEmpty(this.state.service)) {
        this.getServiceData();
      }

      this.props.setScrollable(true);
      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息');
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          valueList = _this$state.valueList,
          fontSize = _this$state.fontSize,
          fontFamily = _this$state.fontFamily,
          fontColor = _this$state.fontColor,
          showBorder = _this$state.showBorder,
          borderColor = _this$state.borderColor,
          cardWidth = _this$state.cardWidth,
          cardMargin = _this$state.cardMargin,
          fontBorder = _this$state.fontBorder,
          headHeight = _this$state.headHeight,
          headBackground = _this$state.headBackground,
          bodyBackground = _this$state.bodyBackground,
          direction = _this$state.direction;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "cardSet",
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: direction,
          flexWrap: 'wrap',
          overflow: 'auto'
        }
      }, valueList.map(function (v) {
        var htmlStr = {
          __html: _this3.transHtml(v)
        };
        return /*#__PURE__*/_react.default.createElement(_antd.Card, {
          title: v.title,
          bordered: showBorder === 'true' ? true : false,
          headStyle: {
            fontSize: fontSize,
            fontFamily: fontFamily,
            color: fontColor,
            height: headHeight,
            minHeight: '20px',
            fontWeight: fontBorder,
            backgroundColor: headBackground,
            display: 'flex',
            alignItems: 'center'
          },
          bodyStyle: {
            borderTop: "2px solid ".concat(borderColor),
            backgroundColor: bodyBackground
          },
          style: {
            border: "1px solid ".concat(borderColor),
            minWidth: cardWidth,
            margin: cardMargin
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          dangerouslySetInnerHTML: htmlStr
        }));
      }));
    }
  }]);

  return CustomComp;
}(_react.Component);

var _default = CustomComp;
exports.default = _default;