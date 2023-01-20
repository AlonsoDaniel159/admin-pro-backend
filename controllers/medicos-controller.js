import { response } from "express";
import { Medico } from "../models/medico.js";


export const getMedicos = async (req, res = response) => {


    try {

        const medicos = await Medico.find()
                        .populate('usuario', 'nombre')
                        .populate('hospital', 'nombre');

        res.json({
            ok: true,
            medicos
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

export const crearMedico = async (req, res = response) => {

    const { nombre, hospital } = req.body;
    const uid = req.uid;

    const medico = Medico({
        usuario: uid,
        //otra opcion para los de abajo -> ...req.body
        hospital,
        nombre
    })

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

export const actualizarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

export const borrarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
}