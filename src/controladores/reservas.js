// src/controladores/reservas.js

function crearControladorReservas(servicioReservas) {
  return {
    listarInicio(req, res) {
      res.render("inicio", { title: "Inicio - Reservas" }); // Ajusta el nombre de tu vista si difiere
    },

    obtenerEstado(req, res) {
      const cantidad = servicioReservas.contar();
      const ultimoId = servicioReservas.obtenerUltimoId();
      res.json({
        estado: "OK",
        totalReservas: cantidad,
        idUltimaReserva: ultimoId,
        prefijoId: "BIB-",
      });
    },

    listarReservas(req, res) {
      const reservas = servicioReservas.listar();
      res.render("reservas", { reservas }); // Ajusta el nombre de tu vista de listado
    },

    mostrarFormulario(req, res) {
      res.render("reservas-nueva"); // Ajusta según el nombre de tu vista de formulario
    },

    obtenerPorId(req, res) {
      const reserva = servicioReservas.buscarPorId(req.params.id);
      if (!reserva) {
        return res.status(404).render("no-encontrado"); // Ajusta tu vista 404
      }
      res.render("reserva-detalle", { reserva }); // Ajusta tu vista de detalle
    },

    crearReserva(req, res) {
      // Suponiendo que el middleware de validación ya validó y dejó los datos limpios en req.reservaValidada
      const datosNuevos = req.reservaValidada || req.body;
      servicioReservas.crear(datosNuevos);
      res.redirect("/reservas"); // Redirección 302 estándar tras éxito
    },
  };
}

module.exports = { crearControladorReservas };
