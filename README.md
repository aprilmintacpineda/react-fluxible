<!-- @format -->

# react-fluxible

Smaller, faster, better. A small state management system that supports the idea of asynchronous actions and state persistence out of the box. Built on top of [fluxible-js](https://github.com/aprilmintacpineda/fluxible-js). [See demo](https://aprilmintacpineda.github.io/react-fluxible/).

# Guide

`react-fluxible` is related to [react-context-api-store](https://github.com/aprilmintacpineda/react-context-api-store) and [redux](https://github.com/reduxjs/redux). Except in `react-fluxible`, there's no need for a provider.

### Install

`npm i -s react-fluxible fluxible-js redefine-statics-js`

### Initialize store

```jsx
import { initializeStore } from 'fluxible-js';

initializeStore({
  initialStore: {
    user: {
      name: 'Test User'
    },
    state: 'value',
    anotherState: {
      count: 1
    },
    oneMoreState: false
  }
});

// rest of the app.
```

instead of rendering a Provider on top of your app. What you do is before you render your app, you have to call `initializeStore` function.

`initializeStore` function expects an object as the only parameter, the object have a required property called `initialStore` which would be used as the initial value of the store.

There's also the optional property called `persist` which should also be an object containing two required properties:

- `storage` which should be a reference to the storage that would be used to save the store. It must have `getItem` and `setItem` methods. Both methods should be synchronous. Example would be `window.localStorage`. The call to `setItem` is deferred by 200ms, this is to minimize and to improve performance.
- `restore` which should be a function that is synchronous. Restore will be called upon initialization and will receive the `savedStore` as the its only argument. The `savedStore` would be an object containing the states that were previously saved to the storage. It should return an object which would be the states that you want to restore.

Persist feature would only save keys that were returned by `config.persist.restore`. That means, other states that you did not return in that method wouldn't be saved.

##### Example

```js
import { initializeStore } from 'fluxible-js';

initializeStore({
  initialStore: {
    user: null,
    someOtherState: 'value',
    anotherState: {
      value: 'value'
    }
  },
  persist: {
    storage: window.localStorage,
    restore: savedStore => ({
      user: savedStore.user || null
    })
  }
});
```

In the case above, only `user` would be saved and the rest wouldn't be saved.

### Connect your components to the store

```jsx
import { connect } from 'react-fluxible';

class MyComponent extends Component {
  handleClick = () => {
    this.props.updateAnotherState({
      count: this.props.anotherState.count + 1
    });
  };

  render() {
    return (
      <div>
        <p>{this.props.user.name}</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    anotherState: state.anotherState
  };
}

const mutations = {
  updateAnotherState(store, anotherState) {
    function callback() {
      console.log('called back');
    }

    // callback is optional
    store.updateStore({ anotherState }, callback);
  }
};

export default connect(
  mapStateToProps,
  mutations
)(MyComponent);
```

`mapStateToProps` should be a function that should return the state that you want to be accessible in the connected component. `mutations` should be an object that has methods in it. The methods would be the ones you can call to update a specific part of the store.

Both `mapStateToProps`, `mutations` are optional. That mean you can specify `mutations` but not `mapStateToProps` like so:

```jsx
export default connect(
  undefined,
  mutations
)(MyComponent);
```

Vice versa with `mapStateToProps` like so:

```jsx
export default connect(mapStateToProps)(MyComponent);
```

### Mutations

When you call a mutation, you can provide arguments. Except you have to keep in mind that the first parameter that your function would receive is the object called `store`. The `store` has `getStore` and `updateStore` methods.

##### `store.getStore`

Method which you can call anytime to get the latest `store` at that point of call.

##### `store.updateStore`

Method which you can call anytime to update a specific part of the `store`. It expects an object as the first parameter, the object should contain the states that you want to update.

```jsx
const mutations = {
  updateAnotherState(store, anotherState) {
    store.updateStore({ anotherState });
  }
};
```

In the example code above, when you call `this.props.updateAnotherState`, it would only update `anotherState` key of the store, the rest would remains as they were before the update. The method also expects a function as an optional second parameter that would be called **after** the update but **before** persist (if you use persist).

### getStore module

The `getStore` module is a function that you can call anytime to get the latest store at that point of call.

```jsx
import { getStore } from 'fluxible-js';

function notConnectedToStoreFunc() {
  const store = getStore();
  console.log(store);
  // rest of the code
}
```

### dispatch module

The `dispatch` module is a function that you can use to dispatch actions outside a connected component. It expects a callback function as the first parameter, and other parameters would be passed to the callback function as succeeding arguments.

```jsx
import { dispatch } from 'react-fluxible';

function notConnectedToStoreFunc() {
  dispatch(
    (store, param1, param2) => {
      store.updateStore({
        state: 'value'
      });
    },
    'value1',
    'value2'
  );
}
```

# Migrating from react-context-api-store

The difference here is the that `react-context-api-store` is completely coupled to Context API. This one uses `fluxible-js` to manage state. The job of `react-fluxible` is only to serve as a bridge between `react` and `fluxible-js`.

The only thing you would need to change in your existing set up is the Provider.

1. `npm un -s react-context-api-store`
2. Remove `Provider`.
3. [Initialize store](#initialize-store).
4. Replace all `import { connect } from 'react-context-api-store';` with `import { connect } from 'react-fluxible'`.
5. Test your app.

###### Notes

Deferred updates is not supported by react-fluxible.

---

If you experienced any difficulty migrating, feel free to open an issue.

# Contributing

Discussions, questions, suggestions, bug reports, feature request, etc are all welcome. Just create an issue. Just ensure that you are responsive enough.

---

Created with :heart: by April Mintac Pineda.
