"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatch = dispatch;
exports.connect = connect;

var _fluxibleJs = require("fluxible-js");

var _react = _interopRequireDefault(require("react"));

var _redefineStaticsJs = _interopRequireDefault(require("redefine-statics-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param {Function} callback function that would be called sa the mutation handler. Should expect an object as the first parameter.
 * @param  {...any} payload to the callback function
 */
function dispatch(mutation) {
  for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    payload[_key - 1] = arguments[_key];
  }

  return mutation.apply(void 0, [{
    getStore: _fluxibleJs.getStore,
    updateStore: function updateStore(updatedState, callback) {
      (0, _fluxibleJs.updateStore)(updatedState);
      if (callback) callback();
    }
  }].concat(payload));
}
/**
 * @param {Function} Would receive the current store's state as the only argument. Should return an object of the states that you want to be accessible in the connected component.
 * @param {Object} You should define your action handlers here. Each methods would be called with an object (that has `updateStore` and `getStore` methods) as the first argument. The rest would be the arguments you passed to the call.
 * @return {Object} the react component.
 */


function connect(mapStatesToProps, definedMutations) {
  return function (WrappedComponent) {
    // we only want to compute mutations once
    var mutations = {};

    if (definedMutations) {
      (function () {
        var mutationKeys = Object.keys(definedMutations);

        var _loop = function _loop(a) {
          mutations[mutationKeys[a]] = function () {
            for (var _len2 = arguments.length, payload = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              payload[_key2] = arguments[_key2];
            }

            return dispatch.apply(void 0, [definedMutations[mutationKeys[a]]].concat(payload));
          };
        };

        for (var a = 0; a < mutationKeys.length; a++) {
          _loop(a);
        }
      })();
    }

    var Wrapper =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(Wrapper, _React$Component);

      function Wrapper(props) {
        var _this;

        _classCallCheck(this, Wrapper);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Wrapper).call(this, props));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillUnmount", function () {
          // clean update listener before we unmount.
          _this.removeListener();
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
          return _react.default.createElement(WrappedComponent, _extends({}, _this.props, mapStatesToProps ? mapStatesToProps((0, _fluxibleJs.getStore)()) : {}, mutations));
        });

        _this.state = {
          count: 0
        };
        _this.removeListener = (0, _fluxibleJs.addUpdateListener)(function () {
          _this.setState({
            count: _this.state.count + 1
          });
        });
        return _this;
      }

      return Wrapper;
    }(_react.default.Component);

    return (0, _redefineStaticsJs.default)(Wrapper, WrappedComponent);
  };
}