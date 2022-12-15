import { useState, useEffect , React }from 'react'
import axios from 'axios'
import './Login.css'
import cglogo from '../../images/cg-logo.png'
import view from "../../images/view.png"
import hide from "../../images/hide.png"
import Config from "../Settings/Config"


function Login() {
  const[SelectedRole, setSelectedRole] =useState("");
  const [Roles, setRoles] = useState([]);
    const[Eye, setEye] = useState(false);
    const togglePassword = () => {
        setEye(!Eye);
    };

    const [state, setState] = useState({
        CorpMail: "",
        Password: ""
        
      });

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


      const handleSubmitClick = (e) => {
        e.preventDefault();
       sessionStorage.removeItem('token');
        const payload = {
          CorpMail: state.CorpMail,
          Password: state.Password, 
          RoleId: SelectedRole

        };

        axios.post(Config.api + "UserLogin", payload)
        .then((res) => {sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('role',res.data.role)
        sessionStorage.setItem('email',payload.CorpMail)
        sessionStorage.setItem('Id',res.data.userId)
              window.location.reload()
              window.location.href = "/dashboard";
            
            })
    
        .catch((err)=> {console.log(err)
        alert('Invalid credentials!')
        setState({ CorpMail: '', Password: '' })
           })  
      };

  return (
    <div className="card login-card mx-auto">
    <form className='login-form'>
        <div className='login-body'>
        <h3 className='login-head'>
        <img src={cglogo} className="cg-logo mb-4" alt="Cg-Logo"/>iTransform Learning</h3>

        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01"><i class="fa fa-user" aria-hidden="true"></i></label>
          <select class="form-select" id="inputGroupSelect01" onChange = {handleRoleSelect}>
            
            <option selected>Login as...</option>
            {Roles.map(r=>(
            <option id="RoleId"  key={r.roleId} value={r.roleId}>{r.roleName}</option>))}
          
          </select>
        </div>


        <div className="mb-3">
            <label className="form-label login-label">Corp Id</label>
             <input type="email" className="form-control" id="CorpMail" value={state.CorpMail}
              onChange={handleChange}placeholder='Enter corp email address'/>
        </div>
        <div className="mb-3">
            <label className="form-label login-label">Password</label>
            <div className='d-flex flex-row'>
            <input type={Eye ? "text" : "password"} className="form-control" id="Password" value={state.Password} onChange={handleChange}placeholder="Enter password" />
            <img className="eye" src={Eye ? view : hide} alt="hide" onClick={togglePassword}></img>
            </div>
        </div>
        <center>
            <button type="submit" className="login-btn mt-3" onClick={handleSubmitClick}>Login</button>
        <br/>
        <a href="/verify" className="login-link link-info">New User?</a></center>
        </div>
    </form>
    </div>
  )
}

export default Login