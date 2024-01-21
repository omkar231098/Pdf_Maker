import React from 'react';
import style from "./homedata.module.css";
import Hero_1 from "../assets/images/homebanner.png";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Homedata = () => {
  const navigate = useNavigate();

  // Check if the 'authtoken' is present in the local storage
  

  return (
    <>
      <div className={style.mainbox}>
        <div className={style.mainbox1}>
          <h1 className={style.mainbox_title}>
            Transform Your Ideas into Polished Documents with SnapPDF
          </h1>
          <p className={style.mainbox_subtitle}> Effortlessly Convert Your Input into Professional PDFs</p>
          <button
            onClick={() => {
              // Check if the 'authtoken' is present again before navigating to the form
              const authToken = localStorage.getItem('authtoken');
              if (authToken) {
                navigate("/form");
              } else {
                // Token is not present, show a SweetAlert and redirect the user to the login page
                Swal.fire({
                  icon: 'warning',
                  title: 'Login Required',
                  text: 'Please log in to create a PDF.',
                }).then(() => {
                  navigate("/login");
                });
              }
            }}
            className={style.pdfbutton}
          >
            Create PDF
          </button>
        </div>

        <div className={style.mainbox2}>
          <img src={Hero_1} alt="logo" className={style.hero_1} />
        </div>
      </div>
    </>
  );
}

export default Homedata;
