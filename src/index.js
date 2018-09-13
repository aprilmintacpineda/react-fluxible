/** @format */

import { updateStore, addUpdateListener, getStore } from 'fluxible-js';
import React from 'react';

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
                    [mutation]: (...payload) => {
                      return definedMutations[mutation](
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
                  };
                }, {})
              : {})}
          />
        );
      }
    };
}
