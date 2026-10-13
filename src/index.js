// src/index.js
const config = require('./configuracion');
const { crearServicioReservas } = require('./servicios/reservas');
const { crearApp } = require('./app');

// Asegúrate de que esta ruta apunte a donde tengas tus datos iniciales (o un arreglo vacío [])
const datosIniciales = require('../datos/reservas'); 

const middlewareSolicitudes = require('./middleware/solicitudes');
const middlewareValidacion = require('./middleware/reservas');

const servicioReservas = crearServicioReservas(datosIniciales);
const app = crearApp(config, servicioReservas, middlewareSolicitudes, middlewareValidacion);

app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port} (${config.nodeEnv})`);
});