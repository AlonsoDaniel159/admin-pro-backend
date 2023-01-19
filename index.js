import express from "express";
import { dbConnection } from "./database/config.js";
import dotenv from "dotenv";
import cors from 'cors';
import { router as usuarioRouter } from "./routes/usuarios.js";
import { router as authRouter } from "./routes/auth.js";

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
app.use('/api/usuarios', usuarioRouter)
app.use('/api/login', authRouter)


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});