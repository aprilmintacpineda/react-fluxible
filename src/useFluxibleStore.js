/** @format */

import { useState, useEffect } from 'react';
import { addObserver, store } from 'fluxible-js';

function useFluxibleStore (mapStates) {
  const [states, setState] = useState(() => mapStates(store));

  // this should only run on didMount and unmount
  useEffect(() => {
    // addObserver returns a callback for cleanup
    return addObserver(() => {
      setState(mapStates(store));
    }, Object.keys(mapStates(store)));
  }, [mapStates]);

  return states;
}

export default useFluxibleStore;
