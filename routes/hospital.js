import { Router } from "express";
import { body } from "express-validator";
import { actualizarHospital, borrarHospital, crearHospital, getHospitales } from "../controllers/hospitales-controller.js";
import { validarCampos } from "../middlewares/valida-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

export const router = Router();

// Ruta: /api/hospital


//TRAER HOSPITALES
router.get('/', [
    validarJWT,
    
], getHospitales);


//CREAR HOSPITAL
router.post('/', [
    validarJWT,
    body('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos
], crearHospital);


//ACTUALIZAR HOSPITAL
router.put('/:id', [
    
    
], actualizarHospital)


//ELIMINAR HOSPITAL
router.delete('/:id', [
    
    
], borrarHospital)
