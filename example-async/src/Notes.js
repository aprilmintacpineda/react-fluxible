/** @format */

import React from 'react';

export default function notes () {
  return (
    <div>
      <h1>react-fluxible demo.</h1>
      <h2>State management library for inferno built on top of fluxible-js.</h2>
      <p>
        In this demo app, I used <strong>react-fluxible</strong> to manage your username and todos.
        {'I\'m'} also using the persist feature to persist your todos but not your username. That
        means even if after you refresh your page, your todos should still be intact.
      </p>
    </div>
  );
}
