import { FluxibleStore } from 'fluxible-js';
import { useEffect, useMemo, useState } from 'react';

export function createFluxibleHook<Store> (
  store: FluxibleStore<Store>
) {
  return function useFluxibleStore (
    mapStates: (store: Store) => Partial<Store>
  ) {
    const [states, setState] = useState(() =>
      mapStates(store.store)
    );

    /**
     * useEffect seems to be delayed causing
     * causing the observer to be registered late.
     * We want to register it as soon as this hook gets called
     */
    const removeObserver = useMemo(
      () => {
        return store.addObserver(() => {
          setState(mapStates(store.store));
        }, Object.keys(mapStates(store.store)) as Array<keyof Store>);
      },
      // leave blank, don't watch mapStates callback
      // eslint-disable-next-line
      []
    );

    // remove observer on unmount
    useEffect(
      () => removeObserver,
      // leave blank, don't watch mapStates callback
      // eslint-disable-next-line
      []
    );

    return states;
  };
}
