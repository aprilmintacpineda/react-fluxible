import { addObserver, store } from 'fluxible-js';
import React from 'react';

function useFluxibleStore (mapStates) {
  const [states, setState] = React.useState(() => mapStates(store));

  /**
   * useEffect seems to be delayed causing
   * causing the observer to be registered late.
   * We want to register it as soon as this hook gets called
   */
  const removeObserver = React.useMemo(() => {
    const statesToObserve = Object.keys(mapStates(store));

    return addObserver(() => {
      setState(mapStates(store));
    }, statesToObserve);
  }, [mapStates]);

  /**
   * We can then just clean it up later down
   * the line when the component who called this hook
   * gets unmounted.
   */
  React.useEffect(() => removeObserver, [removeObserver]);

  return states;
}

export default useFluxibleStore;
