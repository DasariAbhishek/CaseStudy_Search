import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Config from '../Settings/Config'
import Auth401 from "../../images/computer.png"
import './SuperAdmin.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Users from '../User/Users'
import Roles from '../RoleMaster/Roles'


function SuperAdmin() {
    const [superAdmin, setSuperAdmin] = useState([]);
    useEffect(()=>{
        axios.get(Config.api + `Users/${sessionStorage.getItem("Id")}`)
             .then( res => {
                setSuperAdmin(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[])
  return (
    <>
        { Config.isUserLoggedin ?
        <div>
            <div className='sa-header'>
                <h2 className='welcome-head'>Hey there,<br/>{superAdmin.firstName} {superAdmin.lastName}!</h2>
            </div>
            <div className='sa-body'>
                <hr/>
                <Tabs
                    defaultActiveKey="users"
                    id="fill-tab-example"
                    className="mb-3 myClass"
                    fill
                    >
                    <Tab eventKey="users" title="Users">
                        <Users/>
                    </Tab>
                    <Tab eventKey="roles" title="Roles">
                        <Roles/>
                    </Tab>
                    <Tab eventKey="longer-tab" title="Tasks">
       
                    </Tab>
                    <Tab eventKey="contact" title="Candidates">
        
                    </Tab>
                </Tabs>
            </div>
        </div> 
        : 
        <>
            <center className='mt-5 mb-5 p-5'>
                <img src={Auth401} alt="401 - Unauthorised to view page"/>
                <h3 className='mt-5 mb-5 p-5'>Please log in to access this page!</h3>
            </center>
        </> 
        }
    </> 
  )
}

export default SuperAdmin