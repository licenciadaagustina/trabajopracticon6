// src/servicios/reservas.js

function crearServicioReservas(datosIniciales) {
  // El único arreglo de reservas vive aquí dentro, protegido y encapsulado
  let reservas = [...datosIniciales];

  return {
    listar() {
      return reservas;
    },

    buscarPorId(id) {
      const idNum = Number(id);
      return reservas.find((r) => r.id === idNum);
    },

    contar() {
      return reservas.length;
    },

    obtenerUltimoId() {
      if (reservas.length === 0) return 0;
      return Math.max(...reservas.map((r) => r.id));
    },

    crear(nuevaReservaData) {
      const nuevoId = this.obtenerUltimoId() + 1;
      const nuevaReserva = {
        id: nuevoId,
        ...nuevaReservaData,
      };
      reservas.push(nuevaReserva);
      return nuevaReserva;
    },
  };
}

module.exports = { crearServicioReservas };
