import React from 'react'
import Admin from '../Admin/Admin'
import Config from '../Settings/Config'
import './Dashboard.css'
function Dashboard() {
  return (
    <div className='dashboard'>
        {Config.Role==5? <Admin/> :<></>}
        
        
        
    
    
    </div>
  )
}

export default Dashboard
