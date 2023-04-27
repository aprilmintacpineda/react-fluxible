import { FluxibleStore } from 'fluxible-js';
export declare function createFluxibleHook<Store>(
  store: FluxibleStore<Store>
): (mapStates: (store: Store) => Partial<Store>) => Partial<Store>;
