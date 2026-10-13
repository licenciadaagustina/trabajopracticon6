// src/middleware/solicitudes.js
const crypto = require("crypto");

function middlewareSolicitudes(req, res, next) {
  // Generar un identificador único para la solicitud
  req.idSolicitud = crypto.randomUUID();
  res.setHeader("X-Request-ID", req.idSolicitud);

  const inicio = Date.now();

  // Medir duración hasta que finaliza la respuesta
  res.on("finish", () => {
    const duracion = Date.now() - inicio;
    // Opcional: puedes dejar un console.log si lo usabas en el TP 05
    // console.log(`[${req.method}] ${req.originalUrl} - Status: ${res.statusCode} - Duración: ${duracion}ms - ID: ${req.idSolicitud}`);
  });

  next();
}

module.exports = middlewareSolicitudes;
