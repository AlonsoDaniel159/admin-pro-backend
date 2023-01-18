import express from "express";
import { dbConnection } from "./database/config.js";
import dotenv from "dotenv";
import cors from 'cors';

//Variables de entorno
dotenv.config();

//Crear el servidor express
const app = express();

//Configuración de cors
app.use( cors() );

//Base de datos
dbConnection();

//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});