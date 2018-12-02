<!-- @format -->

# react-fluxible

 Connector for [react-js](https://github.com/facebook/react/) and [fluxible-js](https://github.com/aprilmintacpineda/fluxible-js). [See demo](https://aprilmintacpineda.github.io/react-fluxible/).

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

# Contributing

Discussions, questions, suggestions, bug reports, feature request, etc are all welcome. Just create an issue. Just ensure that you are responsive enough.

---

Created with :heart: by April Mintac Pineda.
