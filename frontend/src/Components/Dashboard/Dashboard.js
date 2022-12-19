import React from 'react'
import Admin from '../Admin/Admin'
import Config from '../Settings/Config'
import SuperAdmin from '../Super Admin/SuperAdmin'
import Unauthorized from '../Unauthorized/Unauthorized'

function Dashboard() {
  
  return (
    <div>
      {Config.isUserLoggedin 
      ?<>

      <Admin/>
      <SuperAdmin/>
      </>
      :
      <>
      <Unauthorized/>
      </>
    }
      
    </div>
  )
}

export default Dashboard