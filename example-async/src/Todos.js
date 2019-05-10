/** @format */

import React from 'react';
import { mapStatesToProps } from './lib';
import { updateStore, store } from 'fluxible-js';

class Todos extends React.Component {
  render () {
    return (
      <div>
        <h3>Todos component: Your todos (managed by inferno-fluxible)</h3>
        {
          this.props.todos.length
            ? this.props.todos.map((todo, i) => (
              <p key={i} className="done">
                <span
                  onClick={() => {
                    updateStore({
                      todos: store.todos.filter((_, index) => index !== i)
                    });
                  }}
                  style={{
                    cursor: 'pointer',
                    color: 'white',
                    padding: '2px',
                    borderRadius: '4px',
                    backgroundColor: 'red',
                    marginRight: '5px'
                  }}>
                  x
                </span>
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  style={{
                    marginRight: '5px'
                  }}
                  onChange={ev => {
                    updateStore({
                      todos: store.todos.map((todo, index) => {
                        if (index !== i) return todo;

                        return {
                          ...todo,
                          isDone: ev.target.checked
                        };
                      })
                    });
                  }}
                />
                {todo.isDone ? <s>{todo.value}</s> : todo.value}
              </p>
            ))
          : (
            <p>You have no todos.</p>
          )
        }
      </div>
    );
  }
}

export default mapStatesToProps(Todos, state => ({
  todos: state.todos
}));
