import { response } from "express";
import { Usuario } from "../models/usuario.js";


export const validarCorreo = async(req, res = response, next) => {
    
    const email = req.body.email;

    const usuario = await Usuario.findOne({email});

    if( usuario ) {
        res.status(400).json({
            msg: 'El correo ya está registrado'
        })
    }

    next();
}