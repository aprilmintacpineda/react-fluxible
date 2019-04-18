/** @format */

import React from 'react';
import { addObserver, store } from 'fluxible-js';
import redefineStatics from 'redefine-statics-js';

export function mapStatesToProps (WrappedComponent, callback) {
  function ConnectedComponent (props) {
    this.props = props;

    this.state = {
      mappedStates: callback(store)
    };

    this.componentWillUnmount = addObserver(() => {
      this.setState({
        mappedStates: callback(store)
      });
    }, Object.keys(this.state.mappedStates));

    this.render = () => <WrappedComponent {...this.props} {...this.state.mappedStates} />;

    return this;
  }

  ConnectedComponent.prototype = React.Component.prototype;
  ConnectedComponent.prototype.constructor = ConnectedComponent;

  redefineStatics(ConnectedComponent, WrappedComponent);

  return ConnectedComponent;
}
