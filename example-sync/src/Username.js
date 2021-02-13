import React from 'react';
import useFluxibleStore from './lib/useFluxibleStore';

function mapStates ({ username }) {
  return { username };
}

function Username () {
  const { username } = useFluxibleStore(mapStates);

  return (
    <div>
      <h3>
        Username component: Your usename (managed by react-fluxible)
      </h3>
      <p>{username || 'You have no username.'}</p>
    </div>
  );
}

export default Username;
