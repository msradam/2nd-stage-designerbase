import React, { useState, useEffect } from 'react'
import Designer from './components/Designer'
import Popup from './components/Popup'
import designerService from './services/designers' 


const App = () => {
  const [designers, setDesigners] = useState([]) 

  useEffect(() => {
    designerService
      .getAll()
      .then(initialDesigners => setDesigners(initialDesigners))
  }, [])

  const rows = () => designers.map(designer =>
    <Designer
      designer={designer}
    />
  )

  return (
    <div className='main'>
      <Popup />
      <h1>Wes Student Theater DesignerBase</h1>
      <p>Looking for designers, choreographers, or coordinators for your shows? Look no further.</p>
      
      <div className='cards'>
      {rows()}
    </div>
    </div>
    
  )
}

export default App 