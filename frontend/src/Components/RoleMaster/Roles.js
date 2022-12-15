import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Config from '../Settings/Config';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../RoleMaster/Roles.css'


function Roles() {
    const [Roles, setRoles] = useState([]);
    const [show, setShow] = useState(false);
    const [Id, setId] = useState();
    const [showUpdate, setShowUpdate] = useState(false);
    const [UpdateId, setUpdateId] = useState();
    const [UpdateName, setUpdateName] = useState();
    const [ShowAdd, setShowAdd] =useState(false);
    const [AddName, setAddName] =useState();

    const handleChange = (e) => {
        setUpdateName(e.target.value);
      };
    
    const handleAddChange = (e) => {
      setAddName(e.target.value);
    };

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }

    const handleUpdateClose = () => setShowUpdate(false);
    const handleUpdateShow = (id,name) => {
        setShowUpdate(true);
        setUpdateId(id);
        setUpdateName(name);
    }
    
    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => {
        setShowAdd(true);   
       
    }

    useEffect(()=> {
        axios.get(Config.api + 'Roles')
            .then(response=>response.data)
            .then(res=> setRoles(res))
        .catch(err=> console.log(err))
    },[])

    function deleteRole(){
        axios.delete(Config.api + `Roles/${Id}`)
         .then(res=> {console.log(res);
            window.location.reload();})
         .catch(err=>console.log(err))
    }

    function updateRole(){
        let updatedRole = {
            RoleId: UpdateId,
            RoleName: UpdateName
        }
        axios.put(Config.api + `Roles/${UpdateId}`, updatedRole)
             .then(res=> {console.log(res);
                window.location.reload();})
             .catch(err => console.log(err))
    }

    function AddRole(){
      let AddRole = {
          
          RoleName: AddName
      }
      axios.post(Config.api + `Roles`, AddRole)
           .then(res=> {console.log(res);
              window.location.reload();})
           .catch(err => console.log(err))
  }

  return (
    <>
    <div className="container mt-5 mb-5">
    <div className="d-flex justify-content-center">
      <h1 className='role-label-heading mb-5'>Roles
      {/* <a className='add-role' href="/Department/Add"> */}
      <a href="#" onClick={() => {handleAddShow()}}>
      <i className="fa fa-plus-circle ms-3"  ></i></a>
      </h1>
    </div>
        <div className="row role-row">
            {Roles.map(role => (
          <div className="col-lg-4 col-md-6" key={role.roleId}>
            <article className="card mb-3 role-card p-3">
              <div className="row no-gutters">
                <div className="col-9">
                    <div className="">                            
                      <h4 className=""> {role.roleId}. {role.roleName}</h4>                          
                    </div>
                </div>
              <aside className="col-2">
                <div>
                  <div className="d-grid gap-3 d-md-flex justify-content-md-right mt-1 fs-5">      
                      <a href="#" onClick={() => {handleUpdateShow(role.roleId,role.roleName)}}>
                        <i className="far fa-edit role-icon"></i>
                      </a>                    
                      <a href="#" onClick={() => {handleShow(role.roleId)}}>
                      <i className="fa fa-trash role-delete"></i>
                      </a>        
                  </div>
                </div>
              </aside>
            </div>
            </article> 
          </div>
          ))}
            </div>
            {/* DELETE ROLE MODAL */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fa fa-trash-o fa-1x centered me-2" aria-hidden="true" style={{ color: "red" }}></i> Delete Role
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
            <p>Do you really want to delete this record? This process cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteRole}>
            Confirm Delete
          </Button>
          </Modal.Footer>
            </Modal>

            {/* UPDATE ROLE MODAL */}
            <Modal show={showUpdate} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fa fa-edit fa-1x centered me-2 role-icon" aria-hidden="true"></i> Update Role
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                     <div className="mb-3">
                        <label className="form-label">Role</label>
                        <input type="text" className="form-control" id="RoleName" onChange={handleChange} value={UpdateName} placeholder="Role"/>
                    </div>
                    <center>
                    <Button className="login-btn" onClick={updateRole}>
                        Update
                    </Button></center>
                    </Modal.Body>
            </Modal>

            {/* ADD ROLE MODAL */}
            <Modal show={ShowAdd} onHide={handleAddClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fa fa-edit fa-1x centered me-2 role-icon" aria-hidden="true"></i> Add Role
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                     <div className="mb-3">
                        <label className="form-label">Role</label>
                        <input type="text" className="form-control" id="RoleName" onChange={handleAddChange}  placeholder="Role"/>
                    </div>
                    <center>
                    <Button className="login-btn" onClick={AddRole}>
                        Add
                    </Button></center>
                    </Modal.Body>
            </Modal>
          </div>
        </>
  )
}

export default Roles