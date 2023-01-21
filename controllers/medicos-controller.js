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

export const actualizarMedico = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medicoDB = Medico.findById(id);

        if (!medicoDB) {
            res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado con el id ingresado'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true })
                                                .populate('usuario', 'nombre')
                                                .populate('hospital', 'nombre');

        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

export const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medicoDB = Medico.findById(id);

        if (!medicoDB) {
            res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado con el id ingresado'
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Médico eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}