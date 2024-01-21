import React, { useState } from 'react';
// import axios from 'axios';

import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/quicklogo.png';
import style from './login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const loginAction = async (e) => {
      e.preventDefault();
      setIsLoading(true);
    
      try {
        const payload = {
          username: username,
          password: password,
        };
    
        const response = await fetch('https://tiny-cyan-slug-ring.cyclic.app/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // credentials: 'include', // Include credentials for CORS
          body: JSON.stringify(payload),
        });
    
        const data = await response.json();
        localStorage.setItem('authtoken', data.accessToken)
    console.log("my response",data)
        setIsLoading(false);
        
       
        if(data.message==="User not found"){
          Swal.fire({
            icon: 'info',
            title: 'User not found',
            text: 'Please Register',
            timer: 1500
          })
        }else if(data.message==="Incorrect Password"){
          Swal.fire({
            icon: 'info',
            title: 'Incorrect Password',
            text: 'Please check your password',
            timer: 1500
          })
        }else if(data.message==="Successfully logged in"){
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            timer: 1500
          }).then(() => {
                navigate('/form');
              });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Please check your login details',
          })
        }

      
      } catch (error) {
        setIsLoading(false);
    
      console.log(error)
      }
    };
    

  return (
    <div className={style.register_container}>
      <div className={style.register_form}>
        <div className="card">
          <div className="card-body">
            <img
              src={Logo}
              alt="Logo"
              className={style.register_logo}
              onClick={() => navigate('/')}
            />
            <form onSubmit={loginAction}>
              <div className="mb-3">
                <input
                  type="text"
                  className={style.register_input}
                  id="username"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className={style.register_input}
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={style.btnbox_1}>
                <button
                  disabled={isLoading}
                  type="submit"
                  className={style.register_btn}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <p className={style.register_span}>
                  Don't have an account?{' '}
                  <Link className={style.login_link} to="/register">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
