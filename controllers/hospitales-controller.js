import { response } from "express";
import { Hospital } from "../models/hospital.js";

export const getHospitales = async (req, res = response) => {

    try {

        const hospitales = await Hospital.find()
            .populate('usuario', 'nombre');

        res.json({
            ok: true,
            hospitales
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

export const crearHospital = async (req, res = response) => {

    const { nombre } = req.body;
    const uid = req.uid

    const hospital = Hospital({
        usuario: uid,
        nombre
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

export const actualizarHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, {new: true});

        res.json({
            ok: true,
            msg: 'actualizarHospital',
            hospital: hospitalActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

export const borrarHospital = async(req, res = response) => {

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
            })
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}