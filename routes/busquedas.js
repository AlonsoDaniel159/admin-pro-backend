import { Router } from "express";
import { getColeccion, getTodo } from "../controllers/busqueda-controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

export const router = Router();

// Ruta: /api/todo/:busqueda


router.get('/:busqueda', [
    validarJWT
], getTodo);

router.get('/coleccion/:tabla/:busqueda', [
    validarJWT
], getColeccion);


