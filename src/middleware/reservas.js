// src/middleware/reservas.js

function validarReserva(req, res, next) {
  const { estudiante, email, sala, fecha, turno, personas } = req.body;

  // Reglas de validación básicas del TP 05
  const salasPermitidas = ["Sala A", "Sala B", "Sala C", "Sala D"]; // Ajusta según tus salas
  const turnosPermitidos = ["Mañana", "Tarde", "Noche"]; // Ajusta según tus turnos

  const personasNum = Number(personas);
  const emailValido = typeof email === "string" && email.includes("@");
  const personasValidas =
    Number.isInteger(personasNum) && personasNum >= 1 && personasNum <= 6;
  const salaValida = salasPermitidas.includes(sala);
  const turnoValido = turnosPermitidos.includes(turno);
  const estudianteValido =
    typeof estudiante === "string" && estudiante.trim().length > 0;
  const fechaValida = typeof fecha === "string" && fecha.trim().length > 0;

  if (
    !estudianteValido ||
    !emailValido ||
    !salaValida ||
    !fechaValida ||
    !turnoValido ||
    !personasValidas
  ) {
    // Si no pasa la validación, responde con 400 y corta la ejecución (no llama a next)
    return res.status(400).render("reservas-nueva", {
      error: "Datos de reserva inválidos. Por favor verifique los campos.",
      valoresPrevios: req.body,
    });
  }

  // Si es válido, guardamos los datos limpios y tipados
  req.reservaValidada = {
    estudiante: estudiante.trim(),
    email: email.trim(),
    sala,
    fecha,
    turno,
    personas: personasNum,
  };

  next();
}

module.exports = validarReserva;
