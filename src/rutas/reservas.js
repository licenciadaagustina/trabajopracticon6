// src/rutas/reservas.js
const express = require("express");

function crearRouterReservas(controladorReservas, middlewareValidacion) {
  const router = express.Router();

  // IMPORTANTE: /nueva debe registrarse antes de /:id
  router.get("/nueva", controladorReservas.mostrarFormulario);
  router.get("/:id", controladorReservas.obtenerPorId);

  router.get("/", controladorReservas.listarReservas);

  // Ruta POST aplicando el middleware de validación del TP 05
  router.post("/", middlewareValidacion, controladorReservas.crearReserva);

  return router;
}

module.exports = { crearRouterReservas };
