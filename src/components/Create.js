import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import { db } from "../firebaseConfig/firebase";
import tarifa from "../assets/tarifa.png";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Create = () => {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [hour, setHour] = useState(0);
  const [color, setColor] = useState("");

  const navigate = useNavigate();

  const carsCollection = collection(db, "cars");

  const store = async (e) => {
    e.preventDefault();
    await addDoc(carsCollection, {
      brand: brand,
      name: name,
      plate: plate,
      hour: hour,
      color: color,
    });
    Swal.fire({
      icon: 'success',
      title: 'Vehiculo agregado!',
      text: 'Vehiculo agregado con exito!',
    })
    navigate("/show");
  };

  const handlerInfo = async (e) => {
    Swal.fire({
      title: "<strong>Tarifas</strong>",
      icon: "info",
      html:
        "1 Hora : 2000 COP </b><br></br> " +
        "2 Horas : 4000 COP  </b><br></br>" +
        "3 Horas : 6000 COP  </b><br></br>" +
        "4 Horas : 8000 COP  </b><br></br>",
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
      confirmButtonAriaLabel: "Thumbs up, great!",
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-primary bg-dark mt-2 py-2 border border-primary border border-1">
              Añadir Nuevo vehículo
            </h1>
            <form onSubmit={store}>
              <div className="mb-3">
                <label className="form-label text-light fs-4" htmlFor="brand">
                  Marca
                </label>
                <input
                  required
                  type="text"
                  className="form-control text-center"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light fs-4" htmlFor="name">
                  Nombre
                </label>
                <input
                  required
                  type="text"
                  className="form-control text-center"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light fs-4" htmlFor="plate">
                  Placa
                </label>
                <input
                  required
                  
                  type="text"
                  className="form-control text-center"
                  id="plate"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value.toUpperCase())}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light fs-4" htmlFor="hour">
                  Hora de ingreso (24 horas)
                </label>
                <input
                  required
                  type="number"
                  max={24}
                  min={0}
                  className="form-control text-center"
                  id="name"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-light fs-4" htmlFor="color">
                  Color
                </label>
                <input
                  required
                  type="text"
                  className="form-control text-center"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Añadir
              </button>
              <button
                type="button"
                className="btn btn-light mx-2"
                onClick={() => {
                  handlerInfo();
                }}
              >
                <i className="fa-solid fa-circle-info "></i>
              </button>
              <Link to="/show" className="btn btn-light">
                <i className="fa-solid fa-circle-left"></i>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
