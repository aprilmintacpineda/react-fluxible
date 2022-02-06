![npm](https://img.shields.io/npm/dt/react-fluxible) ![npm](https://img.shields.io/npm/dm/react-fluxible) ![npm](https://img.shields.io/npm/dw/react-fluxible)

# react-fluxible

Connector for [react-js](https://github.com/facebook/react/) and [fluxible-js](https://github.com/aprilmintacpineda/fluxible-js) which allows you to access the store inside your components and rerender your component when the store changes.

# Change logs

From v6, the changelogs on the project will be kept in [CHANGELOG](./CHANGELOG.md), which follows [keepachangelog](https://keepachangelog.com/en/1.0.0/).

# Demo

https://user-images.githubusercontent.com/21032419/139817756-c5bf348e-7941-4000-9205-a165ee3ddccc.mp4

# Install

```
yarn add react-fluxible fluxible-js
```

# Rendering performance impact
## react-fluxible does NOT rely on a wrapper on top of your app.

Unlike `react-redux`, `react-fluxible` does **NOT** rely on a global provider on top of your app. This makes it more performant and independent. You simply have to choose between hooks or HOCs.

## react-fluxible does selective update

Due to the architecture of fluxible-js, when you update the store, `react-fluxible` does **NOT** rerender all components connected to the store. It only rerenders components that are using the store key that was updated.

This means that if you have 100 components connected to the global store, and you updated a store key called `authUser`, and you only have 5 components connected to the store that are using `authUser`, then only those 5 components will be rerendered and given the updated values.

## react-fluxible does not do anything about the store

It does not set, reset or update the store, it only does the following:

1. Connect to the store.
2. Wait for updates on the store keys that you are using, i.e., `authUser`.
3. Rerender your component with the new values when that/those store key/s was/were updated.
4. Disconnect to the store when your component unmounts, this is necessary for cleanup.

# Usage

## Initialize store

Refer to [fluxible-js docs](https://github.com/aprilmintacpineda/fluxible-js#usage) for more information on initialization.

## Create a reusable hook for your store

You need to tell `react-fluxible` to what store to connect to via `createFluxibleHook`, and then it returns a hook that can connect to that store.

**globalStore.ts**

```ts
import { createStore } from 'fluxible-js';
import { createFluxibleHook } from 'react-fluxible';

const initialStore = {
  token: null,
  isLoggedIn: false
};

const globalStore = createStore({
  initialStore
});

const useGlobalStore = createFluxibleHook(globalStore);

// to connect a component to the store
function MyComponent () {
  const { token, isLoggedIn } = useGlobalStore((store) => {
    return {
      token: store.token,
      isLoggedIn: store.isLoggedIn
    };
  })

  // do something with the `token` and `isLoggedIn`

  return <p>Hello world</p>;
}
```

`createFluxibleHook` accepts a store instance as argument and returns a react hook that you can use in your components, the react hook accepts a function that function should return an object that is the store states that you want to watch in that component. In the example above, the component will watch `token` and `isLoggedIn`, every time the `token` or `isLoggedIn` changes, this component will be rerendered with the new values of the `token` and `isLoggedIn`.

# Migrating from v5 to v6

Create a new file called **globalStore.ts**

```ts
import { createStore } from 'fluxible-js';
import { createFluxibleHook } from 'react-fluxible';

const initialStore = {
  // your store here
};

export const globalStore = createStore({
  initialStore
});

export const useGlobalStore = createFluxibleHook(globalStore);
```

Instead of importing `updateStore` and the likes directly from `fluxible-js`, you will need to `import { globalStore } from 'globalStore';` and use the methods from `globalStore`.

Instead of importing `useFluxibleStore` directly from `react-fluxible`, you will need to `import { useGlobalStore } from 'globalStore';`.
