import React from 'react'
import { Waveform } from '@uiball/loaders'


const Loader = () => {
  return (
    <div className="justify-center">
        <Waveform 
            size={40}
            lineWeight={3.5}
            speed={1} 
            color="#bc13fe" 
        />
    </div>
  
  )
}

export default Loader