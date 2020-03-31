/** @format */

import React from 'react';
import { addObserver, store } from 'fluxible-js';
import redefineStatics from 'redefine-statics-js';

function withFluxibleStore (WrappedComponent, callback) {
  function ConnectedComponent (props) {
    this.props = props;
    this.state = callback(store);

    // addObserver returns a function for cleanup
    this.componentWillUnmount = addObserver(() => {
      this.setState(callback(store));
    }, Object.keys(this.state));

    this.render = () => <WrappedComponent {...this.props} {...this.state} />;

    return this;
  }

  ConnectedComponent.prototype = React.Component.prototype;
  ConnectedComponent.prototype.constructor = ConnectedComponent;

  redefineStatics(ConnectedComponent, WrappedComponent);

  return ConnectedComponent;
}

export default withFluxibleStore;
