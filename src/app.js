// src/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');

function crearApp(config, servicioReservas, middlewareSolicitudes, middlewareValidacion) {
    const app = express();

    // 1. Configuración de vistas (EJS)
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));

    // 2. Pipeline de middlewares
    app.use(morgan(config.morganFormat));
    app.use(middlewareSolicitudes);
    
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // 3. Importar controladores y rutas
    const { crearControladorReservas } = require('./controladores/reservas');
    const { crearRouterReservas } = require('./rutas/reservas');

    const controlador = crearControladorReservas(servicioReservas);
    const routerReservas = crearRouterReservas(controlador, middlewareValidacion);

    // 4. Rutas principales
    app.get('/', controlador.listarInicio);
    app.get('/estado', controlador.obtenerEstado);
    app.use('/reservas', routerReservas);

    // 5. Manejador 404
    app.use((req, res) => {
        res.status(404).render('no-encontrado');
    });

    return app;
}

module.exports = { crearApp };