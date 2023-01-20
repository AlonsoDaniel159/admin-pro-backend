import { Schema, model } from "mongoose";


export const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

});
// , { collection: 'medico'}  --> para especificar como se quiere nombrar en mongo

MedicoSchema.method('toJSON', function( ) {

    const {__v, ...resto } = this.toObject();

    // resto.uid = _id;

    return resto;

});

export const Medico = model('Medico', MedicoSchema)