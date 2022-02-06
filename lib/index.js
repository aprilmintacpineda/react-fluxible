"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFluxibleHook = void 0;
const react_1 = require("react");
function createFluxibleHook(store) {
    return function useFluxibleStore(mapStates) {
        const [states, setState] = (0, react_1.useState)(() => mapStates(store.store));
        /**
         * useEffect seems to be delayed causing
         * causing the observer to be registered late.
         * We want to register it as soon as this hook gets called
         */
        const removeObserver = (0, react_1.useMemo)(() => {
            return store.addObserver(() => {
                setState(mapStates(store.store));
            }, Object.keys(mapStates(store.store)));
        }, 
        // leave blank, don't watch mapStates callback
        // eslint-disable-next-line
        []);
        // remove observer on unmount
        (0, react_1.useEffect)(() => removeObserver, 
        // leave blank, don't watch mapStates callback
        // eslint-disable-next-line
        []);
        return states;
    };
}
exports.createFluxibleHook = createFluxibleHook;
