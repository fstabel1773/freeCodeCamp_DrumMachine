import React, { useState, useEffect, useRef } from 'react'

import drumData from "./drumData"


function App() {
  const [drumPattern, setDrumPattern] = useState(["Go for Drumming!"])
  const [isOn, setIsOn] = useState(true)
  const keyDown = useRef(null)

  const key = useRef(null)
  const power = useRef(null)

  useEffect(() => {
    keyDown.current.focus()
  }, [drumPattern])

  function handleKeyDown(event) {
    drumData.forEach(drum => {
      drum.id === event.key.toUpperCase() ? handleDrum(drum.description) : {}
    })
  }

  function handleDrum(desc) {
    if (isOn) {
      setDrumPattern(prevDrumPattern => [...prevDrumPattern, desc])
      key.current.children.forEach((drumPad) => {
        if (drumPad.id === desc) {
          drumPad.firstChild.play()
        } 
      })
    }
  }

  function togglePower() {
    setIsOn(prevIsOn => !prevIsOn)
  }

  const drumPads = drumData.map(drum => {
    return (
      <div
        key={drum.id}
        id={drum.description}
        className="drum-pad 
          btn btn-lg btn-outline-warning
          border-2
          py-4
          "
        onClick={() => handleDrum(drum.description)} >
        <audio 
          id={drum.id}
          src={drum.url} 
          className="clip"
           >
        </audio>
        <h1 className="">{drum.id}</h1>
      </div>
    )
  })

  // necessary step for bootstrap-grid
  // const drumPadRows = [0, 3, 6].map(num => {
  //   return (
  //     <div className="row border">
  //       {drumPads.filter((drumPad, index) => {
  //         return index >= num && index < num + 3
  //       } )}
  //     </div>
  //   )
  // })

  return (
    <div id="App-Wrapper" className="
      vh-100 bg-dark 
      d-flex justify-content-center align-items-center flex-column
      " 
      tabIndex={0} ref={keyDown} onKeyDown={(event) => handleKeyDown(event)}>

      <h1 className="text-warning d-block mb-4 display-1"><b>Drum Machine</b></h1>  
      <div id="drum-machine" className="
        border border-5 border border-warning rounded
        d-flex align-items-center flex-column flex-md-row justify-content-around
        p-4 m-3
        container
        ">

        <div id="drumpad-grid" className="w-50" ref={key}>
          {drumPads}
        </div>

        <div id="setting-grid" className="h-100 w-50 mt-3 d-flex f-gap-2 flex-column justify-content-between container">
          
          <div className="d-flex justify-content-end py-3">
            <div className="text-warning me-2">Off</div>

            <div className="form-check form-switch">
              <input className="form-check-input opacity-10 bg-warning border border-warning" type="checkbox" role="switch" id="flexSwitchCheckDefault" ref={power} onChange={togglePower} checked={isOn ? true : false } ></input>
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
            </div>

            <div className="text-warning">On</div>
          </div>

          <h4 id="display" className="text-dark text-center bg-warning ms-3 py-2 rounded lh-2 ">
           {drumPattern[drumPattern.length - 1]}
          </h4>

        </div>

      </div>
    </div>
  )
}

export default App




