/** @format */

import { updateStore, addObserver, getStore } from 'fluxible-js';
import React from 'react';
import redefineStatics from 'redefine-statics-js';

/**
 *
 * @param {Function} callback function that would be called sa the mutation handler.
 * @param  {...any} payload to the callback function
 */
export function dispatch (mutation, ...payload) {
  return mutation(
    {
      getStore,
      updateStore: (updatedState, callback) => {
        updateStore(updatedState);
        if (callback) callback();
      }
    },
    ...payload
  );
}

/**
 * @param {Function} Would receive the current store's state as the only argument. Should return an object of the states that you want to be accessible in the connected component.
 * @param {Object} You should define your action handlers here. Each methods would be called with an object (that has `updateStore` and `getStore` methods) as the first argument. The rest would be the arguments you passed to the call.
 * @return {Object} the inferno component.
 */
export function connect (mapStatesToProps, definedMutations) {
  return WrappedComponent => {
    // we only want to compute mutations once
    let mutations;
    if (definedMutations) {
      mutations = {};
      Object.keys(definedMutations).forEach(key => {
        mutations[key] = (...payload) => dispatch(definedMutations[key], ...payload);
      });
    }

    function ConnectedComponent (props) {
      this.props = props;

      if (mapStatesToProps) {
        this.removeListener = addObserver(() => {
          this.setState({
            count: this.state.count + 1
          });
        }, Object.keys(mapStatesToProps(getStore())));

        this.state = {
          count: 0
        };
      }

      this.componentWillUnmount = () => {
        if (this.removeListener) this.removeListener();
      };

      // eslint-disable-next-line
      this.render = () => {
        if (mapStatesToProps && mutations) {
          return (
            <WrappedComponent {...this.props} {...mutations} {...mapStatesToProps(getStore())} />
          );
        } else if (mapStatesToProps) {
          return <WrappedComponent {...this.props} {...mapStatesToProps(getStore())} />;
        }

        return <WrappedComponent {...this.props} {...mutations} />;
      };

      return this;
    }

    ConnectedComponent.prototype = React.Component.prototype;
    ConnectedComponent.prototype.constructor = ConnectedComponent;

    redefineStatics(ConnectedComponent, WrappedComponent);

    return ConnectedComponent;
  };
}
