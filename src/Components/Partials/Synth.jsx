import React, { useState } from 'react';
import Tone from 'tone';

import Note from './Note';

export default function Synth(props) {
  const [noteValue , setNoteValue] = useState(1);

  function handelChangeNote(note) {
    if (note > 0 && note < 8) {
      setNoteValue(note)
    }
  }
  
  var synthA = new Tone.MembraneSynth().toMaster();

  var Cmajor = ['A','B','C','D','E','F','G'];

  return (
    <>
      <div className="synth-container">
        {Cmajor.map(note => <Note synth={synthA} note={note + noteValue} color={"#cc00cc"}/>)}
      </div>
      <div className="synth-container">
        {Cmajor.map(note => <Note synth={synthA} note={note + noteValue + '#'} color={"#cc00cc"}/>)}
      </div>
      <div>
      <div className="synth-container">
        <div className="btn-set-note" onClick={()=> handelChangeNote(noteValue - 1)}>-</div>
        {noteValue}
        <div className="btn-set-note" onClick={()=> handelChangeNote(noteValue + 1)}>+</div>
      </div>
      </div>
    </>
  )
} 