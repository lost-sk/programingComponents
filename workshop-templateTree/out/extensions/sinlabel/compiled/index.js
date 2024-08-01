"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

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

var CustomComp = /*#__PURE__*/function (_Component) {
  _inherits(CustomComp, _Component);

  var _super = _createSuper(CustomComp);

  function CustomComp(props) {
    var _this;

    _classCallCheck(this, CustomComp);

    _this = _super.call(this, props);

    _this.onClick = function () {
      _this.runCode('onClick', '点击标题事件脚本错误,请打开控制台查看错误信息');
    };

    _this.getValue = function () {
      var _this$state = _this.state,
          text = _this$state.text,
          diycolor = _this$state.diycolor,
          style = _this$state.style;
      var data = {};
      data.text = text;
      data.color = diycolor ? diycolor : style;
      return data;
    };

    _this.setValue = function (str) {
      _this.setState({
        text1: str
      });
    };

    _this.getData = function () {
      var dynamicDataSource = _.get(_this.state.config, 'object.dynamicDataSource', {});

      if (_.isEmpty(dynamicDataSource)) return;
      var objName = '';
      var serviceName = '';
      var params = {};

      if (dynamicDataSource.key == 'template') {
        objName = dynamicDataSource.selectedTemplate.namespace + '.' + dynamicDataSource.selectedTemplate.name;
      } else {
        objName = dynamicDataSource.selectedTemplate.namespace + '.' + dynamicDataSource.selectedTemplate.name + '/' + dynamicDataSource.selectedInstance.name;
      }

      if (dynamicDataSource.subTab == 'service') {
        serviceName = dynamicDataSource.selectedProp.namespace + '.' + dynamicDataSource.selectedProp.name;
      } else {
        serviceName = 'system.getPropertyValue';
        params = {
          propName: dynamicDataSource.selectedProp.propertyName
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
          // console.log(res, 'ressinlabel')
          _this.setState({});
        }
      });
    };

    _this.runCode = function (key, msg) {
      // console.log(this.state.config, 'configgg');
      var events = _.get(_this.state, 'config.event', []); // console.log(events, 'events');


      events.forEach(function (item) {
        if (item.content === key) {
          _this.runScript(item.detail, msg);
        }
      });
    };

    _this.runScript = function (codeStr, message) {
      try {
        new Function(codeStr)();
      } catch (error) {
        console.error(error);
        notification.error({
          message: '可编程组件',
          description: message
        });
      }
    };

    var config = props?.data?._attrObject.data || {};
    _this.state = {
      config: props.data._attrObject.data,
      diycolor: '',
      text: '',
      text1: config?.labelcon?.value ? config.labelcon.value : '标签'
    };
    return _this;
  }

  _createClass(CustomComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      scriptUtil.registerReactDom(this, this.props);

      if (this.props.isDesign) {
        this.setState({});
        return;
      }

      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息');
      var config = this.state.config; // console.log(config, 'sinlabel config');

      this.getData();
      this.setState({
        diycolor: _.get(config, 'diycolor.color'),
        text: _.get(config, 'labelcon.value'),
        style: _.get(config, 'style.value')
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      scriptUtil.logoutReactDom(this, this.props); /////////////多标签    服务单
    }
  }, {
    key: "render",
    value: function render() {
      var text1 = this.state.text1;

      var usediy = _.get(this.props, 'data._attrObject.data.usediy.value', 'false');

      var color = usediy === 'true' ? _.get(this.props, 'data._attrObject.data.diycolor.color') ? _.get(this.props, 'data._attrObject.data.diycolor.color') : _.get(this.props, 'data._attrObject.data.style.value', 'magenta') : _.get(this.props, 'data._attrObject.data.style.value', 'magenta');
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Tag, {
        onClick: this.onClick,
        style: {
          fontSize: _.get(this.props, 'data._attrObject.data.textsize.value', '12')
        },
        color: color
      }, text1));
    }
  }]);

  return CustomComp;
}(_react.Component);

var _default = CustomComp;
exports.default = _default;