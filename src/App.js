import React from 'react';
import Tone from 'tone';
import Synth from './Components/Partials/Synth';

function App() {

  var synthA = new Tone.Synth({
    oscillator: {
      type: 'fmsquare',
      modulationType: 'sawtooth',
      modulationIndex: 3,
      harmonicity: 3.4
    },
    envelope: {
      attack: 0.001,
      decay: 0.1,
      sustain: 0.1,
      release: 0.1
    }
  }).toMaster()
  
  var synthB = new Tone.MembraneSynth().toMaster()

  var Cmajor = ['A4','B4','C4','D4','E4','F4','G4'];

  return (
    <div className="App">
      <div className="synth-container">
        {Cmajor.map(note => <Synth synth={synthA} note={note} color={"#cc00cc"}/>)}
      </div>
      <div className="synth-container">
        {Cmajor.map(note => <Synth synth={synthB} note={note} color={"#48D1CC"}/>)}
      </div>
    </div>
  );
}

export default App;
