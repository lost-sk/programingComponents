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

    _this2.getValue = function () {
      return _this2.state.userInfo;
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
        //new function中codeStr脚本可以通过固定的_this来获取当前组件的this,通过params获取入参
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

    _this2.renderFunc = function () {
      var _this2$state = _this2.state,
          showType = _this2$state.showType,
          userInfo = _this2$state.userInfo;
      console.log('showType', showType);
      var text = '';

      switch (showType) {
        case '2':
          if (Array.isArray(userInfo.departments)) {
            var arr = userInfo.departments.map(function (u) {
              return u.name;
            });
            text = arr.join('、');
          }

          break;

        case '3':
          if (Array.isArray(userInfo.positions)) {
            var _arr = userInfo.positions.map(function (u) {
              return u.name;
            });

            text = _arr.join('、');
          }

          break;

        case '4':
          if (Array.isArray(userInfo.companies)) {
            var _arr2 = userInfo.companies.map(function (u) {
              return u.name;
            });

            text = _arr2.join('、');
          }

          break;

        case '5':
          if (Array.isArray(userInfo.userRoleList)) {
            var _arr3 = userInfo.userRoleList.map(function (u) {
              return u.name;
            });

            text = _arr3.join('、');
          }

          break;

        default:
          text = userInfo.username || userInfo.name || '';
          break;
      }

      return text;
    };

    var config = props?.data?._attrObject.data || {};
    console.log('user this.props', config);
    _this2.interval = null;
    _this2.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      isDesign: props.isDesign === true ? true : false,
      fontColor: config?.fontColor?.color || '',
      fontSize: config?.fontSize?.value || '16',
      fontWeight: config?.fontWeight?.value || '400',
      userInfo: {},
      showType: config?.showType?.value || '1' // 1 用户 2部门 3岗位 4公司 5 角色

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
        this.execService(service, 'dataList');
      } //定时请求服务


      if (+interval > 0) {
        this.interval = setInterval(function () {
          if (!_.isEmpty(service)) {
            _this3.execService(service, 'dataList');
          }
        }, +interval * 1000);
      }

      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息');
      var user = {};
      user = scriptUtil.getSessionUserInfo();
      var url = "/open-api/organization/v2/persons/".concat(user.staffCode);
      scriptUtil.request(url, {
        method: 'GET'
      }).then(function (res) {
        user = _objectSpread(_objectSpread({}, user), res);
        scriptUtil.getUserInfo(function (res2) {
          var roleList = res2?.userInfo?.userRoleList || [];
          user.userRoleList = roleList;

          _this3.setState({
            userInfo: user
          });
        });
      });
    }
    /**
     *
     * @param {*} service oodm服务
     * @param {*} attr 服务返回存放位置
     */

  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          fontColor = _this$state2.fontColor,
          fontSize = _this$state2.fontSize,
          fontWeight = _this$state2.fontWeight;
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          height: '100%',
          width: '100%',
          fontSize: fontSize + 'px',
          color: fontColor,
          fontWeight: fontWeight
        }
      }, this.renderFunc());
    }
  }]);

  return CustomComp;
}(_react.Component);

var _default = CustomComp;
exports.default = _default;