import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebaseConfig/firebase";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Edit = () => {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [hour, setHour] = useState(0);
  const [color, setColor] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const car = doc(db, "cars", id);
    const data = {
      brand: brand,
      name: name,
      plate: plate,
      hour: hour,
      color: color,
    };

    await updateDoc(car, data);
    Swal.fire({
      icon: "success",
      title: "Vehiculo actualizado!",
      text: "Vehiculo  actualizado con exito!",
    });
    navigate("/show");
  };
  const getCarById = async () => {
    const car = await getDoc(doc(db, "cars", id));
    if (car.exists()) {
      console.log(car.data());
      setBrand(car.data().brand);
      setName(car.data().name);
      setPlate(car.data().plate);
      setHour(car.data().hour);
      setColor(car.data().color);
    } else {
      console.log("No existe");
    }
  };

  useEffect(() => {
    getCarById();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-primary bg-dark mt-2 py-2 border border-primary border border-1">
              Editar vehículo
            </h1>
            <form onSubmit={update}>
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
                Guardar cambios
              </button>

              <Link to="/show" className="btn btn-light mx-2">
                <i className="fa-solid fa-circle-left"></i>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
