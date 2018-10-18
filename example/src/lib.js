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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 *
 * @param {Function} callback function that would be called sa the mutation handler.
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
 * @return {Object} the inferno component.
 */


function connect(mapStatesToProps, definedMutations) {
  return function (WrappedComponent) {
    // we only want to compute mutations once
    var mutations;

    if (definedMutations) {
      mutations = {};
      Object.keys(definedMutations).forEach(function (key) {
        mutations[key] = function () {
          for (var _len2 = arguments.length, payload = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            payload[_key2] = arguments[_key2];
          }

          return dispatch.apply(void 0, [definedMutations[key]].concat(payload));
        };
      });
    }

    function ConnectedComponent(props) {
      var _this = this;

      this.props = props;

      if (mapStatesToProps) {
        this.removeListener = (0, _fluxibleJs.addObserver)(function () {
          _this.setState({
            count: _this.state.count + 1
          });
        }, Object.keys(mapStatesToProps((0, _fluxibleJs.getStore)())));
        this.state = {
          count: 0
        };
      }

      this.componentWillUnmount = function () {
        if (_this.removeListener) _this.removeListener();
      }; // eslint-disable-next-line


      this.render = function () {
        if (mapStatesToProps && mutations) {
          return _react.default.createElement(WrappedComponent, _extends({}, _this.props, mutations, mapStatesToProps((0, _fluxibleJs.getStore)())));
        } else if (mapStatesToProps) {
          return _react.default.createElement(WrappedComponent, _extends({}, _this.props, mapStatesToProps((0, _fluxibleJs.getStore)())));
        }

        return _react.default.createElement(WrappedComponent, _extends({}, _this.props, mutations));
      };

      return this;
    }

    ConnectedComponent.prototype = _react.default.Component.prototype;
    ConnectedComponent.prototype.constructor = ConnectedComponent;
    (0, _redefineStaticsJs.default)(ConnectedComponent, WrappedComponent);
    return ConnectedComponent;
  };
}