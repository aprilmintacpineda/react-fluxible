/** @format */

import React from 'react';
import { connect } from './lib';

class Username extends React.Component {
  render () {
    return (
      <div>
        <h3>Username component: Your usename (managed by inferno-fluxible)</h3>
        <p>{this.props.username.length ? this.props.username : 'You have no username.'}</p>
      </div>
    );
  }
}

export default connect(state => ({
  username: state.username
}))(Username);
