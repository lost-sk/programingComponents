"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _moment = _interopRequireDefault(require("moment"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

var Option = _antd.Select.Option; // import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
//   executeScriptService: () => {},
// }

var EditableTable = /*#__PURE__*/function (_Component) {
  _inherits(EditableTable, _Component);

  var _super = _createSuper(EditableTable);

  function EditableTable(props) {
    var _this;

    _classCallCheck(this, EditableTable);

    _this = _super.call(this, props); // 初始化防抖函数 --联动

    _this.addCssRule = function () {
      var _$get = _.get(_this.props, 'data._attrObject.data', {}),
          _$get$tHeaderBackColo = _$get.tHeaderBackColor,
          tHeaderBackColor = _$get$tHeaderBackColo === void 0 ? {} : _$get$tHeaderBackColo,
          _$get$tHeaderFontColo = _$get.tHeaderFontColor,
          tHeaderFontColor = _$get$tHeaderFontColo === void 0 ? {} : _$get$tHeaderFontColo; // ant-checkbox-inner


      document.styleSheets[0].insertRule("\n      #".concat(_this.props.widgetIndex, " th.t-header-s, #").concat(_this.props.widgetIndex, " th.ant-table-selection-column { \n        background-color: ").concat(tHeaderBackColor.color || '#ebecf0', " !important;\n        color: ").concat(tHeaderFontColor.color || 'rgb(51,51,51)', " !important;\n        padding: 12px 12px !important;\n        font-size: 12px !important;\n        font-weight: 400 !important;\n      }\n    "), 0);
      document.styleSheets[0].insertRule("\n      #".concat(_this.props.widgetIndex, " .ant-checkbox-inner { \n        background-color: #fff !important;\n      }\n    "), 0);
      document.styleSheets[0].insertRule("\n      #".concat(_this.props.widgetIndex, " th.ant-table-selection-column .ant-checkbox-inner { \n        border: solid 1px rgba(0,0,0,0.65);\n        height: 14px;\n        width: 14px;\n      }\n    "), 0);
      document.styleSheets[0].insertRule("\n      #".concat(_this.props.widgetIndex, " .ant-table-content > .ant-table-scroll > .ant-table-header { \n        margin-bottom: -4px !important;\n      }\n    "), 0);
      document.styleSheets[0].insertRule("\n      #".concat(_this.props.widgetIndex, " .ant-table .ant-table-tbody > tr:hover > td { \n        background-color: #f2f3f7;\n      }\n    "), 0);
      document.styleSheets[0].insertRule("\n      #".concat(_this.props.widgetIndex, " .ant-table .ant-table-tbody > tr,\n      #").concat(_this.props.widgetIndex, " .ant-table thead.ant-table-thead > tr\n      { \n        height: 42px !important;\n      }\n    "), 0);
      document.styleSheets[0].insertRule("\n       #".concat(_this.props.widgetIndex, " td.t-header-s  {\n        height: 44px !important;\n        padding: 7px 12px !important;\n        line-height: 1;\n        border-bottom: 1px solid #dcdee3;\n      }\n    "), 0); // .ant-table .ant-table-tbody > tr > td

      document.styleSheets[0].insertRule("\n       #".concat(_this.props.widgetIndex, " .ant-table .ant-table-tbody > tr > td  {\n        padding: 7px 12px !important;\n      }\n    "), 0);
      document.styleSheets[0].insertRule("\n       #".concat(_this.props.widgetIndex, " .ant-table-body::-webkit-scrollbar  {\n        height: 5px;\n      }\n    "), 0);
      document.styleSheets[0].insertRule("\n      #".concat(_this.props.widgetIndex, " .ant-table thead.ant-table-thead > tr > th{\n        height: 37px !important;\n        line-height: 1;\n      }\n    "), 0);
      document.styleSheets[0].insertRule("\n    #".concat(_this.props.widgetIndex, " .ant-table{\n      font-size: 12px;\n      border: solid 1px #dcdee3;\n      border-top-left-radius: 4px;\n      border-top-right-radius: 4px;\n      border-bottom: none;\n    }\n  "), 0);
      document.styleSheets[0].insertRule("\n      #".concat(_this.props.widgetIndex, " .ant-input, \n      #").concat(_this.props.widgetIndex, " .ant-input-number-input, \n      #").concat(_this.props.widgetIndex, " .ant-select-selection--single,\n      #").concat(_this.props.widgetIndex, " .ant-select-selection__rendered {\n        height: 26px;\n        font-size: 12px;\n        line-height: 26px;\n      }\n    "), 0);
      document.styleSheets[0].insertRule("\n      #".concat(_this.props.widgetIndex, " .ant-input-number-handler-wrap {\n        display: none;\n      }\n    "), 0);
    };

    _this.hasAppointEvent = function (code) {
      var events = _.get(_this.props, 'data._attrObject.data.events', []);

      return !!events.filter(function (item) {
        return item.content === code;
      }).length;
    };

    _this.runCode = function (key, msg) {
      var events = _.get(_this.props, 'data._attrObject.data.events', []);

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

        _antd.notification.error({
          message: '可编程组件',
          description: message
        });
      }
    };

    _this.fetchSelectServiceData = async function () {
      var _$get2 = _.get(_this.props, 'data._attrObject.data', {}),
          _$get2$BindingTableHe = _$get2.BindingTableHeader,
          BindingTableHeader = _$get2$BindingTableHe === void 0 ? [] : _$get2$BindingTableHe;

      console.log('BindingTableHeader', BindingTableHeader);
      var newHeader = BindingTableHeader.map(async function (item) {
        // 'select'
        if (['cascader', 'select_service'].includes(item.type) && !_this.props.isDesign) {
          var op = await (0, _util.fetchService)(item);

          if (Array.isArray(op.data)) {
            item.serviceOptions = op.data;
          } else {
            console.error('下拉框或者级联选择绑定的数据服务返回格式错误');
          }
        }

        return item;
      });
      Promise.all(newHeader).then(function (res) {
        console.log('newHeader res', res);

        _this.setColumnHeader(res);
      });
    };

    _this.findOptionTexts = function (data, optionValues) {
      optionValues = (optionValues || '').split('/');
      var names = [];
      var currentNode = null;

      var _loop = function _loop(i) {
        if (currentNode) {
          currentNode = currentNode.children.find(function (item) {
            return item.value === optionValues[i];
          });
        } else {
          currentNode = data.find(function (item) {
            return item.value === optionValues[i];
          });
        }

        if (!currentNode) {
          return "break";
        }

        names.push(currentNode.label);
      };

      for (var i = 0; i < optionValues.length; i++) {
        var _ret = _loop(i);

        if (_ret === "break") break;
      }

      return names.join('/');
    };

    _this.parseCell = function (text, record, index, item) {
      // console.log(item.textRender)
      if (item.textRender) {
        var tableHtml = '';

        try {
          tableHtml = new Function('text', 'record', 'index', item.textRender)(text, record, index);
        } catch (error) {
          console.error(error);
        }

        return /*#__PURE__*/_react.default.createElement("span", {
          dangerouslySetInnerHTML: {
            __html: tableHtml
          }
        });
      }

      switch (item.type) {
        case 'progress':
          return /*#__PURE__*/_react.default.createElement(_antd.Progress, {
            percent: parseFloat(text || 0),
            size: "small",
            status: "active",
            format: function format(percent) {
              return "".concat(text || 0, " %");
            }
          });

        case 'link':
          return /*#__PURE__*/_react.default.createElement("a", {
            style: {
              fontSize: '12px',
              lineHeight: '27px'
            },
            href: eval('`' + item.linkUrl + '`'),
            target: "_blank"
          }, ' ', text, ' ');

        case 'select':
          return /*#__PURE__*/_react.default.createElement("span", {
            style: {
              fontSize: '12px',
              lineHeight: '27px'
            }
          }, _this.parseOperationJson(item.optionJson).filter(function (it) {
            return it.optionValue === text;
          })[0]?.optionText);

        case 'select_service':
          return /*#__PURE__*/_react.default.createElement("span", {
            style: {
              fontSize: '12px',
              lineHeight: '27px'
            }
          }, _.get(item, 'serviceOptions', []).filter(function (it) {
            return it.optionValue === text;
          })[0]?.optionText);

        case 'cascader':
          return /*#__PURE__*/_react.default.createElement("span", {
            style: {
              fontSize: '12px',
              lineHeight: '27px'
            }
          }, _this.findOptionTexts(_.get(item, 'serviceOptions', []), text));

        default:
          return /*#__PURE__*/_react.default.createElement("span", {
            style: {
              fontSize: '12px',
              lineHeight: '27px'
            }
          }, text);
      }
    };

    _this.setColumnHeader = function (columnHeader) {
      var columns = columnHeader.map(function (item) {
        return _objectSpread(_objectSpread({}, item), {}, {
          className: 't-header-s',
          render: function render(text, record, index) {
            return _this.parseCell(text, record, index, item);
          }
        });
      });

      _this.setState({
        columns: columns
      });
    };

    _this.isEmpty = function (data) {
      // 如果数据是 undefined、null、空字符串、空数组或空对象，则返回 true，否则返回 false
      return data === undefined || data === null || typeof data === 'string' && data.trim() === '' || Array.isArray(data) && data.length === 0 || _typeof(data) === 'object' && Object.keys(data).length === 0;
    };

    _this.setFormData = function (fieldsValue) {
      _this.props.form.setFieldsValue(fieldsValue);
    };

    _this.getFormData = function () {
      var data = {};
      var _this$state = _this.state,
          isEdit = _this$state.isEdit,
          extraData = _this$state.extraData;

      _this.props.form.validateFields(function (err, values) {
        var newData = {};
        Object.keys(values).forEach(function (key) {
          // 处理日期与级联选择器数据
          if (!!values[key] && _typeof(values[key]) == 'object') {
            if (Array.isArray(values[key])) {
              values[key] = values[key].join('/');
            } else {
              values[key] = values[key].format('YYYY-MM-DD');
            }
          }

          newData[key.replaceAll('_&_', '.')] = values[key];
        }); // ===================

        data = _objectSpread(_objectSpread({}, newData), extraData);
      });

      return data;
    };

    _this.handleReset = function () {
      _this.props.form.resetFields();
    };

    _this.handleSubmit = function () {
      var _this$state2 = _this.state,
          isEdit = _this$state2.isEdit,
          extraData = _this$state2.extraData;

      _this.props.form.validateFields(function (err, values) {
        if (err) {
          return;
        }

        var newData = {};
        Object.keys(values).forEach(function (key) {
          if (!!values[key] && _typeof(values[key]) == 'object') {
            if (Array.isArray(values[key])) {
              values[key] = values[key].join('/');
            } else {
              values[key] = values[key].format('YYYY-MM-DD');
            }
          }

          newData[key.replaceAll('_&_', '.')] = values[key];
        });

        _this.handleAdd(_objectSpread(_objectSpread({}, newData), extraData));

        var hasSubmitEvent = _this.hasAppointEvent('onSubmit');

        if (hasSubmitEvent) {
          _this.runCode('onSubmit', '事件脚本错误,请打开控制台查看错误信息');
        } // if (isEdit) {
        //   const hasUpEvent = this.hasAppointEvent('onUp')
        //   if (hasUpEvent) {
        //     this.runCode('onUp', '编辑弹窗确认事件脚本错误,请打开控制台查看错误信息')
        //   } else {
        //     this.handleUpData({ ...newData, ...extraData })
        //   }
        // } else {
        //   const hasAddEvent = this.hasAppointEvent('onAdd')
        //   if (hasAddEvent) {
        //     this.runCode('onAdd', '新增弹窗确认事件脚本错误,请打开控制台查看错误信息')
        //   } else {
        //     this.handleAdd({ ...newData, ...extraData })
        //   }
        // }

      });
    };

    _this.handleUpData = async function (record) {
      var _this$state3 = _this.state,
          editRow = _this$state3.editRow,
          extraData = _this$state3.extraData;

      var _$get3 = _.get(_this.props, 'data._attrObject.data', {}),
          _$get3$BindingTableHe = _$get3.BindingTableHeader,
          BindingTableHeader = _$get3$BindingTableHe === void 0 ? [] : _$get3$BindingTableHe;

      var params = {};
      BindingTableHeader.forEach(function (item) {
        params[item.dataIndex] = record[item.dataIndex] ? record[item.dataIndex] : record[item.dataIndex] == 0 ? 0 : null;
      });

      var dynamicDataSource = _.get(_this.props, 'data._attrObject.data.object.dynamicDataSource'); // 选择表单模板下的属性时，dynamicDataSource是个数组，其他情况下是 {}


      var isFormProperty = Array.isArray(dynamicDataSource);

      if (isFormProperty) {
        var _dynamicDataSource$0$ = dynamicDataSource[0].selectedTemplate,
            namespace = _dynamicDataSource$0$.namespace,
            name = _dynamicDataSource$0$.name;
        var data = await (0, _util.UpdateDataTableEntry)({
          templateName: "".concat(namespace, ".").concat(name),
          condition: {
            where: {
              id: editRow['system.id']
            },
            update: _objectSpread(_objectSpread({}, params), extraData)
          }
        });

        if (data.code == 200 || data.code == 200) {
          _antd.message.success("\u7F16\u8F91\u6210\u529F");
        } else {
          _antd.message.error("\u7F16\u8F91\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6570\u636E\u53C2\u6570\u683C\u5F0F\u662F\u5426\u6B63\u786E");
        }
      }
    };

    _this.handleAdd = async function (record) {
      var dynamicDataSource = _.get(_this.props, 'data._attrObject.data.object.dynamicDataSource'); // 选择表单模板下的属性时，dynamicDataSource是个数组，其他情况下是 {}


      var isFormProperty = Array.isArray(dynamicDataSource);

      if (isFormProperty) {
        var _dynamicDataSource$0$2 = dynamicDataSource[0].selectedTemplate,
            namespace = _dynamicDataSource$0$2.namespace,
            name = _dynamicDataSource$0$2.name;
        var data = await (0, _util.addDataTableEnty)({
          templateName: "".concat(namespace, ".").concat(name),
          condition: _objectSpread({}, record)
        });

        if (data.code == 200 || data.code == 200) {
          _antd.message.success("\u6DFB\u52A0\u6210\u529F");
        } else {
          _antd.message.error("\u6DFB\u52A0\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6570\u636E\u53C2\u6570\u683C\u5F0F\u662F\u5426\u6B63\u786E");
        }
      }
    };

    _this.parseOperationJson = function (str) {
      var arr = [];

      try {
        arr = eval('(' + str + ')');
      } catch (error) {
        arr = [];

        _antd.notification.error({
          message: '可编程组件',
          description: '表格下拉框json数据配置有误，请重新设置'
        });
      }

      return arr;
    };

    _this.convertToCascaderData = function (data) {
      var map = {};
      var result = []; // 将每个选项按照 parentValue 分组

      data.forEach(function (option) {
        if (!option.parentValue) {
          result.push({
            value: option.optionValue,
            label: option.optionText,
            children: []
          });
        } else {
          if (!map[option.parentValue]) {
            map[option.parentValue] = [];
          }

          map[option.parentValue].push(option);
        }
      }); // 递归构建级联选择器数据结构

      var buildTree = function buildTree(node) {
        if (map[node.value]) {
          node.children = map[node.value].map(function (child) {
            return {
              value: child.optionValue,
              label: child.optionText,
              children: []
            };
          });
          node.children.forEach(buildTree);
        }
      };

      result.forEach(buildTree);
      return result;
    };

    _this.parseItem = function (column) {
      var getFieldDecorator = _this.props.form.getFieldDecorator;
      var _this$state4 = _this.state,
          editRow = _this$state4.editRow,
          isEdit = _this$state4.isEdit;
      var disabled = isEdit && column.readOnly;
      var _column$width = column.width,
          width = _column$width === void 0 ? 200 : _column$width;

      var _$get4 = _.get(_this.props, 'data._attrObject.data', {}),
          _$get4$borderColor = _$get4.borderColor,
          borderColor = _$get4$borderColor === void 0 ? {
        color: '#BFBFBF'
      } : _$get4$borderColor;

      switch (column.type) {
        case 'input':
        case 'link':
          return /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), {
            rules: [{
              required: column.required,
              message: column.title + '为必填项！'
            }],
            initialValue: editRow[column.dataIndex]
          })( /*#__PURE__*/_react.default.createElement(_antd.Input, {
            disabled: disabled,
            style: {
              width: width,
              borderColor: borderColor.color
            }
          })));

        case 'inputNumber':
        case 'progress':
          return /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), {
            rules: [{
              required: column.required,
              message: column.title + '为必填项！'
            }],
            initialValue: editRow[column.dataIndex]
          })( /*#__PURE__*/_react.default.createElement(_antd.InputNumber, {
            disabled: disabled,
            style: {
              width: width,
              borderColor: borderColor.color
            }
          })));

        case 'inputInteger':
          return /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), {
            rules: [{
              required: column.required,
              message: column.title + '为必填项！'
            }],
            initialValue: editRow[column.dataIndex]
          })( /*#__PURE__*/_react.default.createElement(_antd.InputNumber, {
            disabled: disabled,
            decimalSeparator: "0",
            style: {
              width: width,
              borderColor: borderColor.color
            }
          })));

        case 'date':
          var param = {
            rules: [{
              required: column.required,
              message: column.title + '为必填项！'
            }]
          };

          if (editRow[column.dataIndex]) {
            param.initialValue = (0, _moment.default)(editRow[column.dataIndex]);
          }

          return /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), param)( /*#__PURE__*/_react.default.createElement(_antd.DatePicker, {
            disabled: disabled,
            style: {
              width: width
            }
          })));
        // select

        case 'select':
          return /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), {
            rules: [{
              required: column.required,
              message: column.title + '为必填项！'
            }],
            initialValue: editRow[column.dataIndex]
          })( /*#__PURE__*/_react.default.createElement(_antd.Select, {
            disabled: disabled,
            style: {
              width: width
            },
            onChange: function onChange(value, option) {
              return _this.selectChange(value, option, column.labelName);
            }
          }, _this.parseOperationJson(column.optionJson).map(function (item) {
            return /*#__PURE__*/_react.default.createElement(Option, {
              value: item.optionValue
            }, item.optionText);
          }))));

        case 'select_service':
          return /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), {
            rules: [{
              required: column.required,
              message: column.title + '为必填项！'
            }],
            initialValue: editRow[column.dataIndex]
          })( /*#__PURE__*/_react.default.createElement(_antd.Select, {
            disabled: disabled,
            style: {
              width: width
            },
            onChange: function onChange(value, option) {
              return _this.selectChange(value, option, column.labelName);
            }
          }, _.get(column, 'serviceOptions', []).map(function (item) {
            return /*#__PURE__*/_react.default.createElement(Option, {
              value: item.optionValue
            }, item.optionText);
          }))));

        case 'cascader':
          return /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), {
            rules: [{
              required: column.required,
              message: column.title + '为必填项！'
            }],
            initialValue: (editRow[column.dataIndex] || '').split('/')
          })( /*#__PURE__*/_react.default.createElement(_antd.Cascader, {
            style: {
              width: width
            } // options={this.convertToCascaderData(_.get(column, 'serviceOptions', []))}
            ,
            options: column.serviceOptions,
            placeholder: "Please select",
            onChange: function onChange(value, option) {
              return _this.cascaderChange(value, option, column.labelName);
            }
          })));

        default:
          return null;
      }
    };

    _this.selectChange = function (value, option, labelName) {
      var extraData = _this.state.extraData;

      if (labelName) {
        _this.setState({
          extraData: _objectSpread(_objectSpread({}, extraData), {}, _defineProperty({}, labelName, option.props.children))
        });
      }
    };

    _this.cascaderChange = function (value, option, labelName) {
      var extraData = _this.state.extraData;

      if (labelName) {
        _this.setState({
          extraData: _objectSpread(_objectSpread({}, extraData), {}, _defineProperty({}, labelName, option.map(function (it) {
            return it.label;
          }).join('/')))
        });
      }
    };

    _this.formData = {}; // 添加 formData 属性

    _this.timer = null; // 添加定时器属性

    _this.state = {
      columns: [],
      config: props.data?._attrObject?.data,
      editRow: {},
      isEdit: false,
      extraData: {} // 存储字段类型为下拉列表，并且设置了选项文本存储字段的数据

    };
    return _this;
  }

  _createClass(EditableTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('config', this.state.config);
      scriptUtil.registerReactDom(this, this.props);
      this.addCssRule();
      this.fetchSelectServiceData();
      this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      scriptUtil.logoutReactDom(this, this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var columns = this.state.columns;

      var _$get5 = _.get(this.props, 'data._attrObject.data', {}),
          _$get5$addButton = _$get5.addButton,
          addButton = _$get5$addButton === void 0 ? {
        value: {
          reset: true,
          save: true
        }
      } : _$get5$addButton,
          _$get5$styleType = _$get5.styleType,
          styleType = _$get5$styleType === void 0 ? {
        value: 'style1'
      } : _$get5$styleType;

      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: 'flex',
          flexWrap: 'wrap'
        }
      }, columns.map(function (column) {
        if (column.dataIndex == 'operation') return null;
        return /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex',
            marginRight: '20px'
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: styleType.value === 'style1' ? labelColStyle : labelColStyle2
        }, column.title, ":"), _this2.parseItem(column));
      })), /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 24
      }, addButton.value.save && /*#__PURE__*/_react.default.createElement(_antd.Button, {
        type: "primary",
        htmlType: "submit",
        onClick: this.handleSubmit,
        size: "small"
      }, "\u4FDD\u5B58"), addButton.value.reset && /*#__PURE__*/_react.default.createElement(_antd.Button, {
        style: {
          marginLeft: 8
        },
        onClick: this.handleReset,
        size: "small"
      }, "\u91CD\u7F6E")))));
    }
  }]);

  return EditableTable;
}(_react.Component);

EditableTable = _antd.Form.create({})(EditableTable);
var _default = EditableTable;
exports.default = _default;
var labelColStyle = {
  lineHeight: '32px',
  textAlign: 'right',
  paddingRight: '12px',
  fontSize: '12px',
  minWidth: '130px',
  marginBottom: '12px'
};
var labelColStyle2 = {
  lineHeight: '26px',
  textAlign: 'center',
  height: '26px',
  fontSize: '12px',
  minWidth: '130px',
  marginBottom: '12px',
  marginTop: '2px',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  background: '#efefef'
};