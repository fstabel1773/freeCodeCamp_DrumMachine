import React, { useState, useEffect, useRef } from 'react'

import drumData from "./drumData"
import DrumPad from "./DrumPad"


function App() {
  const [drumPattern, setDrumPattern] = useState([])
  const keyDown = useRef(null)

  // handling keyDown
  // useEffect(() => {
  //   keyDown.current.focus()
  // }, [drumPattern])

  function handleKeyDown(event) {
    drumData.forEach(drum => {
      drum.id === event.key.toUpperCase() ? handleDrum(drum.description) : {}
    })
  }

  function handleDrum(desc) {
    const matchingDrum = drumData.find(drum => drum.description === desc)
    // setDrumPattern(prevDrumPattern => [...prevDrumPattern, matchingDrum])
    let audio = new Audio(matchingDrum.url)
    audio.play()
  }

  const drumPads = drumData.map(drum => {
    return (
    <DrumPad 
      key={drum.id} 
      drum={drum} 
      drumPattern={drumPattern} 
      handleDrum={handleDrum} />
    )
  })

  return (
    <div id="App-Wrapper" className="" tabIndex={0} ref={keyDown} onKeyDown={(event) => handleKeyDown(event)}>
      <div id="drum-machine" className="">
        <div id="drumpad-grid">
          {drumPads}
        </div>
        <div id="setting-grid">
          <div id="display">
           {drumPattern.length > 0
            ? drumPattern[drumPattern.length - 1].description 
            : " "}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App




