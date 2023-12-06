import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setEditarGasto,
  eliminarGasto,
  gastosFiltrados,
  filterSearch,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filterSearch ? (
        <>
          <h2>{gastosFiltrados.length ? "Gastos" : "Aun no hay gastos en esta categoria"}</h2>
          {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filterSearch={filterSearch}
            ></Gasto>
          ))}
        </>
      ) : (
        <>
          <h2>{gastos.length ? "Gastos" : "Aun no hay gastos"}</h2>
          {gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filterSearch={filterSearch}
            ></Gasto>
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
