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

    fetch('http://localhost:8500/auth/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valueuser),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (!res.isError) {
          if (
            res.message &&
            res.message === 'Registration successful! You can now log in.'
          ) {
            // Display a success notification using SweetAlert2
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful!',
              text: 'You can now log in.',
            }).then(() => {
              // Redirect to the login page
              navigate('/login');
            });
          } else {
            // Display an error notification using SweetAlert2
            Swal.fire({
              icon: 'info',
              title: 'User Already Exists',
              text: 'Please use a different username.',
            });
          }
        } else {
          // Display an error notification using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong',
            text: 'Please try again.',
          });
        }
      })
      .catch((err) => {
        // Display an error notification using SweetAlert2 for network or unexpected errors
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong',
          text: 'Please try again.',
        });
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
