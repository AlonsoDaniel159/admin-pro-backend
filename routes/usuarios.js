import { Router } from "express";
import { body } from "express-validator";
import { actualizarUsuario, crearUsuario, getUsuarios } from "../controllers/usuarios-controller.js";
import { validarCorreo } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/valida-campos.js";


export const router = Router();

// Ruta: /api/usuarios

//TRAER USUARIOS
router.get('/', getUsuarios);


//CREAR USUARIO
router.post('/', [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
    body('email', 'El email es obligatorio').isEmail(),
    validarCampos
],crearUsuario);


//ACTUALIZAR USUARIO
router.put('/:id', [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('email', 'El email es obligatorio').isEmail(),
    // body('rol', 'El rol es obligatorio').isEmail(),
    validarCampos
], actualizarUsuario)
