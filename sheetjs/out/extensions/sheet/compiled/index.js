"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _xlsx = _interopRequireDefault(require("./xlsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ExcelReader = function ExcelReader() {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  (0, _react.useEffect)(function () {
    console.log('data', data);
  }, [data]);

  var handleFileUpload = function handleFileUpload(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      var workbook = _xlsx.default.read(event.target.result, {
        type: 'binary'
      });

      var worksheet = workbook.Sheets[workbook.SheetNames[0]];

      var excelData = _xlsx.default.utils.sheet_to_json(worksheet, {
        header: 1
      });

      setData(excelData);
      excelData.forEach(function (v, index) {
        if (index > 0) {
          add(v[1]);
        }
      });
    };

    reader.readAsBinaryString(file);
  };

  var add = function add(name) {
    var url = '/open-api/p/compose/v2alpha1/resources/scriptExec';
    var param = {
      method: 'POST',
      //请求类型，可选GET、POST、PUT、DELETE
      body: {
        resourceName: 'mariadb_1',
        scriptName: 'sql_2',
        params: {
          name: name
        }
      }
    };
    scriptUtil.request(url, param).then(function (res) {
      console.log(res);
    });
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    onChange: handleFileUpload
  }), /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("tbody", null, data.map(function (row, index) {
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: index
    }, row.map(function (cell, cellIndex) {
      return /*#__PURE__*/_react.default.createElement("td", {
        key: cellIndex
      }, cell);
    }));
  }))));
};

var _default = ExcelReader;
exports.default = _default;