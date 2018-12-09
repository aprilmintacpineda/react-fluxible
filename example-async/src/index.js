/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import localforage from 'localforage';
import { initializeStore } from 'fluxible-js';
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

initializeStore({
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
});

ReactDOM.render(<App />, document.getElementById('root'));
