<!-- @format -->

# react-fluxible

Connector for [react-js](https://github.com/facebook/react/) and [fluxible-js](https://github.com/aprilmintacpineda/fluxible-js) which allows you to access the store inside your component. [See demo](https://aprilmintacpineda.github.io/react-fluxible/).

# Install

```
npm i -S react-fluxible fluxible-js
```

If you are going to use `withFluxibleStore` HOC you also need to:

```
npm i -S redefine-statics-js
```

# Usage

## Initialize store

Refer to [fluxible-js docs](https://github.com/aprilmintacpineda/fluxible-js#usage) for more information on initialization.

## Using hooks to connect your component to the store

```jsx
import useFluxibleStore from 'react-fluxible/useFluxibleStore';

function MyComponent () {
  const user = useFluxibleStore(states => ({
    user: states.user
  }));

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
import withFluxibleStore from 'react-fluxible/withFluxibleStore';

class MyComponent extends Component {
  render() {
    return (
      <div>
        <p>{this.props.user.name}</p>
      </div>
    );
  }
}

export default withFluxibleStore(MyComponent, states => ({
  user: state.user
}));
```

#### withFluxibleStore's parameters

1. The component to connect to the store.
2. A function that will receive the current store and will have to return the state that the component needs. It is important that you only return the state that you want to use in that component because `withFluxibleStore` watches for changes so that updating other states that you don't need in the component will not cause the component to rerender. All of the states you return will be available to the component's `this.props`, in the example above, it was `this.props.user`.

# Contributing

Discussions, questions, suggestions, bug reports, feature request, etc are all welcome. Just create an issue. Just ensure that you are responsive enough.

---

Created with :heart: by April Mintac Pineda.
