import React, { useEffect, useRef } from 'react'


function Drumpad(props) {
    const {drum, drumPattern, handleDrum} = props
    // const audioElt = useRef()

    // useEffect(() => {
    //     playSound()
    // }, [drumPattern])

    // function playSound() {
    //     const latestDrum = drumPattern[drumPattern.length - 1]
    //     if (latestDrum && 
    //         drum.description === latestDrum.description) {
    //         audioElt.current.play()
    //         }
    // }

    return (
        <button 
            id="description" 
            className="drum-pad"
            onClick={() => handleDrum(drum.description)} >
            <audio 
                id={drum.id === "Y" ? "Z" : drum.id}
                src={drum.url} 
                className="clip"
                // ref={audioElt}
                >
            </audio>
            {drum.id === "Y" ? "Z" : drum.id}
        </button>
    )
}

export default Drumpad