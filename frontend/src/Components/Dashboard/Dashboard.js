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
      {Config.Rolename=="Super Admin" || "SuperAdmin" ? <SuperAdmin/>:<></>}

      
      {Config.Rolename=="Admin" ? <Admin/>:<></>}

      {Config.Rolename=="Candidate" ? <></>:<></>}

      

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