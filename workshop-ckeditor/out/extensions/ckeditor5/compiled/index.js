"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var CkEditorReact = _interopRequireWildcard(require("./ckeditor5-react"));

var ClassicEditor = _interopRequireWildcard(require("./ckeditor5-build-classic"));

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

//import { CKEditor } from '@ckeditor/ckeditor5-react'
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import _ from 'lodash'
var CKEditor = CkEditorReact.CKEditor;

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

    var config = props?.data?._attrObject.data || {};
    console.log('ckeditor5 this.props config', config);
    _this2.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      backgroundColor: config?.backgroundColor?.color || '#0D2C69',
      zoom: config?.zoom?.value || '1.33',
      trigger: config?.trigger?.value || 'click',
      innerHtml: config?.htmlDetail || ''
    };
    return _this2;
  }

  _createClass(CustomComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // scriptUtil.registerReactDom(this, this.props)
      // if (!_.isEmpty(this.state.service)) {
      //   this.getServiceData()
      // }
      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息'); // if (Number.isInteger(+interval) && +interval > 0) {
      //   this.interval = setInterval(() => {
      //     if (!_.isEmpty(this.state.service)) {
      //       this.getServiceData()
      //     }
      //   }, +interval * 1000)
      // }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "render",
    value: // getServiceData = () => {
    //   const { service } = this.state
    //   var objName = ''
    //   var serviceName = ''
    //   var params = {}
    //   if (service.key == 'template') {
    //     objName = service.selectedTemplate.namespace + '.' + service.selectedTemplate.name
    //   } else {
    //     objName =
    //       service.selectedTemplate.namespace +
    //       '.' +
    //       service.selectedTemplate.name +
    //       '/' +
    //       service.selectedInstance.name
    //   }
    //   if (service.subTab == 'service') {
    //     serviceName = service.selectedProp.namespace + '.' + service.selectedProp.name
    //   } else {
    //     serviceName = 'system.getPropertyValue'
    //     params = {
    //       propName: service.selectedProp.propertyName,
    //     }
    //   }
    //   scriptUtil.executeScriptService({
    //     objName, // 模板 或者 实例
    //     serviceName, // 服务的命名空间+服务别名
    //     // 入参
    //     params,
    //     version: 'V2',
    //     // 回调函数
    //     cb: (res) => {
    //       this.setState({
    //         dataList: res.data.list,
    //       })
    //     },
    //   })
    // }
    // transHtml = (visible, value) => {
    //   const { innerHtml } = this.state
    //   if (visible) {
    //     const regex = /\${(.*?)}/g
    //     const replacedStr = innerHtml.replace(regex, (match, captured) => {
    //       return value[captured] || ''
    //     })
    //     return replacedStr
    //   } else {
    //     return ''
    //   }
    // }
    function render() {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(CKEditor, {
        editor: ClassicEditor,
        data: "<p>Hello from CKEditor\xA05!</p>",
        onReady: function onReady(editor) {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        },
        onChange: function onChange(event) {
          console.log(event);
        },
        onBlur: function onBlur(event, editor) {
          console.log('Blur.', editor);
        },
        onFocus: function onFocus(event, editor) {
          console.log('Focus.', editor);
        }
      }));
    }
  }]);

  return CustomComp;
}(_react.Component);

var _default = CustomComp;
exports.default = _default;