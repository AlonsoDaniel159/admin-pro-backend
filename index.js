import express from "express";
import { dbConnection } from "./database/config.js";
import dotenv from "dotenv";
import cors from 'cors';
import { router } from "./routes/usuarios.js";

//Variables de entorno
dotenv.config();

//Crear el servidor express
const app = express();

//Configuración de cors
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

//Base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', router)


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});