import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/images/quicklogo.png';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import style from './register.module.css';

function Register() {
  const navigate = useNavigate();
  const [valueuser, setValueUser] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(valueuser);

    fetch('https://tiny-cyan-slug-ring.cyclic.app/auth/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valueuser),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("my response",res);

        if(res.message==="User already exists. Please use a different username."){
          Swal.fire({
                  icon: 'info',
                  title: 'User already exists.',
                  text: 'Please use a different username.',
                })
        }
        else if(res.message==="Registration successful! You can now log in."){
          Swal.fire({
            icon: 'success',
            title: 'Registration successful!',
            text: 'You can now log in.',
          }).then(() => {
            navigate('/login');
          });
        }else if(res.message==="Invalid username format, username is at least 3 characters long"){
          Swal.fire({
            icon: 'info',
            title: 'Invalid username format',
            text: 'username is at least 3 characters long',
          })
        }else if(res.message==="Invalid password format, Password is at least 6 characters long"){
          Swal.fire({
            icon: 'info',
            title: 'Invalid password format',
            text: 'Password is at least 6 characters long',
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: 'Internal server error',
          })
        }
       
      })
      .catch((err) => {
        
        console.log(err);
      
      });
  };

  const onChangeEventUser = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValueUser((prv) => ({
      ...prv,
      [name]: value,
    }));
  };

  return (
    <div className={style.register_container}>
      <form
        className={style.register_form}
        onSubmit={(event) => handleSubmit(event)}
      >
        <img
          src={Logo}
          alt="Logo"
          className={style.register_logo}
          onClick={() => {
            navigate('/');
          }}
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          className={style.register_input}
          onChange={onChangeEventUser}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className={style.register_input}
          onChange={onChangeEventUser}
          required
        />
        <br></br>
        <button type="submit" className={style.register_btn}>
          Register
        </button>
        <span className={style.register_span}>
          Already have an account ?<Link to="/login" className={style.login_link}>
            {' '}
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
