import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import {useAuthentication} from "../AuthenticationProvider"
import Button from '@mui/material/Button';


const Login = () => {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
	const { onLogin } = useAuthentication();


  function submitHandler(e){
        e.preventDefault();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password })
        };
        fetch("/users/login", requestOptions)
            .then(response => {
              if (response.status !== 200) {
                throw new Error(response.statusText);
              }
              return response.json();
             })
            .then(data=> {
                  onLogin({ email: data.email, name: data.name })
                  navigate('/', { replace: true });
            })
            .catch(error => console.log(error));

  }


  return (
    <>
    <form className="form-control">
    <h1 style={{textAlign: 'center'}}>Login</h1>  
    <label>
          Email:
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </label>
    <label>
          Password:
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </label>
        <Button variant="contained" onClick={submitHandler}>Log in</Button>
    </form>

    </>

    )
}

export default Login