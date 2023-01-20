import { response } from 'express';
import { Usuario } from '../models/usuario.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/jwt.js';

export const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    //OPCIONAL SI SE QUIERE MANDAR EL LÍMITE POR PÁGINA
    // const  limite  = Number(req.query.limite) || 5;

    // const usuarios = await Usuario
    //     .find({}, 'nombre email rol google')
    //     .skip(desde)
    //     .limit(5);

    // const total = await Usuario.countDocuments();

    //Promise.all para ejecutar ambas promesas al mismo tiempo
    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email rol google img')
            .skip(desde)
            .limit(5),

        Usuario.countDocuments()
    ])

    res.json({
        ok: true,
        usuarios,
        // uid: req.uid,
        total
    })

}

export const crearUsuario = async (req, res = response) => {

    const { password, email } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = Usuario(req.body);

        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();


        //GENERAR EL TOKEN - JWT
        const token = await generarJWT(usuario._id);

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}

export const actualizarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            })
        }

        //Actualizar usuario

        const { _id, password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

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


export const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;
    try {


        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperad, hable con el administrador'
        })
    }


}