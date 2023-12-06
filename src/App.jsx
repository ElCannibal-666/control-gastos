import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Modal from "./Components/Modal";
import { generarId } from "./helpers/index.js";
import ListadoGastos from "./Components/ListadoGastos.jsx";
import nuevoGasto from "./img/nuevo-gasto.svg";
import Filtros from "./Components/Filtros.jsx";

function App() {
  //Estado de la captura del presupuesto
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto") ?? 0)
  );

  //Estado de la validacion sobre el presupuesto
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false);

  //Estado del modal para la carga de valores
  const [modal, setModal] = useState(false);

  //Estado que utilizamos para poder animar el modal de los datos
  const [animarModal, setAnimarModal] = useState(false);

  //Estado para poder obtener y poder guardar los gastos desde LocalStorage
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );

  //Estado de la edicion de los gastos
  const [editarGasto, setEditarGasto] = useState({});

  //Estado del filtro de los gastos
  const [filterSearch, setFilterSearch] = useState("");

  //Estado de los gastos filtrados
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  //Creando un UseEffect para la edicion del objeto
  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setAnimarModal(true);
      setTimeout(() => {
        setModal(true);
      }, 1500);
    }
  }, [editarGasto]);

  //Guardar el presupuesto en el LocalStorage
  useEffect(() => {
    Number(localStorage.setItem("presupuesto", presupuesto ?? 0));
  }, [presupuesto]);

  //Quitar la pantalla de presupuesto para poder trabajar con el presupuesto almacenado en LocalStorage
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto") ?? 0);
    if (presupuestoLS > 0) {
      setisValidPresupuesto(true);
    }
  }, []);

  //Guardar los cambios de los gastos en LocalStorage
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if (filterSearch) {
      //Filtrado de los gastos por categoria
      const filtradoDeGastos = gastos.filter(
        (gasto) => gasto.categoria === filterSearch
      );
      setGastosFiltrados(filtradoDeGastos);
    }
  }, [filterSearch]);

  //Creando una funcion para la animacion del componente Modal
  const handleNuevoGasto = () => {
    setAnimarModal(true);
    setEditarGasto({});
    setTimeout(() => {
      setModal(true);
    }, 1500);
  };

  //Creando una funcion para el llenado del objeto gasto
  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //Actualizar
      setEditarGasto({});
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
    } else {
      //Nuevo gasto
      setGastos([...gastos, gasto]);
      gasto.id = generarId();
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  return (
    //Componente que renderiza el cuerpo de la aplicacion
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
      ></Header>

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filterSearch={filterSearch}
              setFilterSearch={setFilterSearch}
            ></Filtros>
            <ListadoGastos
              gastos={gastos}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filterSearch={filterSearch}
            ></ListadoGastos>
          </main>
          <div className="nuevo-gasto">
            <img
              src={nuevoGasto}
              alt="Icono de nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          editarGasto={editarGasto}
          setEditarGasto={setEditarGasto}
        ></Modal>
      )}
    </div>
  );
}

export default App;
