import React, { useState, useEffect, useRef } from 'react'

import drumData from "./drumData"


function App() {
  const [drumPattern, setDrumPattern] = useState([])
  const keyDown = useRef(null)

  const key = useRef(null)

  useEffect(() => {
    keyDown.current.focus()
  }, [drumPattern])

  function handleKeyDown(event) {
    drumData.forEach(drum => {
      drum.id === event.key.toUpperCase() ? handleDrum(drum.description) : {}
    })
  }

  function handleDrum(desc) {
    setDrumPattern(prevDrumPattern => [...prevDrumPattern, desc])
    key.current.children.forEach((drumPad) => {
      if (drumPad.id === desc) {
        drumPad.firstChild.play()
      } 
    })
  }

  const drumPads = drumData.map(drum => {
    return (
      <button
        key={drum.id}
        id={drum.description}
        className="drum-pad"
        onClick={() => handleDrum(drum.description)} >
        <audio 
          id={drum.id}
          src={drum.url} 
          className="clip"
           >
        </audio>
        {drum.id}
      </button>
    )
  })

  return (
    <div id="App-Wrapper" className="" tabIndex={0} ref={keyDown} onKeyDown={(event) => handleKeyDown(event)}>
      <div id="drum-machine" className="">
        <div id="drumpad-grid" ref={key}>
          {drumPads}
        </div>
        <div id="setting-grid">
          <div id="display">
           {drumPattern.length > 0
            ? drumPattern[drumPattern.length - 1] 
            : " "}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App




