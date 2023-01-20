import { Router } from "express";
import { body } from "express-validator";
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
    body('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
    body('hospital', 'El id del hospital es obligatorio').not().isEmpty(),
    body('hospital', 'El id ingresadon no es válido').isMongoId(),
    validarCampos,
    validarJWT
], crearMedico);


//ACTUALIZAR MEDICO
router.put('/:id', [
    

], actualizarMedico)


//ELIMINAR MEDICO
router.delete('/:id', [
    
    
], borrarMedico)
