import { Router } from "express";
import { retornaImagen, subirArchivo } from "../controllers/uploads-controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import fileUpload from "express-fileupload";

export const router = Router();

router.use( fileUpload() );

// Ruta: /api/uploads/:tipo/:id'
router.put('/:tipo/:id', [
    validarJWT

], subirArchivo);


router.get('/:tipo/:foto', [
    // validarJWT

], retornaImagen);



