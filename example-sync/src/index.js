import { initializeStore } from 'fluxible-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

initializeStore({
  initialStore: {
    username: '',
    todos: []
  },
  persist: {
    syncStorage: window.localStorage,
    restore: savedStore => ({
      todos: savedStore.todos || []
    })
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
