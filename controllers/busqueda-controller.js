import { response } from "express";
import { Medico } from "../models/medico.js";
import { Usuario } from "../models/usuario.js"
import { Hospital } from "../models/hospital.js"

export const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ])

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })

}


export const getColeccion = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;

    const regex = new RegExp(busqueda, 'i');

    let data;

    switch (tabla) {
        case "usuarios":

            data = await Usuario.find({ nombre: regex });

            break;
        case "medicos":

            data = await Medico.find({ nombre: regex })
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');

            break;
        case "hospitales":

            data = await Hospital.find({ nombre: regex })
                                .populate('usuario','nombre img');;

            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla solo puede ser usuarios/medicos/hospitales'
            })
    }

    res.json({
        ok: true,
        data
    })


}