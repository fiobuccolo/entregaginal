import userModel from "../models/users.models.js";

export default class UserDao {

    get = (params) => {
        return userModel.find(params);
    }


    async getBy(params) {
        try {
            console.log("get user by  user dao.js" + params);
            const response = await userModel.findOne(params);
            return response
        } catch (error) {
            throw error;
        }
    }
    async save(doc) {
        try {
            console.log("en el save del dao ");
            console.log(doc);
            const response = await userModel.create(doc);
            if (response) {
                return (`data: ${response}`)
            } else { throw new Error("Hubo un error") }
        } catch (error) {
            throw error;
        }
    }




    update = (id, doc) => {
        return userModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {
        return userModel.findByIdAndDelete(id);
    }

}