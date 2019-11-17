import React from 'react';

export default function Note(props) {
  
  function playNote() {
    props.synth.triggerAttackRelease(props.note, "4n")
  }

  return (
    <button className="button-play"
      style={{ backgroundColor: props.color }}
      onClick={() => playNote()}>
      <span>{props.note}</span>
    </button>
  )
} 