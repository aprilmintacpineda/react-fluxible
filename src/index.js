/** @format */

import { addObserver, getStore } from 'fluxible-js';
import React from 'react';
import redefineStatics from 'redefine-statics-js';

export function mapStatesToProps (WrappedComponent, callback) {
  function ConnectedComponent (props) {
    this.props = props;

    this.state = {
      count: 0
    };

    let mappedStates = callback(getStore());

    this.componentWillUnmount = addObserver(() => {
      mappedStates = callback(getStore());
      this.setState({
        count: this.state.count + 1
      });
    }, Object.keys(mappedStates));

    // eslint-disable-next-line
    this.render = () => <WrappedComponent {...this.props} {...mappedStates} />;

    return this;
  }

  ConnectedComponent.prototype = React.Component.prototype;
  ConnectedComponent.prototype.constructor = ConnectedComponent;

  redefineStatics(ConnectedComponent, WrappedComponent);

  return ConnectedComponent;
}
