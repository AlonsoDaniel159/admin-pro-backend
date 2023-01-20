import { Schema, model } from "mongoose";


export const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'hospitales'});

HospitalSchema.method('toJSON', function( ) {

    const {__v, ...resto } = this.toObject();

    return resto;

});

export const Hospital = model('Hospital', HospitalSchema)