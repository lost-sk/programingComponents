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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TreeNode = _antd.Tree.TreeNode;

var listToTree = function listToTree(list) {
  var map = {};
  var tree = []; // 将列表中的每个项按照id映射到map对象中

  list.forEach(function (item) {
    map[item.id] = _objectSpread(_objectSpread({}, item), {}, {
      children: []
    });
  }); // 将每个项连接到其父项

  list.forEach(function (item) {
    if (item.parentTemplate.id && item.parentTemplate.id !== 10) {
      if (map[item.parentTemplate.id]) {
        //假如元素的父节点已经被过滤掉了 就 不添加子节点
        map[item.parentTemplate.id].children.push(map[item.id]);
      }
    } else {
      tree.push(map[item.id]);
    }
  });
  return tree;
};

var tree2list = function tree2list(tree) {
  var list = []; // 辅助函数，用于递归遍历树形结构

  var traverse = function traverse(node) {
    list.push(_objectSpread(_objectSpread({}, node), {}, {
      // 如果存在父节点ID，则添加parentTemplate属性
      parentTemplate: node.parent ? {
        id: node.parent.id
      } : undefined
    })); // 递归处理子节点

    node.children.forEach(function (child) {
      return traverse(child);
    });
  }; // 遍历树的根节点


  tree.forEach(function (root) {
    return traverse(root);
  });
  return list;
};

var getParentKey = function getParentKey(key, tree) {
  var parentKey;

  for (var i = 0; i < tree.length; i++) {
    var node = tree[i];

    if (node.children) {
      if (node.children.some(function (item) {
        return item.key === key;
      })) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }

  return parentKey;
};

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

    _this2.getSelectedValue = function () {
      var _this2$state = _this2.state,
          checkedKeys = _this2$state.checkedKeys,
          dataList = _this2$state.dataList;
      return dataList.filter(function (d) {
        return checkedKeys.includes(d.id.toString());
      });
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

    _this2.onExpand = function (expandedKeys) {
      //console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      _this2.setState({
        expandedKeys: expandedKeys,
        autoExpandParent: false
      });
    };

    _this2.onCheck = function (checkedKeys) {
      //console.log('onCheck', checkedKeys)
      _this2.setState({
        checkedKeys: checkedKeys
      });
    };

    _this2.onSelect = function (selectedKeys, info) {
      //console.log('onSelect', info)
      _this2.setState({
        selectedKeys: selectedKeys
      });
    };

    _this2.renderTreeNodes = function (data) {
      return data.map(function (item) {
        if (item.children.length > 0) {
          return /*#__PURE__*/_react.default.createElement(TreeNode, {
            title: item.displayName,
            key: item.id,
            dataRef: item
          }, _this2.renderTreeNodes(item.children));
        }

        return /*#__PURE__*/_react.default.createElement(TreeNode, {
          key: item.id,
          title: item.displayName,
          dataRef: item
        });
      });
    };

    var config = props?.data?._attrObject.data || {};
    console.log('templateTree this.props.config', config);
    _this2.interval = null;
    _this2.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      interval: config?.interval?.value || '0',
      //定时刷新时间
      isDesign: props.isDesign === true ? true : false,
      backgroundColor: config?.backgroundColor?.color || '',
      filterString: config?.filterString?.value || '',
      loading: true,
      dataList: [],
      //服务返回存放
      templateTree: [],
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: []
    };
    return _this2;
  }

  _createClass(CustomComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      scriptUtil.registerReactDom(this, this.props);
      var filterString = this.state.filterString;
      var filterArr = filterString.split(',');
      var ticket = localStorage.getItem('ticket') || '';
      fetch("/inter-api/oodm-gateway/template/search?keyword=&pageIndex=1&pageSize=2000", {
        headers: {
          Authorization: "Bearer ".concat(ticket)
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        var list = data.data.data || [];
        var systemTemplate = ['RemoteCollector', 'LinkObject', 'VideoObject', 'HistoryVideoObject', 'AECollector', 'sim_model'];
        var EntityList = list.filter(function (l) {
          return l.type === 'ENTITY' && !systemTemplate.includes(l.enName) && !filterArr.includes(l.enName);
        });
        var templateTree = listToTree(EntityList);
        EntityList = tree2list(templateTree);

        _this3.setState({
          dataList: EntityList,
          templateTree: templateTree,
          loading: false
        });
      }).catch(function (error) {
        _this3.setState({
          loading: false
        });

        console.error('Error:', error);
      });
      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
    /**
     *
     * @param {*} service oodm服务
     * @param {*} attr 服务返回存放位置
     */

  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          loading = _this$state.loading,
          templateTree = _this$state.templateTree;
      return /*#__PURE__*/_react.default.createElement("div", null, loading ? /*#__PURE__*/_react.default.createElement(_antd.Spin, null) : /*#__PURE__*/_react.default.createElement(_antd.Tree, {
        checkable: true,
        onExpand: this.onExpand,
        expandedKeys: this.state.expandedKeys,
        autoExpandParent: this.state.autoExpandParent,
        onCheck: this.onCheck,
        checkedKeys: this.state.checkedKeys,
        onSelect: this.onSelect,
        selectedKeys: this.state.selectedKeys
      }, this.renderTreeNodes(templateTree)));
    }
  }]);

  return CustomComp;
}(_react.Component);

var _default = CustomComp;
exports.default = _default;