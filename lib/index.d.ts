import { FluxibleStore } from 'fluxible-js';
export declare function createFluxibleHook<StoreType>(
  store: FluxibleStore<StoreType>
): (
  mapStates: (store: StoreType) => Partial<StoreType>
) => Partial<StoreType>;
