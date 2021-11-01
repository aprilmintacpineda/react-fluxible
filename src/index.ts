import React from 'react';
import { Store } from 'fluxible-js';

export function createFluxibleHook<StoreType>(store: Store<StoreType>) {
  return function useFluxibleStore(mapStates: (store: StoreType) => Partial<StoreType>) {
    const [states, setState] = React.useState(() =>
      mapStates(store.store)
    );

    /**
     * useEffect seems to be delayed causing
     * causing the observer to be registered late.
     * We want to register it as soon as this hook gets called
     */
    const removeObserver = React.useMemo(() => {
      return store.addObserver(() => {
        setState(mapStates(store.store));
      }, Object.keys(mapStates(store.store)) as Array<keyof StoreType>);
    }, [
      // leave blank, don't watch mapStates callback
    ]);

    // remove observer on unmount
    React.useEffect(() => removeObserver, []);

    return states;
  };
}
