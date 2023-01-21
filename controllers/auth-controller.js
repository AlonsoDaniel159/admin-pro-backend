import { json, response } from "express";
import { Usuario } from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

export const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        //VERIFICAR EMAIL
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        //VERIFICAR CONTRASEÑA
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);

        if (!validPassword) {
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


export const googleSignIn = async (req, res = response) => {

    try {

        const { email, name, picture } = await googleVerify(req.body.token);
        let usuario;

        const usuarioDB = await Usuario.findOne({email});

        if( !usuarioDB ) {
            usuario = Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '@@@';
        }

        //Guardar usuario
        await usuario.save();

        //GENERAR EL TOKEN - JWT
        const token = await generarJWT(usuarioDB._id);

        res.json({
            ok: true,
            email, name, picture,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto'
        })
    }
}

export const renewToken = async(req, res = response) => {

    const uid = req.uid;

    //GENERAR EL TOKEN - JWT
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    })
}