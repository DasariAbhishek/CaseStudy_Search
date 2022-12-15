import React,{useState, useEffect } from 'react'
import axios from 'axios'
import './Verifyuser.css'
import cglogo from '../../images/cg-logo.png'
import Config from '../Settings/Config'
import {useNavigate} from 'react-router-dom';

function Verifyuser() {
  const[SelectedRole, setSelectedRole] =useState("");
  const [Roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const [state, setState] = useState({
    PersonalMail: "",
    CorpMail: "",
  });

  const getVerifiedId = (id) => {
      navigate('/otp',{state:{Id:id}});
  }
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleRoleSelect = (e) =>{
    setSelectedRole(e.target.value)
  }

  useEffect(()=> {
    axios.get(Config.api + 'Roles')
        .then(response=>response.data)
        .then(res=> setRoles(res))
    .catch(err=> console.log(err))
},[])


  function sendotp(id) {
    axios.post(Config.api + `VerifyUser?id=${id}`)
      .then(res => { alert("Email sent successfully!"); window.location.reload();})
    .catch(err => alert("Oops! Something went wrong"))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      PersonalMail: state.PersonalMail,
      CorpMail: state.CorpMail, 
      RoleId: SelectedRole

    };

    axios.get(Config.api + `NewUser?Mail1=${payload.PersonalMail}&Mail2=${payload.CorpMail}`)
        .then(res => { 
           getVerifiedId(res.data.userId)
           sendotp(res.data.userId)})
      .catch(err => alert("Oops! Something went wrong."))
}

  return (
    <div className="card Verifyuser-card mx-auto">
    <form className='login-form'>
        <div className='login-body'>
        <h3 className='login-head'>
        <img src={cglogo} className="cg-logo mb-4" alt="Cg-Logo"/>iTransform Learning</h3>

        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01"><i class="fa fa-user" aria-hidden="true"></i></label>
          <select class="form-select" id="inputGroupSelect01" onChange = {handleRoleSelect}>
            
            <option selected>Select Role...</option>
            {Roles.map(r=>(
            <option id="RoleId"  key={r.roleId} value={r.roleId}>{r.roleName}</option>))}
          
          </select>
        </div>

        <div className="mb-3">
            <label className="form-label login-label">Email Id</label>
            <input type="email" id="PersonalMail" className="form-control" onChange={handleChange} placeholder='Enter personal email address'/>
        </div>
        <div className="mb-3">
            <label className="form-label login-label">Corp Id</label>
            <input type="email" id="CorpMail" className="form-control" onChange={handleChange} placeholder='Enter corp email address'/>
        </div>
        
        <center>
            <button type="submit" className="login-btn mt-3" onClick={handleSubmitClick}>Verify</button>
        <br/>
        Already Verified?<a href="/" className="login-link link-info mt-2"> Login</a></center>
        </div>
    </form>
    </div>

  )
}

export default Verifyuser