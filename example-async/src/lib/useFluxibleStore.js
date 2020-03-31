"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var _fluxibleJs = require("fluxible-js");

/** @format */
function useFluxibleStore(mapStates) {
  var _useState = (0, _react.useState)(function () {
    return mapStates(_fluxibleJs.store);
  }),
      states = _useState[0],
      setState = _useState[1]; // this should only run on didMount and unmount


  (0, _react.useEffect)(function () {
    // addObserver returns a callback for cleanup
    return (0, _fluxibleJs.addObserver)(function () {
      setState(mapStates(_fluxibleJs.store));
    }, Object.keys(mapStates(_fluxibleJs.store)));
  }, []); // eslint-disable-line

  return states;
}

var _default = useFluxibleStore;
exports["default"] = _default;