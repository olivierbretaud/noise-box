import React, { useState} from 'react';
import Select from 'react-select';
import Tone from 'tone';

import Note from './Note';

const actx  = Tone.context;
const dest  = actx.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream);
const date = new Date().getTime().toString();

export default function Synth(props) {
  const audioId = props.color + date
  const loopPlayer = document.getElementById(audioId)

  const [noteValue , setNoteValue] = useState(3);
  const [isRecord , setIsRecord ] = useState(false);
  const [ isLoop , setIsLoop] = useState(false);
  const [ loopIsPlaying , setLoopIsPlaying ] = useState(false);
  const [ selectedSynth , setSelectedSynth ] = useState({ value: new Tone.Synth() , label: 'Synth' });

  var Cmajor = ['C','D','E','F','G','A','B'];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid #1f1f1f',
      color: props.color,
      textAlign: 'left',
      padding: 5,
      backgroundColor: state.isSelected ? '#1f1f1f' : '#2c2c2c' ,
      '&:hover': {
        backgroundColor: '#1f1f1f',
      },
    }),
    menu:(provided) => ({
      ...provided,
      boxShadow: '2px 1px 18px #000000',
      backgroundColor: '#2c2c2c',
      paddingBottom: 0
    }),
    control: (provided, state ) => ({
      ...provided,
      // none of react-select's styles are passed to <Control />
      boxShadow: "none",
      color: props.color,
      flexDirection: 'row-reverse',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      '&:hover': {
        borderColor: 'transparent',
        boxShadow: '0px 0px 0px transparent'
      }
    }),
    indicatorSeparator: () => ({
      // none of react-select's styles are passed to <Control />
      display:'none'
    }),
    valueContainer: () => ({
      // none of react-select's styles are passed to <Control />
      width: 150,
      backgroundColor: 'transparent'
    }),
    singleValue: (provided, state) => {
      const color =  props.color;
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition , color };
    }
  }

  const options = [
    { value: new Tone.PluckSynth() , label: 'Pluck Synth' },
    { value: new Tone.Synth() , label: 'Synth' },
    { value: new Tone.MembraneSynth(), label: 'Membrane' }
  ]

  var synth = selectedSynth.value

  const chunks = [];
  synth.connect(dest);

  synth.toMaster();

  recorder.ondataavailable = evt => chunks.push(evt.data);

  recorder.onstop = evt => {
    let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    loopPlayer.src = URL.createObjectURL(blob);
  };

  function recordStart() {
    recorder.start()
    setIsRecord(true)
  }

  function recordStop() {
    recorder.stop()
    setIsRecord(false)
    setIsLoop(true)
  }

  function handlePlayLoop() {
    if (loopIsPlaying) {
      loopPlayer.pause()
      loopPlayer.currentTime = 0;
      setLoopIsPlaying(false)
    } else {
      loopPlayer.play()
      setLoopIsPlaying(true)
    }
  }

  function handelChangeNote(note) {
    if (note > 0 && note < 8) {
      setNoteValue(note)
    }
  };

  return (
    <div className="synth">
      <audio className="d-none" id={audioId} controls loop ></audio>
      <div className="note-container">
        <Select
          styles={customStyles}
          value={selectedSynth}
          onChange={(value) => setSelectedSynth(value)}
          options={options}
          />
        <div className="btn">
          <div className="btn-set-note" onClick={()=> handelChangeNote(noteValue - 1)}>-</div>
          <span className="note" >{noteValue}</span>
          <div className="btn-set-note" onClick={()=> handelChangeNote(noteValue + 1)}>+</div>
        </div>
      </div>
      <div className="note-container">
        {Cmajor.map(note => <Note synth={synth} note={note + noteValue} color={props.color} />)}
      </div>
      <div className="note-container">
        {Cmajor.map(note => <Note synth={synth} note={note + 'b' + noteValue} color={props.color}/>)}
      </div>
      <div className="note-container">
        {!isRecord ?
          <button onClick={()=> recordStart()} className="btn">
            record loop
          </button>
        :
          <button onClick={()=> recordStop()} className="btn">
            stop record
          </button>
        }
        {isLoop?
          <button onClick={()=> handlePlayLoop()} className="btn">
            {loopIsPlaying? "stop loop" : "play loop"}
          </button>
          :
          null
        }
      </div>
    </div>
  )
} 