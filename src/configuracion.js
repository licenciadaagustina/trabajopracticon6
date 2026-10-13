// src/configuracion.js

module.exports = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    morganFormat: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
};