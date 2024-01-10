import React, { useState } from 'react';
import axios from 'axios';

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
  
        const response = await axios.post('http://localhost:8500/auth/login', payload,{ withCredentials: true });
        console.log(response.authtoken);
        setIsLoading(false);
  
        
        
        if (response.data.alertMessage) {
          Swal.fire({
            icon: 'success',
            title: response.data.alertMessage,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate('/form');
          });
        } else {
          navigate('/');
        }
      } catch (error) {
        setIsLoading(false);
  
        if (error.response && error.response.data && error.response.data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: error.response.data.message,
          });
        } else {
          console.error('Error during login:', error);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'An error occurred during login. Check the console for details.',
          });
        }
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
