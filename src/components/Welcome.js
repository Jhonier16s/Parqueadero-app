import React from "react";
import { Link } from "react-router-dom";
import Parking from "../assets/parking.jpg";
import pk from "../assets/pk.png";
const Welcome = () => {
  return (
    <>
      <div className="container ">
     
      <div className ="">
        <img width="460px" height="100px" src={Parking} alt="parking" className="img-fluid mt-4" />
      </div>
      <div className="container align-middle  ">
          <h4 className="text-light mt-2">Bienvenido/a</h4>
        <Link to="/show" className="btn btn-primary text-ligth "> 
          Parqueadero APP
        </Link>
      </div>
      <div className ="">
        <img width="460px" height="100px" src={pk} alt="parking2" className="img-fluid mt-4" />
      </div>
      </div>
    </>
  );
};

export default Welcome;
