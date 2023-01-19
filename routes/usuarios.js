import { Router } from "express";
import { body, param } from "express-validator";
import { actualizarUsuario, borrarUsuario, crearUsuario, getUsuarios } from "../controllers/usuarios-controller.js";
import { validarCampos } from "../middlewares/valida-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


export const router = Router();

// Ruta: /api/usuarios

//TRAER USUARIOS
router.get('/', [
    validarJWT
], getUsuarios);


//CREAR USUARIO
router.post('/', [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
    body('email', 'El email es obligatorio').isEmail(),
    validarCampos
],crearUsuario);


//ACTUALIZAR USUARIO
router.put('/:id', [
    validarJWT,
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('email', 'El email es obligatorio').isEmail(),
    body('rol', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuario)


//ELIMINAR USUARIO
router.delete('/:id', [
    validarJWT,
    param('id').not().isEmpty(),
    param('id').isMongoId(),
    validarCampos
], borrarUsuario)
