export const generarId = () => {
  const random = Math.random().toString(36).substring(2);
  const fecha = Date.now().toString(36);
  return random + fecha;
};

export const formatearFecha = (fecha = new Date()) => {
  try {
    if (!(fecha instanceof Date)) {
      throw new Error("Se espera un objeto de tipo Date.");
    }

    const opciones = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };

    const fechaDeHoy = fecha.toLocaleDateString("es-ES", opciones);

    return fechaDeHoy;
  } catch (error) {
    console.error("Error al formatear la fecha:", error.message);
    // Puedes lanzar el error nuevamente o devolver un valor predeterminado
    return "Fecha inválida";
  }
};

export const validacionAlert = () => {
  swal({
    title: "Estas seguro?",
    text: "Los datos que borraras, no se podran recuperar!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((alert) => {
    if (alert) {
      swal("Los datos de han borrado correctamente!", {
        icon: "success",
      });
    } else {
      swal("Tus datos aun estan vivos!");
    }
  });
};

