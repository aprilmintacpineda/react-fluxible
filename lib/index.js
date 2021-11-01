'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.createFluxibleHook = void 0;
const react_1 = __importDefault(require('react'));
function createFluxibleHook(store) {
  return function useFluxibleStore(mapStates) {
    const [states, setState] = react_1.default.useState(() =>
      mapStates(store.store)
    );
    /**
     * useEffect seems to be delayed causing
     * causing the observer to be registered late.
     * We want to register it as soon as this hook gets called
     */
    const removeObserver = react_1.default.useMemo(
      () => {
        return store.addObserver(() => {
          setState(mapStates(store.store));
        }, Object.keys(mapStates(store.store)));
      },
      [
        // leave blank, don't watch mapStates callback
      ]
    );
    // remove observer on unmount
    react_1.default.useEffect(() => removeObserver, []);
    return states;
  };
}
exports.createFluxibleHook = createFluxibleHook;
