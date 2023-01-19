import { Router } from "express";
import { body } from "express-validator";
import { login } from "../controllers/auth-controller.js";
import { validarCampos } from "../middlewares/valida-campos.js";


export const router = Router();

// Ruta: /api/auth


//CREAR USUARIO
router.post('/', [
    body('email', 'El correo es obligatorio').isEmail(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

