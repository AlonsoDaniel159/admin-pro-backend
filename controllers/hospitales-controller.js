import { response } from "express";
import { Hospital } from "../models/hospital.js";

export const getHospitales =async (req, res = response) => {

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

export const crearHospital = async(req, res = response) => {

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

export const actualizarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}

export const borrarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarHospital'
    })
}