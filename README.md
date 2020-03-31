<!-- @format -->

# react-fluxible

Connector for [react-js](https://github.com/facebook/react/) and [fluxible-js](https://github.com/aprilmintacpineda/fluxible-js) which allows you to access the store inside your components and rerender your component when the store changes. [See demo](https://aprilmintacpineda.github.io/react-fluxible/).

# Install

```
npm i -S react-fluxible fluxible-js
```

If you are going to use `withFluxibleStore` HOC you also need to:

```
npm i -S redefine-statics-js
```

# Rendering performance impact

## The following applies for both useFluxibleStore hook and withFluxibleStore HOC.

#### react-fluxible does NOT rely on a wrapper on top of your app.

Unlike `react-redux`, `react-fluxible` does **NOT** rely on a global provider on top of your app. This makes it more performant and independent. You simply have to choose between hooks or HOCs.

#### react-fluxible does NOT rerender your entire app when the store was updated.

Why would it?

#### react-fluxible does selective update

That means, when you update the global store, `react-fluxible` does **NOT** rerender all components connected to the store. It only rerenders components that are using the store key that was updated.

This means that if you have 100 components connected to the global store, and you updated a store key called `authUser`, and you only have 5 components connected to the store that are using `authUser`, then only those 5 components will be rerendered and given the updated values.

#### react-fluxible does not do anything about the store

It does not set, reset or update the store, it only does the following:

1. Connect to the store.
2. Wait for updates on the store keys that you are using, i.e., `authUser`.
3. Rerender your component with the new values when that/those store key/s was/were updated.
4. Disconnect to the store when your component unmounts, this is necessary for cleanup.

## The following applies for useFluxibleStore hook only

#### react-fluxible does not care if your mapStatesCallback changes

`mapStatesCallback` should actually NEVER change. Ideally, you should use `React.useCallback`, however, `useFluxibleStore` does not really do anything even when `mapStatesCallback` changes.

# Usage

## Initialize store

Refer to [fluxible-js docs](https://github.com/aprilmintacpineda/fluxible-js#usage) for more information on initialization.

## Using hooks to connect your component to the store

```jsx
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

function MyComponent () {
  const mapStatesCallback = React.useCallback(
    states => ({ user: states.user })
  );

  const user = useFluxibleStore(mapStatesCallback);

  return (
    <div>
      <p>{user.name}</p>
    </div>
  );
}
```

#### useFluxibleStore's parameters

1. A function that will receive the current store and will have to return the state that the component needs. It is important that you only return the state that you want to use in that component because `useFluxibleStore` watches for changes so that updating other states that you don't need in the component will not cause the component to rerender.

## Using HOC to connect your component to the store

```jsx
import withFluxibleStore from 'react-fluxible/lib/withFluxibleStore';

class MyComponent extends Component {
  render() {
    return (
      <div>
        <p>{this.props.user.name}</p>
      </div>
    );
  }
}

function mapStatesToPropsCallback(states) {
  return { user: states.user };
}

export default withFluxibleStore(MyComponent, mapStatesToPropsCallback);
```

#### withFluxibleStore's parameters

1. The component to connect to the store.
2. A function that will receive the current store and will have to return the state that the component needs. It is important that you only return the state that you want to use in that component because `withFluxibleStore` watches for changes so that updating other states that you don't need in the component will not cause the component to rerender. All of the states you return will be available to the component's `this.props`, in the example above, it was `this.props.user`.

# Contributing

Discussions, questions, suggestions, bug reports, feature request, etc are all welcome. Just create an issue. Just ensure that you are responsive enough.

---

Created with :heart: by April Mintac Pineda.
