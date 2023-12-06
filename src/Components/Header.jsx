import React from "react";
import NuevoPresupuesto from "./NuevoPresupuesto.jsx";
import ControlPresupuesto from "./ControlPresupuesto.jsx";
import IconGrafica from "../img/img-header.svg";

const Header = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setisValidPresupuesto,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      <div className="imagen-header">
        <img src={IconGrafica} alt="imagen del Header" />
      </div>
      {isValidPresupuesto ? (
        <ControlPresupuesto
          gastos={gastos}
          setGastos={setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
        ></ControlPresupuesto>
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setisValidPresupuesto={setisValidPresupuesto}
        ></NuevoPresupuesto>
      )}
    </header>
  );
};

export default Header;
