import { updateStore, store } from 'fluxible-js';
import React from 'react';
import Notes from './Notes';
import Todos from './Todos';
import Username from './Username';

export default class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      newUsername: '',
      newTodoValue: ''
    };
  }

  render () {
    return (
      <div className="App">
        <Notes />
        <hr />
        <p>
          This data is store internally as state of this component.
        </p>
        <form
          onSubmit={ev => {
            ev.preventDefault();

            updateStore({
              username: this.state.newUsername
            });

            this.setState({
              ...this.state,
              newUsername: ''
            });
          }}
        >
          <input
            type="text"
            value={this.state.newUsername}
            placeholder="Your username here..."
            onChange={ev => {
              this.setState({
                ...this.state,
                newUsername: ev.target.value
              });
            }}
          />
          <input type="submit" value="Change username" />
        </form>
        <hr />
        <h3>Add todo</h3>
        <p>
          This data is managed as internal state of this component.
        </p>
        <form
          onSubmit={ev => {
            ev.preventDefault();

            updateStore({
              todos: store.todos.concat({
                value: this.state.newTodoValue,
                isDone: false
              })
            });

            this.setState({
              ...this.state,
              newTodoValue: ''
            });
          }}
        >
          <input
            type="text"
            value={this.state.newTodoValue}
            onChange={ev => {
              this.setState({
                newTodoValue: ev.target.value
              });
            }}
          />
          <input type="submit" value="Add todo" />
        </form>
        <hr />
        <Username />
        <Todos />
      </div>
    );
  }
}
