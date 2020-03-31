"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _fluxibleJs = require("fluxible-js");

var _redefineStaticsJs = _interopRequireDefault(require("redefine-statics-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function withFluxibleStore(WrappedComponent, callback) {
  function ConnectedComponent(props) {
    var _this = this;

    this.props = props;
    this.state = callback(_fluxibleJs.store); // addObserver returns a function for cleanup

    this.componentWillUnmount = (0, _fluxibleJs.addObserver)(function () {
      _this.setState(callback(_fluxibleJs.store));
    }, Object.keys(this.state));

    this.render = function () {
      return _react["default"].createElement(WrappedComponent, _extends({}, _this.props, _this.state));
    };

    return this;
  }

  ConnectedComponent.prototype = _react["default"].Component.prototype;
  ConnectedComponent.prototype.constructor = ConnectedComponent;
  (0, _redefineStaticsJs["default"])(ConnectedComponent, WrappedComponent);
  return ConnectedComponent;
}

var _default = withFluxibleStore;
exports["default"] = _default;