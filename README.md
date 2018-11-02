<!-- @format -->

# react-fluxible

Smaller, faster, better. A small state management system that supports the idea of asynchronous actions and state persistence out of the box. Built on top of [fluxible-js](https://github.com/aprilmintacpineda/fluxible-js). [See demo](https://aprilmintacpineda.github.io/react-fluxible/).

# Install

`npm i -s react-fluxible fluxible-js redefine-statics-js`

# Usage

## Initialize store

```jsx
import { initializeStore } from 'fluxible-js';

initializeStore({
  initialStore: {
    user: {
      name: 'Test User'
    },
    anotherState: 'value'
  }
});

// rest of the app.
```

Before you render your app, you _MUST_ call `initializeStore`. It expects an object as the only parameter, the object have a required property called `initialStore` which will be used as the initial value of the store.

There's also the optional property called `persist` which _MUST_ also be an object containing two required properties. [Learn more about fluxible-js](https://github.com/aprilmintacpineda/fluxible-js#initialize-store).

## :new: Connecting your components to the store

```jsx
import { mapStatesToProps } from 'react-fluxible';

class MyComponent extends Component {
  render() {
    return (
      <div>
        <p>{this.props.user.name}</p>
      </div>
    );
  }
}

export default mapStatesToProps(MyComponent, states => {
  return {
    user: state.user
  };
});
```

`mapStatesToProps` has two parameters. (1) The component itself. (2) A callback function that must return the states you want to be available as `props` in that component.

## :new: Updating the store

You can choose between using the [event bus](https://github.com/aprilmintacpineda/fluxible-js#event-bus) or calling [updateStore](https://github.com/aprilmintacpineda/fluxible-js#update-the-store) directly from the component.

#### Using updateStore

```jsx
import { updateStore } from 'fluxible-js';
import { mapStatesToProps } from 'react-fluxible';

class MyComponent extends Component {
  handleClick = () => {
    updateStore({
      anotherState: 'newValue'
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

export default mapStatesToProps(MyComponent, states => {
  return {
    user: state.user,
    anotherState: state.anotherState
  };
});
```

You can also build a function yourself that would perform what you need to do.

```jsx
import { updateStore } from 'fluxible-js';
import { mapStatesToProps } from 'react-fluxible';
import { doSomething } from '../mutations';

class MyComponent extends Component {
  render() {
    return (
      <div>
        <p>{this.props.user.name}</p>
        <button onClick={doSomething}>Click me</button>
      </div>
    );
  }
}

export default mapStatesToProps(MyComponent, states => {
  return {
    user: state.user,
    anotherState: state.anotherState
  };
});
```

This is better compared to how `connect` used to do it. This is more flexible, manageable, and performant. You don't need to make a lot of function calls when you can simply import `updateStore` and `getStore` pretty much wherever you want. The only purpose of `mapStatesToProps` provided by `react-fluxible` is to make sure that the components receive the latest store when the store is updated.

#### Using the event bus

Somewhere in your source code, ideally before emitting this event:

```js
import { addEvent, updateStore } from 'fluxible-js';

addEvent('my-event', payload => {
  console.log(payload);

  updateStore({
    anotherState: payload
  });
});
```

On your component:

```jsx
import { emitEvent } from 'fluxible-js';
import { mapStatesToProps } from 'react-fluxible';

class MyComponent extends Component {
  handleClick = () => {
    emitEvent('my-event', 'newValue');
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

export default mapStatesToProps(MyComponent, states => {
  return {
    user: state.user,
    anotherState: state.anotherState
  };
});
```

## :skull: Connect your components to the store

:warning: **DEPRECATED** and scheduled for removal soon.

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

function mapStatesToProps(state) {
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
  mapStatesToProps,
  mutations
)(MyComponent);
```

`mapStatesToProps` _MUST_ be a function that _MUST_ return an object containing the states that you want to be accessible in the connected component as props.

`mutations` _MUST_ be an object that has methods in it. The methods will be the ones you can call to update a specific part of the store. Mutation object is expected to be constant.

Both `mapStatesToProps`, `mutations` are optional. That mean you can specify `mutations` but not `mapStatesToProps` like so:

```jsx
export default connect(
  undefined,
  mutations
)(MyComponent);
```

Vice versa with `mapStatesToProps` like so:

```jsx
export default connect(mapStatesToProps)(MyComponent);
```

Although you both are not required, I don't recommend connecting a component but not having both `mapStatesToProps` and `mutations`.

#### Warnings about `mapStatesToProps`

**The returned object keys of `mapStatesToProps` should not change**.

i.e., make sure that the keys are always there and have been there from the start. Doing something like this will cause your component to fail in future updates:

```js
function mapStatesToProps(storeState) {
  const states = {};

  if (somecondition) {
    states.key = storeState.key;
  }

  return states;
}
```

**Returned object keys of `mapStatesToProps` should be the same keys as the state's**

Example:

_do_

```jsx
function mapStatesToProps(state) {
  return {
    user: state.user,
    anotherState: state.anotherState
  };
}
```

_Don't do_: Doing so will cause the connected component to fail to update when `state.user` gets updated.

```jsx
function mapStatesToProps(state) {
  return {
    aDifferentKey: state.user,
    anotherState: state.anotherState
  };
}
```

**Connected components that does not have `mapStatesToProps` will not update**.

Update listeners will only be called when a particular state that they are observing have been updated, if not, then they will not be update. Thus, having no `mapStatesToProps` means that your connected component will not be updated due to store update since it is not and will not observe any states at all.

## :skull: Mutations

:warning: **DEPRECATED** and scheduled for removal soon.

When you call a mutation, you can provide arguments. Except you have to keep in mind that the first parameter that your function will receive is the object called `store`. The `store` has `getStore` and `updateStore` methods.

#### `store.getStore`

Method which you can call anytime to get the latest `store` at that point of call.

#### `store.updateStore`

Method which you can call anytime to update a specific part of the `store`. It expects an object as the first parameter, the object should contain the states that you want to update.

```jsx
const mutations = {
  updateAnotherState(store, anotherState) {
    store.updateStore({ anotherState });
  }
};
```

In the example code above, when you call `this.props.updateAnotherState`, it will only update `anotherState` key of the store, the rest will remains as they were before the update. The method also expects a function as an optional second parameter that will be called **after** the update but **before** persist (if you use persist).

## :skull: dispatch module

:warning: **DEPRECATED** and scheduled for removal soon.

The `dispatch` module is a function that you can use to dispatch actions outside a connected component. It expects a callback function as the first parameter, and other parameters will be passed to the callback function as succeeding arguments.

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

# Contributing

Discussions, questions, suggestions, bug reports, feature request, etc are all welcome. Just create an issue. Just ensure that you are responsive enough.

---

Created with :heart: by April Mintac Pineda.
