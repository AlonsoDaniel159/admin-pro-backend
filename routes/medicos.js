import { Router } from "express";
import { body, param } from "express-validator";
import { actualizarMedico, borrarMedico, crearMedico, getMedicos } from "../controllers/medicos-controller.js";
import { validarCampos } from "../middlewares/valida-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

export const router = Router();

// Ruta: /api/Medico


//TRAER MEDICOS
router.get('/', [
    validarJWT
], getMedicos);


//CREAR MEDICO
router.post('/', [
    validarJWT,
    body('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
    body('hospital', 'El id del hospital es obligatorio').not().isEmpty(),
    body('hospital', 'El id ingresadon no es válido').isMongoId(),
    validarCampos,
], crearMedico);


//ACTUALIZAR MEDICO
router.put('/:id', [
    validarJWT,
    param('id', 'El id ingresado no es válido').isMongoId(),
    body('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
    body('hospital', 'El hospital id debe ser válido').not().isEmpty(),
    validarCampos,
], actualizarMedico)


//ELIMINAR MEDICO
router.delete('/:id', [
    validarJWT,
    param('id', 'El id es obligatorio').not().isEmpty(),
    param('id', 'El id ingresado no es válido').isMongoId(),
    validarCampos
], borrarMedico)
