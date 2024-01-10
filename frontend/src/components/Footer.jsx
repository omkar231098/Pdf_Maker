import React, { useState, useEffect } from 'react';
import style from "./footer.module.css";
import Logo from "../assets/images/quicklogo.png";
import YoutubeLogo from "../assets/images/youtube.png";
import GithubLogo from "../assets/images/github.png";
import LinkedinLogo from "../assets/images/linkedin.png";
const Footer = () => {

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    
  useEffect(() => {
    // Update the current year when the component mounts
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <div className={style.footerbox}>
      <div className={style.footerbox1}>
      <img
          src={Logo}
          alt="logo"
          className={style.footerboxlogo}
         
        />
        <p className={style.footerboxlogo_copytext}>Copyright Reserved {currentYear}</p>
        <div  className={style.footericons}>
        <img
          src={ YoutubeLogo}
          alt="logo"
          className={style.footersocialicon}
         
        />

        <img
          src={ GithubLogo}
          alt="logo"
          className={style.footersocialicon}
         
        />

        <img
          src={ LinkedinLogo}
          alt="logo"
          className={style.footersocialicon}
         
        />
        </div>
      </div>

      <div className={style.footerbox2}>


      <div className={style.footerboxinfo}>
      <h3>Quick Links</h3>
       <label>Home</label>
       <label>About Us</label>
       <label>Services</label>
       <label>Blog</label>
      </div>

      <div className={style.footerboxinfo}>
      <h3>I want to:</h3>
       <label>Docter</label>
       <label>Request an Appoinment</label>
       <label>Find a Location</label>
       <label>Get a Opnion</label>
      </div>

      <div className={style.footerboxinfo}>
      <h3>Support</h3>
       <label>Donate</label>
       <label>Contact Us</label>
       <label>Policy</label>
       <label>Company</label>
      </div>

      





      </div>
    </div>
  )
}

export default Footer