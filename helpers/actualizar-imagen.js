import { Usuario } from "../models/usuario.js"
import { Medico } from "../models/medico.js"
import { Hospital } from "../models/hospital.js"
import fs from "fs";

const borraImagen = (path) => {

    if (fs.existsSync(path)) {
        //Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

export const actualizarImagen = async (tipo, id, nombreArchivo) => {

    switch (tipo) {
        case "medicos": {
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No existe médico por id');
                return false;
            }

            const pathViejo = `./uploads/medicos/${medico.img}`
            borraImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true

            break;
        }
        case "usuarios": {
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No existe usuario por id');
                return false;
            }

            const pathViejo = `./uploads/usuarios/${usuario.img}`
            borraImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true

            break;
        }
        case "hospitales": {
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No existe hospital por id');
                return false;
            }

            const pathViejo = `./uploads/hospitales/${hospital.img}`
            borraImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true

            break;
        }
        default:
            break;
    }

}