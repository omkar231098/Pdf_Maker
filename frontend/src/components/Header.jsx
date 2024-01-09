import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from 'js-cookie';
import Logo from "../assets/images/quicklogo.png";
import { useNavigate } from "react-router-dom";
import style from "./header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies.get("authToken"));
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);

      // Assuming the API endpoint for user details is the same for both roles
      const apiEndpoint = `http://localhost:8500/user/${decodedToken.id}`;

      axios.get(apiEndpoint)
        .then((response) => {
          setUserName(response.data.data.name.split(" ")[0]);
        })
        .catch((error) => {
          console.error("Error fetching user name: ", error);
        });
    } else {
      setUser(null);
      setUserName("");
    }
  }, [token]);

  const handleLogout = () => {
    Cookies.remove("authToken");
    setToken(null);
  };

  return (
    <div className={style.navbar}>
      <div className={style.logobox}>
        <img
          src={Logo}
          alt="logo"
          className={style.logo_navbar}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div className={style.ButtonBox}>
        {user ? (
          <div className={style.userProfile}>
            <span className={style.userName}>Hello, {userName}</span>
            <button className={style.logoutbtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <div>
              <button
                className={style.loginbtn}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
            <div>
              <button
                className={style.signinbtn}
                onClick={() => {
                  navigate("/register");
                }}
              >
                SignUp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
