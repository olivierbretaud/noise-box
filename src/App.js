import React from 'react';
import Synth from './Components/Partials/Synth';

function App() {

  return (
    <>
      <div className="main-container">
        <Synth color={"#cc00cc"} />
        <Synth color={"#66FFCC"} />
        <Synth color={"#FF6600"} />
      </div>
    </>
  );
}

export default App;
