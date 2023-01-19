import { json, response } from "express";
import { Usuario } from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/jwt.js";

export const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});

        //VERIFICAR EMAIL
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        //VERIFICAR CONTRASEÑA
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        //GENERAR EL TOKEN - JWT
        const token = await generarJWT(usuarioDB._id);

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}