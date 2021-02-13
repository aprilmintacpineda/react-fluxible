import { initializeStore } from 'fluxible-js';
import localforage from 'localforage';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

localforage.config({
  driver: [
    localforage.WEBSQL,
    localforage.INDEXEDDB,
    localforage.LOCALSTORAGE
  ],
  name: 'myApp',
  version: '1.0',
  storeName: 'asyncStorage',
  description: 'react-fluxible example using asyncStorage'
});

initializeStore(
  {
    initialStore: {
      username: '',
      todos: []
    },
    persist: {
      asyncStorage: localforage,
      restore: savedStore => ({
        todos: savedStore.todos || []
      })
    }
  },
  () => {
    // eslint-disable-next-line
    console.log('async init done.');
    ReactDOM.render(<App />, document.getElementById('root'));
  }
);
