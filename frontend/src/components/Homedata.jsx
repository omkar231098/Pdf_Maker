import React from 'react'
import style from "./homedata.module.css";
import Hero_1 from "../assets/images/homebanner.png";
import { useNavigate } from "react-router-dom";
const Homedata = () => {
  const navigate = useNavigate();
  return (
<>


<div className={style.mainbox}>

<div className={style.mainbox1}>
<h1 className={style.mainbox_title}>
Transform Your Ideas into Polished Documents with SnapPDF
            </h1>
            <p className={style.mainbox_subtitle}> Effortlessly Convert Your Input into Professional PDFs</p>
            <button  onClick={() => {
            navigate("/form");
          }} className={style.pdfbutton}>Create PDF</button>
</div>

<div className={style.mainbox2}>
<img src={Hero_1} alt="logo" className={style.hero_1} />
</div>




</div>














</>
  )
}

export default Homedata