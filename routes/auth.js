import { Router } from "express";
import { body } from "express-validator";
import { googleSignIn, login } from "../controllers/auth-controller.js";
import { validarCampos } from "../middlewares/valida-campos.js";


export const router = Router();

// Ruta: /api/login


//CREAR USUARIO
router.post('/', [
    body('email', 'El correo es obligatorio').isEmail(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    body('token', 'La token de google es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn);
