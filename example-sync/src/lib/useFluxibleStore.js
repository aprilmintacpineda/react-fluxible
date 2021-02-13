'use strict';

exports.__esModule = true;
exports['default'] = void 0;

var _fluxibleJs = require('fluxible-js');

var _react = _interopRequireDefault(require('react'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function useFluxibleStore(mapStates) {
  var _React$useState = _react['default'].useState(function () {
      return mapStates(_fluxibleJs.store);
    }),
    states = _React$useState[0],
    setState = _React$useState[1];
  /**
   * useEffect seems to be delayed causing
   * causing the observer to be registered late.
   * We want to register it as soon as this hook gets called
   */

  var removeObserver = _react['default'].useMemo(
    function () {
      var statesToObserve = Object.keys(
        mapStates(_fluxibleJs.store)
      );
      return (0, _fluxibleJs.addObserver)(function () {
        setState(mapStates(_fluxibleJs.store));
      }, statesToObserve);
    },
    [mapStates]
  );
  /**
   * We can then just clean it up later down
   * the line when the component who called this hook
   * gets unmounted.
   */

  _react['default'].useEffect(
    function () {
      return removeObserver;
    },
    [removeObserver]
  );

  return states;
}

var _default = useFluxibleStore;
exports['default'] = _default;
