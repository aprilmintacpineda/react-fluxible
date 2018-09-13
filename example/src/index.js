/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeStore } from 'fluxible-js';

initializeStore({
  initialStore: {
    username: '',
    todos: []
  },
  persist: {
    storage: window.localStorage,
    restore: savedStore => ({
      todos: savedStore.todos || []
    })
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
