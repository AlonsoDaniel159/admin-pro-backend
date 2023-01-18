import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = async() => {

    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DB_CNN);
        console.log('Connection succsessful');
    } catch (error) {
        console.log(error);
        throw new Error('Error trying to connect')
    }

}