import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);



const Show = () => {
  //hooks

  const [cars, setCars] = useState([]);
  const [price, setPrice] = useState(0);
 
  //database

  const carsCollection = collection(db, "cars");

  //listar

  const getCars = async () => {
    const data = await getDocs(carsCollection);
    /* console.log(data) */
    setCars(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    /* console.log(cars); */
  };

  //eliminar

  const deleteCar = async (id) => {
    const carsDoc = doc(db, "cars", id);
    await deleteDoc(carsDoc);
    getCars();
  };

  const confirmDelete = async (id, hour) => {
    let date = new Date();
    let hourNow = date.getHours();
    let hourCar = hourNow - hour;
    let positiveHourCar = Math.abs(hourCar) 
    
    let tarifa = 1000;

    if (positiveHourCar === 1) {
      tarifa = 2000;
    } else if (positiveHourCar === 2) {
      tarifa = 4000;
    } else if (positiveHourCar === 3) {
      tarifa = 6000;
    } else if (positiveHourCar === 4) {
      tarifa = 8000;
    } else if (positiveHourCar === 5 || positiveHourCar === 6) {
      tarifa = 10000;
    } else if (positiveHourCar === 7 || positiveHourCar === 8) {
      tarifa = 12000;
    } else if (positiveHourCar === 9 || positiveHourCar === 10) {
      tarifa = 14000;
    } else if (positiveHourCar === 11 || positiveHourCar === 12) {
      tarifa = 16000;
    } else if (positiveHourCar === 13 || positiveHourCar === 14) {
      tarifa = 18000;
    }else if (positiveHourCar >= 15) {
      tarifa = 20000;
    }
  
    
   /*  const handlePrice =()=> {
      let precioIngresado = document.getElementById("monto").value;
      console.log(precioIngresado);
       precioIngresado - tarifa
    } */
 
    await Swal.fire({
      title: `Retirar Vehiculo <br></br> El vehiculo estuvo ${positiveHourCar} horas en el parqueadero TOTAL A PAGAR : ${tarifa} pesos`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Retirar!",
      validationMessage: "Por favor ingrese una hora valida",
      html: `<input type="number" id="monto" class="swal2-input" placeholder="Ingrese monto pagado" required>
       
      `,
    }).then((result) => {
      let precioIngresado = document.getElementById("monto").value;
      console.log(precioIngresado);
      let devuelta = precioIngresado-tarifa;
      console.log(tarifa);
      if (result.isConfirmed) {
        deleteCar(id);
        Swal.fire(
          "Retirado!",
          `El vehiculo ha sido retirado. Gracias por su visita! Devuelta: ${devuelta} pesos`,
          "success"
        );
      }
    });
  };

  //useeffect
  useEffect(() => {
    getCars();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid-gap-2">
              <Link to="/create" className="btn btn-primary mt-4 mb-4">
                Añadir Nuevo vehículo
              </Link>
            </div>
            <div className="d-grid-gap-2 mb-2">
              <h2 className="text-light mb-4">Panel de Administración</h2>
            </div>
            <table className="table table-dark table-hover mt-2">
              <thead>
                <tr key="">
                  <th>Marca</th>
                  <th>Nombre</th>
                  <th>Placa</th>
                  <th>Hora de ingreso</th>
                  <th>Color</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {cars.map((car) => (
                  <tr key={car.id}>
                    <td>{car.brand}</td>
                    <td>{car.name}</td>
                    <td>{car.plate}</td>
                    <td>{car.hour}:00</td>
                    <td>{car.color}</td>

                    <td>
                      <Link to={`/edit/${car.id}`} className="btn btn-light">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button
                        onClick={() => {
                          confirmDelete(car.id, car.hour);
                        }}
                        className="btn btn-danger mx-2"
                      >
                        <i className="fa-solid fa-delete-left"></i>
                        
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
