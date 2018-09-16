/** @format */

import { updateStore, addUpdateListener, getStore } from 'fluxible-js';
import React from 'react';

/**
 *
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
  return WrappedComponent =>
    class Wrapper extends React.Component {
      constructor (props) {
        super(props);

        this.state = {
          count: 1
        };

        this.removeListener = addUpdateListener(() => {
          this.setState({
            count: this.state.count + 1
          });
        });
      }

      componentWillUnmount () {
        // clean update listener before we unmount.
        this.removeListener();
      }

      render () {
        return (
          <WrappedComponent
            {...this.props}
            {...(mapStatesToProps ? mapStatesToProps(getStore()) : {})}
            {...(definedMutations
              ? Object.keys(definedMutations).reduce((mutationCollection, mutation) => {
                  return {
                    ...mutationCollection,
                    [mutation]: (...payload) => dispatch(definedMutations[mutation], ...payload)
                  };
                }, {})
              : {})}
          />
        );
      }
    };
}
