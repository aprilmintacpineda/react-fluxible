import { Store } from 'fluxible-js';
export declare function createFluxibleHook<StoreType>(store: Store<StoreType>): (mapStates: (store: StoreType) => Partial<StoreType>) => Partial<StoreType>;
