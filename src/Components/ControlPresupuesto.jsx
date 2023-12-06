import { useState, useEffect } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Pepinillo from "../img/Pepinillo.png";
import { validacionAlert } from "../helpers/index.js";

//Funcion que toma las propiedades de gastos y presupuestos que son heredados
//de las funciones Gasto y NuevoPresupuesto
const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
}) => {
  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    const totalDisponible = presupuesto - totalGastado;

    //Calculo del porcentaje de la grafica
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 2000);
    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos]);

  //Estate que nos ayuda a renderizar el componente de la grafica que se tiene dentro de la pagina
  const [porcentaje, setPorcentaje] = useState(0);

  //Este State se encarga de iniciar el valor del presupuesto en cero
  const [disponible, setDisponible] = useState(0);

  //Este State se encarga de mostrarnos en pantalla la cantidad que se ha gastado dentro de
  //la aplicacion y tambien se inicializa en 0
  const [gastado, setGastado] = useState(0);

  //Esta funcion nos ayuda a formatear la cantidad de dinero dentro de la aplicacion
  //y nos la da en formato de dolares
  const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    //Este es el componente de la grafica mostrada en la aplicacion
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbarWithChildren
          value={porcentaje}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "red" : "#3e98c7",
          })}
        >
          <img
            style={{ width: 100, marginTop: 140, marginRight: 80 }}
            src={Pepinillo}
            alt="Perrillo"
          />
          <div
            style={{
              fontSize: 25,
              marginTop: 10,
              marginRight: 90,
              color: "#3b82f6",
            }}
          >
            <strong>
              {porcentaje}% {""}
            </strong>
            Gastos
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={validacionAlert}>
          Resetear Aplicacion
        </button>
        <p>
          <span>Presupuesto: </span>
          {formatearPresupuesto(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span>
          {formatearPresupuesto(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearPresupuesto(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
