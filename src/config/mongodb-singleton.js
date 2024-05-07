import mongoose from "mongoose";
import config from "./config.js"
export default class MongoSingleton{
    static #instance

    constructor(){
        this.#connectMongoDB()
    }

    //Implementación Singleton
    static getInstance(){
        if(this.#instance){
            console.log("Ya se ha abierto una conexion a MongoDB");
        }else{
            this.#instance = new MongoSingleton()
        }
        return this.#instance
    }

    #connectMongoDB = async() =>{
        try {
            await mongoose.connect(`mongodb+srv://fio:${config.mongoPassword}@cluster0.mi1diym.mongodb.net/${config.mongoDBName}?retryWrites=true&w=majority`)
            console.log("Conectado con exito a MongoDB usando Moongose");
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Moongose" + error);
            process.exit()
        }
    }
}


    