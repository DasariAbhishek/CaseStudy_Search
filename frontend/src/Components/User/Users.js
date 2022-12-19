import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Config from '../Settings/Config'
import Unauthorized from '../Unauthorized/Unauthorized';
import './Users.css'

function Users() {
    const[Users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get(Config.api + 'Users')
        .then(res =>{
            setUsers(res.data)
        })
        .catch(err=> console.log(err))
    },[])
 
  return (
    <>
    {Config.isUserLoggedin ? 
        <>
        {Users.map( user=>(
        <div className="card mb-2" key={user.userId}>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-5'>
                        <p className="user-body"><b>{user.firstName +" "+ user.lastName}</b></p>
                        <p className="user-body">
                        <a href={"mailto:" + user.corpMail}><i className="add-role fa fa-envelope" aria-hidden="true"></i></a>
                        &nbsp;: {user.corpMail}
                        </p>
                        <p className="user-body">
                            <i className="fa fa-map-marker add-role" aria-hidden="true"></i>
                            &nbsp;: {user.location}
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <i class="fa fa-star text-warning" aria-hidden="true"></i>
                            &nbsp;: {user.grade}
                        </p>
                    </div>
                    <div className='col-2'>
                        <p><i className="fa fa-user" aria-hidden="true"></i> : {user.roles.roleName}</p>
                    </div>
                    <div className='col-5 d-flex justify-content-end'>
                        <div className=''>
                        <button className="btn btn-secondary me-2"> View </button>
                        <button className="btn btn-secondary me-2"> Update </button>
                        <button className="btn btn-danger me-2"> Remove </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ))}
        </> : 
        <>
            <Unauthorized/>
        </>
    }
    </>
  )
}

export default Users