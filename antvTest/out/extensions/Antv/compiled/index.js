"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _l = require("./l7");

var _l7Maps = require("./l7-maps");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var AntVTest = function AntVTest() {
  (0, _react.useEffect)(function () {
    var scene = new _l.Scene({
      id: 'antv-map',
      map: new _l7Maps.Mapbox({
        pitch: 0,
        style: 'dark',
        center: [20, -3.69],
        zoom: 2.5
      })
    });
    fetch('https://gw.alipayobjects.com/os/basement_prod/c02f2a20-9cf8-4756-b0ad-a054a7046920.csv').then(function (res) {
      return res.text();
    }).then(function (data) {
      var pointLayer = new _l.PointLayer({}).source(data, {
        parser: {
          type: 'csv',
          x: 'Long',
          y: 'Lat'
        }
      }).size(0.6).color('#ffa842').style({
        opacity: 1
      });
      scene.addLayer(pointLayer);
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "antv-map",
    style: {
      width: '100%',
      height: '100%',
      position: 'absolute'
    }
  });
};

var _default = AntVTest;
exports.default = _default;