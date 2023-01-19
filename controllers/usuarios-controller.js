import { response } from 'express';
import { Usuario } from '../models/usuario.js';
import bcryptjs from 'bcryptjs';

export const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email rol google');

    res.json(usuarios)

}

export const crearUsuario = async(req, res = response) => {

    const { password, email } = req.body;
    
    try {
        const existeEmail = await Usuario.findOne({email});

        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = Usuario(req.body);

        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        //Guardar usuario
        await usuario.save();
        
        res.json({
            ok: true,
            usuario
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}

export const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            })
        }

        //Actualizar usuario

        const { _id, password, google, ...campos } = req.body;

        if( usuarioDB.email === req.body.email ) {
            delete campos.email;
        } else {
            const existeEmail = await Usuario.findOne({email: req.body.email});

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }


        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuarioActualizado 
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}