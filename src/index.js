/** @format */

import { updateStore, addUpdateListener, getStore } from 'fluxible-js';
import React from 'react';
import createClass from 'create-react-class';
import redefineStatics from 'redefine-statics-js';

/**
 * @param {Function} callback function that would be called sa the mutation handler. Should expect an object as the first parameter.
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
 * @return {Object} the react component.
 */
export function connect (mapStatesToProps, definedMutations) {
  return WrappedComponent => {
    // we only want to compute mutations once
    const mutations = {};

    if (definedMutations) {
      const mutationKeys = Object.keys(definedMutations);

      for (let a = 0; a < mutationKeys.length; a++) {
        mutations[mutationKeys[a]] = (...payload) =>
          dispatch(definedMutations[mutationKeys[a]], ...payload);
      }
    }

    return redefineStatics(
      createClass({
        getInitialState () {
          return {
            count: 0
          };
        },
        componentDidMount (props) {
          this.removeListener = addUpdateListener(() => {
            this.setState({
              count: this.state.count + 1
            });
          });
        },
        componentWillUnmount () {
          // clean update listener before we unmount.
          this.removeListener();
        },
        render () {
          return (
            <WrappedComponent
              {...this.props}
              {...(mapStatesToProps ? mapStatesToProps(getStore()) : {})}
              {...mutations}
            />
          );
        }
      }),
      WrappedComponent
    );
  };
}
